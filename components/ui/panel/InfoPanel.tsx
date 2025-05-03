import { Info } from "lucide-react";
import { Button } from "../button/Button";

type InfoPanelProps = {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const InfoPanel = ({
  message,
  actionLabel = "Got it",
  onAction,
}: InfoPanelProps) => {
  return (
    <div className="flex items-center justify-between border-2 border-indigo-500 rounded-md p-4 shadow-sm bg-white w-full max-w-3xl">
      <div className="flex items-center gap-3"> {/* Canh giữa theo trục dọc */}
        <div className="bg-indigo-100 text-indigo-600 p-2 rounded-full">
          <Info className="w-5 h-5" />
        </div>
        <p className="text-sm text-indigo-700 max-w-md">{message}</p>
      </div>

      <Button variant="outline" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
};
