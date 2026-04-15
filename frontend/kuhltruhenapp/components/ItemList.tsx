"use client";

/**
 * Generic Item List Component
 * Displays items in a clean table format with edit/delete actions
 * Reusable for both Kuhlschrank and Vorrat items
 */

import { Button, DeleteConfirmation } from "./ui";
import { useState } from "react";

export interface ListItem {
  id?: bigint;
  name: string;
  [key: string]: any;
}

interface ItemListProps<T extends ListItem> {
  items: T[];
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (value: any) => React.ReactNode;
  }>;
  onEdit: (item: T) => void;
  onDelete: (id: bigint) => Promise<void>;
  isDeleting?: boolean;
  loading?: boolean;
}

export function ItemList<T extends ListItem>({
  items,
  columns,
  onEdit,
  onDelete,
  isDeleting = false,
  loading = false,
}: ItemListProps<T>) {
  const [deleteId, setDeleteId] = useState<bigint | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");

  const handleDeleteClick = (item: T) => {
    setDeleteId(item.id ?? null);
    setDeleteName(item.name);
  };

  const handleConfirmDelete = async () => {
    if (deleteId !== null) {
      try {
        await onDelete(deleteId);
        setDeleteId(null);
      } catch (error) {
        console.error("Delete failed:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <span className="text-gray-500">Loading items...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <p className="text-gray-500 text-center">
          No items found. Create one to get started!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="px-4 py-3 text-left font-semibold text-gray-700"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 text-left font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={String(item.id)}
                className="border-b hover:bg-gray-50 transition"
              >
                {columns.map((col) => (
                  <td key={String(col.key)} className="px-4 py-3 text-gray-900">
                    {col.render
                      ? col.render(item[col.key])
                      : String(item[col.key])}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit(item)}
                      className="text-xs"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteClick(item)}
                      className="text-xs"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmation
        isOpen={deleteId !== null}
        itemName={deleteName}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        isDeleting={isDeleting}
      />
    </>
  );
}
