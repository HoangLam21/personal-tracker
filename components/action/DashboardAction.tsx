import { useRouter } from "next/navigation";
import { Button } from "../ui/button/Button";

const DashboardAction = ({ type }: { type: "income" | "expense" }) => {
  const router = useRouter();
  return (
    <Button
      variant={type === "income" ? "outline" : "default"}
      onClick={() => router.push(`/finance/create?type=${type}`)}
    >
      Thêm {type === "income" ? "thu nhập" : " chi tiêu"}
    </Button>
  );
};
export default DashboardAction;
