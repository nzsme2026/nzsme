import ApplyForm from "./ApplyForm";

type ApplyPageProps = {
  searchParams: Promise<{ paid?: string }>;
};

export default async function ApplyPage({
  searchParams,
}: ApplyPageProps) {
  const params = await searchParams;
  const isPaid = params?.paid === "true";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <ApplyForm isPaid={isPaid} />
    </div>
  );
}