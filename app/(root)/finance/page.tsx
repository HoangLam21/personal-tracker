import Header from "@/components/shared/Header";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Plus, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
export default function FinancePage() {
  return (
    <main className="m-4 flex-1 flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl">
      <Header
        title="Recent Transaction"
        description="Manage your transaction today!"
      />
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex flex-row items-center justify-center gap-2 w-full">
          <Input variant="default" placeholder="Search..." />
          <Button>
            <Search />
          </Button>
        </div>
        <div className="flex flex-row w-full items-center justify-end gap-8">
            <Link href="/finance/create"><Button variant="default">
            <Plus />
            Create new transaction
          </Button></Link>  
          <Link href="/finance/category"><Button variant="outline">
            All categories
            <ArrowRight />
          </Button></Link>
        </div>
      </div>
      <div>

      </div>
    </main>
  );
}
