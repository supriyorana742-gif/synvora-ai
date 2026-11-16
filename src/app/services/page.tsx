import { buildMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/PageHeader";
import { ServiceGrid } from "@/components/home/ServicesSection";
import { FinalCTA } from "@/components/shared/FinalCTA";

export const metadata = buildMetadata({
  title: "AI Automation Services",
  description:
    "AI agent development, business process automation, WhatsApp and support automation, CRM and lead management, custom AI solutions, and data intelligence.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Services built around your workflow.">
        <p>
          Six focused services for removing repetitive work. Open any one to see the problem it solves, how it works,
          and what to expect.
        </p>
      </PageHeader>
      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <ServiceGrid />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
