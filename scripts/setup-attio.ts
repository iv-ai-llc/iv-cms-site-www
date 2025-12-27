/**
 * Attio Setup Script
 *
 * Creates the "iv-cms-site" list in Attio with all required attributes
 * for tracking leads from the IV-CMS marketing site contact form.
 *
 * Run with: npx tsx scripts/setup-attio.ts
 *
 * Prerequisites:
 * - ATTIO_API_KEY environment variable set
 * - Generate API key at: https://app.attio.com/settings/developers
 */

const ATTIO_API_URL = "https://api.attio.com/v2";
const ATTIO_API_KEY = process.env.ATTIO_API_KEY;

if (!ATTIO_API_KEY) {
  console.error("ATTIO_API_KEY environment variable is required");
  console.error("Generate one at: https://app.attio.com/settings/developers");
  process.exit(1);
}

async function attioFetch(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${ATTIO_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${ATTIO_API_KEY}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Attio API error (${response.status}): ${error}`);
  }

  return response.json();
}

async function main() {
  console.log("Setting up Attio integration for IV-CMS Site...\n");

  // Step 1: List existing lists
  console.log("1. Fetching existing lists...");
  const lists = await attioFetch("/lists");
  console.log(
    "   Existing lists:",
    lists.data?.map((l: { name: string; api_slug: string }) => `${l.name} (${l.api_slug})`).join(", ") || "none"
  );

  // Check if our list already exists
  let listId: string;
  const existingList = lists.data?.find((l: { api_slug: string }) => l.api_slug === "iv_cms_site");

  if (existingList) {
    console.log("\n   iv-cms-site list already exists!");
    console.log(`   List ID: ${existingList.id?.list_id}`);
    console.log(`   API Slug: ${existingList.api_slug}`);
    listId = existingList.id?.list_id;
  } else {
    // Step 2: Create the iv-cms-site list
    console.log('\n2. Creating "iv-cms-site" list...');
    const newList = await attioFetch("/lists", {
      method: "POST",
      body: JSON.stringify({
        data: {
          name: "IV-CMS Site Leads",
          api_slug: "iv_cms_site",
          parent_object: "people",
          workspace_access: "full-access",
          workspace_member_access: [],
        },
      }),
    });

    console.log("   List created successfully!");
    console.log(`   List ID: ${newList.data?.id?.list_id}`);
    console.log(`   API Slug: ${newList.data?.api_slug}`);

    listId = newList.data?.id?.list_id;
  }

  if (!listId) {
    console.error("Failed to get list ID");
    process.exit(1);
  }

  // Step 3: Add custom attributes to the list
  console.log("\n3. Adding custom attributes to the list...");

  const attributes = [
    {
      title: "Interest Type",
      api_slug: "interest_type",
      type: "select",
      config: {
        options: [
          { title: "Demo Request", is_archived: false },
          { title: "Pricing Inquiry", is_archived: false },
          { title: "Technical Question", is_archived: false },
          { title: "Partnership", is_archived: false },
          { title: "General Inquiry", is_archived: false },
        ],
      },
    },
    { title: "Company", api_slug: "company", type: "text" },
    { title: "Company Size", api_slug: "company_size", type: "text" },
    { title: "Use Case", api_slug: "use_case", type: "text" },
    { title: "Message", api_slug: "message", type: "text" },
    { title: "Submitted At", api_slug: "submitted_at", type: "timestamp" },
  ];

  for (const attr of attributes) {
    try {
      console.log(`   Adding attribute: ${attr.title}...`);

      await attioFetch(`/lists/${listId}/attributes`, {
        method: "POST",
        body: JSON.stringify({
          data: {
            title: attr.title,
            description: "",
            api_slug: attr.api_slug,
            type: attr.type,
            is_required: false,
            is_unique: false,
            is_multiselect: false,
            config: attr.config || {},
          },
        }),
      });

      console.log(`   ✓ ${attr.title} added`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (
        errorMessage.includes("already exists") ||
        errorMessage.includes("slug is already in use")
      ) {
        console.log(`   ✓ ${attr.title} already exists`);
      } else {
        console.error(`   ✗ Failed to add ${attr.title}:`, errorMessage);
      }
    }
  }

  console.log("\n4. Setup complete!");
  console.log("\n   Next steps:");
  console.log("   1. Add ATTIO_API_KEY to your Vercel environment variables for iv-cms-site-www");
  console.log("   2. Deploy the application");
  console.log("   3. Contact form submissions will automatically sync to Attio");
}

main().catch(console.error);
