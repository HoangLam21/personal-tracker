import DashboardSpendingCard from "../card/DashboardSpendingCard";

type Item = {
  icon: React.ReactNode;
  color: string;
  category: string;
  method: string;
  amount: number;
};

type Props = {
  dayTitle: string;
  items: Item[];
};

const DashboardSpendingDayForm = ({ dayTitle, items }: Props) => {
  return (
    <div>
      <h5 className="font-semibold text-sm text-gray-500 mb-2 mt-1">
        {dayTitle}
      </h5>
      {items.map((item, idx) => (
        <DashboardSpendingCard key={idx} {...item} />
      ))}
    </div>
  );
};

export default DashboardSpendingDayForm;
