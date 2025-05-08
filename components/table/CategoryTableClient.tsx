"use client";

import { Table, AvatarCell } from "@/components/ui/table/Table";
import {
  deleteCategory,
  getAllCategories,
  searchCategoryByName,
} from "@/lib/actions/category.action";
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input/Input";
import { Button } from "../ui/button/Button";
import Link from "next/link";
import { useState } from "react";

export default function CategoryTableClient({ userId }: { userId: string }) {
  const router = useRouter();
  const headers = ["Name", "Type", "Color", "Icon"];

  const [searchTerm, setSearchTerm] = useState("");
  const [triggerSearch, setTriggerSearch] = useState(false);

  const fetchData = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    if (searchTerm.trim() !== "") {
      const result = await searchCategoryByName(searchTerm.trim(), userId);
      return result.map((cat: any) => ({
        id: cat._id.toString(),
        cells: [
          cat.name,
          cat.type,
          cat.color,
          cat.icon ? <AvatarCell src={cat.icon} /> : "N/A",
        ],
      }));
    }

    const result = await getAllCategories(skip, limit, userId);
    return result.map((cat: any) => ({
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <Input
            variant="default"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={() => setTriggerSearch(!triggerSearch)}>
            <Search />
          </Button>
        </div>
        <div className="flex flex-row w-full items-center justify-end gap-8">
          <Link href="/finance/category/create">
            <Button variant="default">
              <Plus className="mr-1 h-4 w-4" />
              Tạo danh mục mới
            </Button>
          </Link>
        </div>
      </div>

      <div key={triggerSearch}>
        <Table
          headers={headers}
          fetchData={fetchData}
          onEdit={(id) => router.push(`/finance/category/edit/${id}`)}
          onDelete={async (id) => await deleteCategory(id)}
        />
      </div>
    </div>
  );
}
