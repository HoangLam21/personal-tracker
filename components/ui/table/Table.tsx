"use client";

import * as React from "react";
import type { JSX } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Trash
} from "lucide-react";
import { cn } from "@/lib/utils";

export type TableRow = {
  id: string;
  cells: Array<string | JSX.Element>;
};

export type TableProps = {
  headers: string[];
  fetchData: (page: number, rowsPerPage: number) => Promise<TableRow[]>;
  rowsPerPage?: number;
  onEdit?: (rowId: string) => void;
  onDelete?: (rowId: string) => void;
};

export const Table: React.FC<TableProps> = ({ headers, fetchData, rowsPerPage = 5, onEdit, onDelete }) => {
  const [page, setPage] = React.useState<number>(1);
  const [rows, setRows] = React.useState<TableRow[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [hasMore, setHasMore] = React.useState<boolean>(true);

  React.useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchData(page, rowsPerPage);
      setRows(data);
      setHasMore(data.length === rowsPerPage);
      setLoading(false);
    };
    load();
  }, [page, rowsPerPage, fetchData]);

  const emptyRows = rowsPerPage - rows.length;

  return (
    <div className="space-y-3">
      <div className="overflow-auto border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 text-gray-500 font-semibold uppercase tracking-wide text-[13px]">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-3 whitespace-nowrap">
                  {header}
                </th>
              ))}
              <th className="px-6 py-3 whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm" style={{ height: `${rowsPerPage * 70}px` }}>
            {loading ? (
              <tr>
                <td colSpan={headers.length + 1} className="text-center py-4">
                  Đang tải dữ liệu...
                </td>
              </tr>
            ) : (
              <>
                {rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition"
                  >
                    {row.cells.map((cell, ci) => {
                      const isStatus = headers[ci] === "Status";
                      const isAmount = headers[ci] === "Amount";
                      const isColor =
                        headers[ci].toLowerCase() === "color" &&
                        typeof cell === "string" &&
                        /^#([0-9A-Fa-f]{3}){1,2}$/.test(cell);

                      return (
                        <td key={ci} className="px-6 py-4 whitespace-nowrap">
                          {isColor ? (
                            <span
                              className="inline-block w-6 h-6 rounded-full border border-gray-300"
                              style={{ backgroundColor: cell }}
                              title={cell}
                            ></span>
                          ) : typeof cell === "string" ? (
                            isStatus ? (
                              <span
                                className={cn(
                                  "text-xs font-medium",
                                  cell === "Pending" && "text-gray-500",
                                  cell === "Completed" && "text-green-600"
                                )}
                              >
                                {cell}
                              </span>
                            ) : isAmount ? (
                              <span
                                className={cn(
                                  "font-semibold",
                                  cell.includes("-")
                                    ? "text-red-500"
                                    : "text-green-600"
                                )}
                              >
                                {cell}
                              </span>
                            ) : (
                              cell
                            )
                          ) : (
                            cell
                          )}
                        </td>
                      );
                    })}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => onEdit?.(row.id)}
                        className="text-blue-600 hover:text-blue-800 mr-2"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDelete?.(row.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}

                {Array.from({ length: emptyRows }).map((_, i) => (
                  <tr key={`empty-${i}`} className="border-t border-gray-100">
                    {headers.map((_, ci) => (
                      <td key={ci} className="px-6 py-4 whitespace-nowrap">&nbsp;</td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap">&nbsp;</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end items-center px-2 pt-2">
        <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 shadow-sm border border-gray-200">
          <button
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronsLeft className="w-4 h-4 text-indigo-500" />
          </button>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 text-indigo-500" />
          </button>

          <span className="text-sm text-gray-700 px-1.5">
            Page <span className="font-semibold text-indigo-600">{page}</span>
          </span>

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 text-indigo-500" />
          </button>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
            className="p-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronsRight className="w-4 h-4 text-indigo-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const AvatarCell: React.FC<{ src: string; alt?: string }> = ({ src, alt }) => (
  <img
    src={src}
    alt={alt || "avatar"}
    className="w-8 h-8 rounded-full object-cover"
  />
);
