"use client";

import { useState } from "react";
import { Send, Mail, MessageSquare, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  companySize: string;
  interestType: string;
  useCase: string;
  message: string;
};

const companySizes = [
  { value: "", label: "Select company size" },
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1000 employees" },
  { value: "1000+", label: "1000+ employees" },
];

const interestTypes = [
  { value: "Demo Request", label: "Request a Demo" },
  { value: "Pricing Inquiry", label: "Pricing Information" },
  { value: "Technical Question", label: "Technical Question" },
  { value: "Partnership", label: "Partnership Opportunity" },
  { value: "General Inquiry", label: "General Inquiry" },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    companySize: "",
    interestType: "Demo Request",
    useCase: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit form");
      }

      setStatus("success");
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        companySize: "",
        interestType: "Demo Request",
        useCase: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-[rgb(var(--background))] border border-[rgb(var(--border))] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all";

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Let&apos;s Talk</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Ready to modernize your content management? Get in touch with our
              team to learn how IV-CMS can power your digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Get Started</h2>

              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Message Received!
                  </h3>
                  <p className="text-[rgb(var(--muted))]">
                    Thanks for reaching out. Our team will get back to you
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formState.firstName}
                        onChange={handleChange}
                        required
                        className={inputClasses}
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formState.lastName}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Work Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className={inputClasses}
                      placeholder="john@company.com"
                    />
                  </div>

                  {/* Company and Size */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="company"
                        className="block text-sm font-medium mb-2"
                      >
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="companySize"
                        className="block text-sm font-medium mb-2"
                      >
                        Company Size
                      </label>
                      <select
                        id="companySize"
                        name="companySize"
                        value={formState.companySize}
                        onChange={handleChange}
                        className={inputClasses}
                      >
                        {companySizes.map((size) => (
                          <option key={size.value} value={size.value}>
                            {size.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Interest Type */}
                  <div>
                    <label
                      htmlFor="interestType"
                      className="block text-sm font-medium mb-2"
                    >
                      How can we help?
                    </label>
                    <select
                      id="interestType"
                      name="interestType"
                      value={formState.interestType}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      {interestTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Use Case */}
                  <div>
                    <label
                      htmlFor="useCase"
                      className="block text-sm font-medium mb-2"
                    >
                      What are you building?
                    </label>
                    <input
                      type="text"
                      id="useCase"
                      name="useCase"
                      value={formState.useCase}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="Marketing site, blog, documentation, etc."
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className={`${inputClasses} resize-none`}
                      placeholder="Tell us about your project and requirements..."
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-red-500 text-sm">{errorMessage}</p>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Why IV-CMS?</h2>
                <p className="text-[rgb(var(--muted))] mb-8">
                  Join teams who trust IV-CMS to power their content. Whether
                  you&apos;re building a marketing site, documentation portal,
                  or multi-tenant platform, we&apos;re here to help.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Quick Setup</h3>
                    <p className="text-[rgb(var(--muted))]">
                      Get started in minutes with our intuitive dashboard and
                      API-first architecture.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Dedicated Support</h3>
                    <p className="text-[rgb(var(--muted))]">
                      Our team is ready to help you succeed, from setup to
                      scaling.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Response Time</h3>
                    <p className="text-[rgb(var(--muted))]">
                      We typically respond within 24 hours on business days.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us Directly</h3>
                    <a
                      href={`mailto:${siteConfig.social.email}`}
                      className="text-[rgb(var(--muted))] hover:text-primary-500 transition-colors"
                    >
                      {siteConfig.social.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
