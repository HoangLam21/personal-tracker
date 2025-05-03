"use client"
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { InfoPanel } from "@/components/ui/panel/InfoPanel";
import { Selection } from "@/components/ui/selection/Selection";
import { Table } from "@/components/ui/table/Table";
import { useState } from "react";

const options = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];


const headers = ["Name", "Email", "Role"];
const rows = Array.from({ length: 30 }, (_, i) => [
  `User ${i + 1}`,
  `user${i + 1}@example.com`,
  "Member",
]);


export default function Home() {
  const [value, setValue] = useState("");
  return (
   <div className="bg-white w-screen h-screen">
    <Button variant="default">Haha</Button>
    <Input placeholder="type something" variant="outline"></Input>

    <div className="grid grid-cols-2 gap-6 bg-gray-100 p-6 rounded-md">
      <Selection
        options={options}
        value={value}
        onChange={setValue}
        variant="default"
      />
      <Selection
        options={options}
        value={value}
        onChange={setValue}
        variant="button"
      />
      <p className="text-indigo-500">{"Value: " + value}</p>
      <InfoPanel message="This is a message"/>
    </div>
    <Table headers={headers} rows={rows} />

   </div>
  );
}
