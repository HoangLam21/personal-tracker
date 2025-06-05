import { auth } from "@/auth";
import EditTransactionForm from "@/components/form/EditTransactionForm";
import { redirect } from "next/navigation";

export default async function EditTransactionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/login");

  // Resolve the params Promise to access the id
  const { id } = await params;

  return (
    <main className="m-4 p-4 max-w-xl mx-auto">
      <EditTransactionForm id={id} userId={userId} />
    </main>
  );
}