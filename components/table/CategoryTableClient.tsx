"use client";

import { Table, AvatarCell } from "@/components/ui/table/Table";
import { getAllCategories } from "@/lib/actions/category.action";

export default function CategoryTableClient({ userId }: { userId: string }) {
  const headers = ["Name", "Type", "Color", "Icon"];

  const fetchData = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;
    const result = await getAllCategories(skip, limit, userId);

    return result.map((cat) => ({
      id: cat._id.toString(),
      cells: [
        cat.name,
        cat.type,
        cat.color,
        cat.icon ? <AvatarCell src={cat.icon} /> : "N/A",
      ],
    }));
  };

  return (
    <Table
      headers={headers}
      fetchData={fetchData}
      onEdit={(id) => console.log("edit:", id)}
      onDelete={(id) => console.log("delete:", id)}
    />
  );
}
