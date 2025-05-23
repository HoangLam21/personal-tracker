import { useRouter } from "next/navigation";
import { Button } from "../ui/button/Button";

const DashboardAction = ({ type }: { type: "income" | "expense" }) => {
  const router = useRouter();
  return (
    <Button
      variant={type === "income" ? "outline" : "default"}
      onClick={() => router.push(`/finance/create?type=${type}`)}
    >
      Add an {type}
    </Button>
  );
};
export default DashboardAction;
