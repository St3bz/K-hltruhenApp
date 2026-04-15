"use client";

/**
 * Kuhlschrank (Refrigerator) Management Page
 * 
 * TODO: You'll complete this page by:
 * 1. Implementing the loadItems() function to fetch all items
 * 2. Implementing the handleSubmit() function to create/update items
 * 3. Understanding how the state management works
 */

import { useState, useEffect } from "react";
import { KuhlschrankArtikel, KuhlschrankKategorie } from "@/types";
import { ItemList } from "@/components/ItemList";
import { ItemForm, FormField } from "@/components/ItemForm";
import { Card, ErrorAlert, LoadingSpinner } from "@/components/ui";
import {
  getAllKuhlschrankArtikels,
  createKuhlschrankArtikel,
  updateKuhlschrankArtikel,
  deleteKuhlschrankArtikel,
} from "@/lib/api";

export default function KuhlschrankPage() {
  // ============================================
  // STATE MANAGEMENT
  // ============================================

  const [items, setItems] = useState<KuhlschrankArtikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<KuhlschrankArtikel | undefined>(
    undefined
  );

  // ============================================
  // FORM FIELD DEFINITIONS
  // ============================================

  const formFields: FormField[] = [
    {
      name: "name",
      label: "Item Name",
      type: "text",
      required: true,
      placeholder: "e.g., Milk, Cheese, Broccoli",
    },
    {
      name: "menge",
      label: "Quantity",
      type: "number",
      required: true,
      placeholder: "Enter quantity",
    },
    {
      name: "kategorie",
      label: "Category",
      type: "select",
      required: true,
      options: Object.values(KuhlschrankKategorie).map((cat) => ({
        value: cat,
        label: cat,
      })),
    },
    {
      name: "haltbarkeitsdatum",
      label: "Expiration Date",
      type: "date",
      required: false,
    },
  ];

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  useEffect(() => {
    loadItems();
  }, []);

  // ============================================
  // FUNCTIONS YOU'LL IMPLEMENT
  // ============================================

  /**
   * TODO: Implement this function
   * Should call getAllKuhlschrankArtikels() and update the items state
   * Handle errors appropriately
   * 
   * Hint:
   * 1. Set loading to true at the start
   * 2. Call getAllKuhlschrankArtikels()
   * 3. setItems() with the returned data
   * 4. Handle errors and set error state
   * 5. Set loading to false at the end
   */
  const loadItems = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getAllKuhlschrankArtikels();
      setItems(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load items";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * TODO: Implement this function
   * Should handle both creating NEW items and UPDATING existing items
   * 
   * Hint:
   * 1. Check if editingItem exists (editing mode vs creating mode)
   * 2. If editing: call updateKuhlschrankArtikel(id, data)
   * 3. If creating: call createKuhlschrankArtikel(data)
   * 4. After success: reload items, clear form, close form
   * 5. Handle errors appropriately
   */
  const handleSubmit = async (data: Partial<KuhlschrankArtikel>) => {
    try {
      setIsSubmitting(true);
      setError("");

      if (editingItem?.id) {
        // Editing existing item
        await updateKuhlschrankArtikel(editingItem.id, data as Omit<KuhlschrankArtikel, "id">);
      } else {
        // Creating new item
        await createKuhlschrankArtikel(data as Omit<KuhlschrankArtikel, "id">);
      }

      // Reload items
      await loadItems();

      // Reset form
      setEditingItem(undefined);
      setShowForm(false);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to save item";
      setError(message);
      throw err; // Re-throw so ItemForm shows the error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: KuhlschrankArtikel) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: bigint) => {
    try {
      setIsDeleting(true);
      await deleteKuhlschrankArtikel(id);
      await loadItems();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete item";
      setError(message);
      throw err;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancel = () => {
    setEditingItem(undefined);
    setShowForm(false);
  };

  // ============================================
  // RENDER
  // ============================================

  const listColumns: Array<{
    key: keyof KuhlschrankArtikel;
    label: string;
    render?: (value: any) => React.ReactNode;
  }> = [
    { key: "name", label: "Name" },
    { key: "menge", label: "Quantity" },
    { key: "kategorie", label: "Category" },
    {
      key: "haltbarkeitsdatum",
      label: "Expiration Date",
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Refrigerator</h1>
            <p className="text-gray-600 mt-2">Manage your refrigerator items</p>
          </div>
          <button
            onClick={() => {
              setEditingItem(undefined);
              setShowForm(!showForm);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            {showForm ? "Cancel" : "+ Add Item"}
          </button>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <ErrorAlert
            message={error}
            onClose={() => setError("")}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORM COLUMN */}
          {showForm && (
            <div className="lg:col-span-1">
              <ItemForm<KuhlschrankArtikel>
                title={editingItem ? "Edit Item" : "Add New Item"}
                fields={formFields}
                initialData={editingItem}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
              />
            </div>
          )}

          {/* LIST COLUMN */}
          <div className={showForm ? "lg:col-span-2" : "lg:col-span-3"}>
            <Card>
              {loading ? (
                <LoadingSpinner />
              ) : (
                <ItemList<KuhlschrankArtikel>
                  items={items}
                  columns={listColumns}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={isDeleting}
                  loading={loading}
                />
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
