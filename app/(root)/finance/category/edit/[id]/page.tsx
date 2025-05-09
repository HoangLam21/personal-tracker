import { auth } from "@/auth";
import EditCategoryForm from "@/components/form/EditCategoryForm";
import { redirect } from "next/navigation";

export default async function EditCategoryPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/login");

  return (
    <main className="m-4 p-4 max-w-xl mx-auto">
      <EditCategoryForm id={params.id} userId={userId} />
    </main>
  );
}
