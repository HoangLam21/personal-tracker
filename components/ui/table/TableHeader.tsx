export const TableHeader = ({ children }: { children: React.ReactNode }) => {
    return (
      <th className="bg-indigo-600 text-white text-left px-4 py-3 text-sm font-bold">
        {children}
      </th>
    );
  };
  