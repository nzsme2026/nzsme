import LegalPageLayout from "@/components/LegalPageLayout";

export default function FAQPage() {
  return (
    <LegalPageLayout title="Frequently Asked Questions">

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          What exactly does the Executive Member role involve?
        </h2>

        <p>
          Executive Members are volunteer contributors who support NZSME
          operations, event coordination, workshops, networking activities,
          administration, and community growth initiatives.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Is there any membership fee?
        </h2>

        <p>
          Yes. NZSME operates as a structured membership-based network and an
          annual membership fee applies for active members.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          What are the participation expectations?
        </h2>

        <p>
          General members may participate based on availability. Executive
          Members are expected to contribute voluntary time toward events,
          administration, and community activities.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Are WhatsApp and Facebook groups official communication channels?
        </h2>

        <p>
          No. These platforms are intended for networking, engagement, and
          updates only. Official communication is issued through designated
          NZSME channels.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Are workshops included in membership?
        </h2>

        <p>
          Some workshops may be included as member benefits, while certain
          premium or sponsored events may require separate registration.
        </p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">
          Is membership flexible?
        </h2>

        <p>
          Yes. General membership is renewable annually. Executive Members may
          be required to sign governance and confidentiality-related documents.
        </p>
      </div>

    </LegalPageLayout>
  );
}