import { NextRequest, NextResponse } from "next/server";
import { z } from "zod/v4";

export const runtime = "edge";

const ATTIO_API_URL = "https://api.attio.com/v2";

// Validation schema
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().optional().default(""),
  email: z.email("Invalid email address"),
  company: z.string().optional(),
  companySize: z.string().optional(),
  interestType: z.string().optional().default("General Inquiry"),
  useCase: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your inquiry"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

async function attioFetch(endpoint: string, options: RequestInit = {}) {
  const apiKey = process.env.ATTIO_API_KEY;

  if (!apiKey) {
    throw new Error("ATTIO_API_KEY is not configured");
  }

  const response = await fetch(`${ATTIO_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Attio API error:", error);
    throw new Error(`Attio API error: ${response.status}`);
  }

  return response.json();
}

async function findOrCreatePerson(
  firstName: string,
  lastName: string,
  email: string
) {
  // Use assert endpoint to find or create person by email (upsert)
  const person = await attioFetch(
    "/objects/people/records?matching_attribute=email_addresses",
    {
      method: "PUT",
      body: JSON.stringify({
        data: {
          values: {
            name: [
              {
                first_name: firstName,
                last_name: lastName,
                full_name: `${firstName} ${lastName}`.trim(),
              },
            ],
            email_addresses: [{ email_address: email }],
          },
        },
      }),
    }
  );

  return person.data;
}

async function addPersonToList(
  personId: string,
  data: ContactFormData
) {
  // Add the person to the iv_cms_site list with entry values
  const entryValues: Record<string, string> = {
    interest_type: data.interestType || "General Inquiry",
    message: data.message,
    submitted_at: new Date().toISOString(),
  };

  if (data.company) {
    entryValues.company = data.company;
  }
  if (data.companySize) {
    entryValues.company_size = data.companySize;
  }
  if (data.useCase) {
    entryValues.use_case = data.useCase;
  }

  const listEntry = await attioFetch("/lists/iv_cms_site/entries", {
    method: "POST",
    body: JSON.stringify({
      data: {
        parent_record_id: personId,
        parent_object: "people",
        entry_values: entryValues,
      },
    }),
  });

  return listEntry;
}

async function submitToAttio(data: ContactFormData) {
  const apiKey = process.env.ATTIO_API_KEY;

  if (!apiKey) {
    console.warn("Attio credentials not configured - skipping submission");
    return null;
  }

  // Find or create person in Attio
  const person = await findOrCreatePerson(
    data.firstName,
    data.lastName,
    data.email
  );

  // Add to iv_cms_site list with form data
  await addPersonToList(person.id.record_id, data);

  return person;
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Log submission
    console.log("Contact form submission received:", {
      name: `${validatedData.firstName} ${validatedData.lastName}`.trim(),
      email: validatedData.email,
      company: validatedData.company || "(not provided)",
      interestType: validatedData.interestType,
      timestamp: new Date().toISOString(),
    });

    // Submit to Attio
    try {
      await submitToAttio(validatedData);
    } catch (attioError) {
      // Log error but don't fail the request
      console.error("Attio submission failed:", attioError);
    }

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for your interest! We'll get back to you within 24 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: error.issues,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "An error occurred processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
