"use client";

/**
 * Generic Item Form Component
 * Handles create/edit forms for any item type
 * Reusable for both Kuhlschrank and Vorrat items
 */

import { useState, useEffect } from "react";
import { Button, ErrorAlert, InputField, SelectField, SuccessAlert } from "./ui";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface ItemFormProps<T> {
  title: string;
  fields: FormField[];
  initialData?: Partial<T>;
  onSubmit: (data: T) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ItemForm<T extends Record<string, any>>({
  title,
  fields,
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ItemFormProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Initialize form with existing data
  useEffect(() => {
    if (initialData) {
      const data: Record<string, any> = {};
      fields.forEach((field) => {
        data[field.name] = initialData[field.name as keyof typeof initialData] || "";
      });
      setFormData(data);
    } else {
      const data: Record<string, any> = {};
      fields.forEach((field) => {
        data[field.name] = "";
      });
      setFormData(data);
    }
  }, [initialData, fields]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }

      if (field.type === "number" && formData[field.name]) {
        const numValue = Number(formData[field.name]);
        if (isNaN(numValue)) {
          newErrors[field.name] = `${field.label} must be a number`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      // Convert data types based on field type
      const submissionData: Record<string, any> = {};
      fields.forEach((field) => {
        let value = formData[field.name];

        if (field.type === "number") {
          value = value ? Number(value) : 0;
        }

        submissionData[field.name] = value;
      });

      await onSubmit(submissionData as T);
      setSuccessMessage("Item saved successfully!");

      // Reset form after successful submission (unless editing)
      if (!initialData || !initialData.id) {
        const emptyData: Record<string, any> = {};
        fields.forEach((field) => {
          emptyData[field.name] = "";
        });
        setFormData(emptyData);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save item";
      setErrorMessage(message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>

      {errorMessage && (
        <ErrorAlert
          message={errorMessage}
          onClose={() => setErrorMessage("")}
        />
      )}

      {successMessage && (
        <SuccessAlert
          message={successMessage}
          onClose={() => setSuccessMessage("")}
        />
      )}

      <form onSubmit={handleSubmit}>
        {fields.map((field) => {
          const value = formData[field.name] || "";

          if (field.type === "select") {
            return (
              <SelectField
                key={field.name}
                id={field.name}
                name={field.name}
                label={field.label}
                value={value}
                onChange={handleChange}
                options={field.options || []}
                error={errors[field.name]}
              />
            );
          }

          return (
            <InputField
              key={field.name}
              id={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              value={value}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              error={errors[field.name]}
            />
          );
        })}

        <div className="flex gap-4 mt-8">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            Save Item
          </Button>
        </div>
      </form>
    </div>
  );
}
