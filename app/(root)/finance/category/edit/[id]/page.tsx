import { auth } from "@/auth"; 
import EditCategoryForm from "@/components/form/EditCategoryForm";
import { redirect } from "next/navigation";

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return redirect("/login");

  return (
    <main className="m-4 p-4 max-w-xl mx-auto">
      <EditCategoryForm id={params.id} userId={userId} />
    </main>
  );
}
