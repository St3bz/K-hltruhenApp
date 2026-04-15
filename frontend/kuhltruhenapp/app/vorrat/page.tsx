"use client";

/**
 * Vorrat (Pantry/Stock) Management Page
 * 
 * EXERCISE: Create this page following the same pattern as KuhlschrankPage
 * You should:
 * 1. Import necessary types and functions
 * 2. Set up state for items, loading, errors, etc.
 * 3. Create form fields for VorratsArtikel
 * 4. Implement loadItems, handleSubmit, handleDelete
 * 5. Render the page with ItemForm and ItemList components
 * 
 * Hint: Compare with the Kuhlschrank page - the pattern is almost identical!
 * Main differences:
 * - Use VorratsArtikel instead of KuhlschrankArtikel
 * - Form fields: name, zielMenge (target), momentaneMenge (current)
 * - Use Vorrat API functions instead of Kuhlschrank ones
 */

import { useState, useEffect } from "react";
import { VorratsArtikel } from "@/types";
import { ItemList } from "@/components/ItemList";
import { ItemForm, FormField } from "@/components/ItemForm";
import { Card, ErrorAlert, LoadingSpinner } from "@/components/ui";
import {
  getAllVorratsArtikels,
  createVorratsArtikel,
  updateVorratsArtikel,
  deleteVorratsArtikel,
} from "@/lib/api";

export default function VorratPage() {
  // TODO: Add state management (items, loading, error, isSubmitting, isDeleting, showForm, editingItem)
  const [items, setItems] = useState<VorratsArtikel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");   
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<VorratsArtikel | undefined>(
        undefined
    );
  // TODO: Define formFields array with fields for: name, zielMenge, momentaneMenge
    const formFields: FormField[]= [
        {
            name: "name",
            label: "Item Name",
            type: "text",
            required: true,
            placeholder: "e.g., Rice, Pasta, Canned Beans",
        },
        {
            name: "zielMenge",
            label: "Target Quantity",
            type: "number",
            required: true,
            placeholder: "Enter target quantity",
        },
        {
            name: "momentaneMenge",
            label: "Current Quantity",
            type: "number",
            required: true,
            placeholder: "Enter current quantity",
        },
    ];
  // TODO: Implement useEffect to call loadItems on component mount
    useEffect(() => {
        loadItems();
    }, []);
  // TODO: Implement loadItems function
    const loadItems = async () => {
        try{
            setLoading(true);
            setError("");
            const data = await getAllVorratsArtikels();
            setItems(data);
        }catch (err){
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
        }finally{
            setLoading(false);
        }
    };
  // TODO: Implement handleSubmit function
    const handleSubmit = async (data: Partial<VorratsArtikel>) => {
        try{
            setIsSubmitting(true);
            setError("");

            if (editingItem?.id){
                await updateVorratsArtikel(editingItem.id, data as Omit<VorratsArtikel, "id">);
            }else{
                await createVorratsArtikel(data as Omit<VorratsArtikel, "id">);
            }

            await loadItems();

            setEditingItem(undefined);
            setShowForm(false);
        }catch (err){
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
            throw err;
        }finally{
            setIsSubmitting(false);
        }
    };
  // TODO: Implement handleEdit function
    const handleEdit = (item:VorratsArtikel) => {
        setEditingItem(item);
        setShowForm(true);
    }
  // TODO: Implement handleDelete function
    const handleDelete = async (id: bigint) => {
        try{
            setIsDeleting(true);
            await deleteVorratsArtikel(id);
            await loadItems();
        }catch (err){
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
            throw err;
        }finally{
            setIsDeleting(false);
        }   
    };
  // TODO: Implement handleCancel function
    const handleCancel = () => {
        setEditingItem(undefined);
        setShowForm(false);
    };
  // TODO: Define listColumns for the ItemList component
    const listColumns: Array<{
        key: keyof VorratsArtikel;
        label: string;
        render?: (value:any) => React.ReactNode;
    }> = [
        { key: "name", label: "Item Name" },
        { key: "zielMenge", label: "Target Quantity" },
        { key: "momentaneMenge", label: "Current Quantity" },
    ];

  // TODO: Render the page (copy the structure from KuhlschrankPage and adapt it)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <div className="max-w-6xl mx-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">Pantry/Stock</h1>
                <p className="text-gray-600 mt-2">Manage your pantry inventory</p>
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
                  <ItemForm<VorratsArtikel>
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
                    <ItemList<VorratsArtikel>
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
