import { auth } from "@/auth"; 
import EditCategoryForm from "@/components/form/EditCategoryForm";
import { redirect } from "next/navigation";

export default async function EditCategoryPage({
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
      <EditCategoryForm id={id} userId={userId} />
    </main>
  );
}