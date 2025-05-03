"use client";

import { TableHeader } from "./TableHeader";
import { TableCell } from "./TableCell";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type TableProps = {
  headers: string[];
  rows: Array<string[]>;
  rowsPerPage?: number;
};

export const Table = ({ headers, rows, rowsPerPage = 10 }: TableProps) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(rows.length / rowsPerPage);

  const paginatedRows = rows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );

  return (
    <div className="space-y-2">
      <div className="overflow-auto border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              {headers.map((header, i) => (
                <TableHeader key={i}>{header}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row, ri) => (
              <tr key={ri} className="odd:bg-white even:bg-indigo-100">
                {row.map((cell, ci) => (
                  <TableCell key={ci}>{cell}</TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination: bottom right */}
      <div className="flex justify-end items-center px-2 pt-2">
  <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 shadow-sm border border-gray-200">
    <button
      onClick={() => setPage(1)}
      disabled={page === 1}
      className="p-2 rounded-lg hover:bg-indigo-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ChevronsLeft className="w-4 h-4 text-indigo-500" />
    </button>
    <button
      onClick={() => setPage((p) => p - 1)}
      disabled={page === 1}
      className="p-2 rounded-lg hover:bg-indigo-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ChevronLeft className="w-4 h-4 text-indigo-500" />
    </button>

    <span className="text-sm text-gray-700 px-1.5">
      Page <span className="font-semibold text-indigo-600">{page}</span> of{" "}
      <span className="text-gray-500">{pageCount}</span>
    </span>

    <button
      onClick={() => setPage((p) => p + 1)}
      disabled={page === pageCount}
      className="p-2 rounded-lg hover:bg-indigo-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ChevronRight className="w-4 h-4 text-indigo-500" />
    </button>
    <button
      onClick={() => setPage(pageCount)}
      disabled={page === pageCount}
      className="p-2 rounded-lg hover:bg-indigo-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <ChevronsRight className="w-4 h-4 text-indigo-500" />
    </button>
  </div>
</div>
    </div>
  );
};
