"use client";

/**
 * Reusable UI Components for the Kühltruhnen App
 */

// ============================================
// LOADING SPINNER
// ============================================

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
}

// ============================================
// ERROR ALERT
// ============================================

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start justify-between">
      <div>
        <p className="text-red-800 font-medium">Error</p>
        <p className="text-red-700 text-sm mt-1">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-500 hover:text-red-700 ml-4"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ============================================
// SUCCESS ALERT
// ============================================

interface SuccessAlertProps {
  message: string;
  onClose?: () => void;
}

export function SuccessAlert({ message, onClose }: SuccessAlertProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start justify-between">
      <div>
        <p className="text-green-800 font-medium">Success</p>
        <p className="text-green-700 text-sm mt-1">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-green-500 hover:text-green-700 ml-4"
        >
          ✕
        </button>
      )}
    </div>
  );
}

// ============================================
// INPUT FIELD
// ============================================

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function InputField({
  label,
  error,
  id,
  ...props
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        className={`w-full px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      />
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// ============================================
// SELECT FIELD
// ============================================

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function SelectField({
  label,
  options,
  error,
  id,
  ...props
}: SelectFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        id={id}
        className={`w-full px-3 py-2 border rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        {...props}
      >
        <option value="">-- Select --</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}

// ============================================
// BUTTON VARIANTS
// ============================================

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "secondary";
  loading?: boolean;
}

export function Button({
  variant = "primary",
  loading = false,
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    secondary:
      "bg-gray-300 text-gray-800 hover:bg-gray-400 focus:ring-gray-500",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${
        disabled || loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center">
          <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-l-transparent rounded-full"></span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

// ============================================
// DELETE CONFIRMATION DIALOG
// ============================================

interface DeleteConfirmationProps {
  isOpen: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export function DeleteConfirmation({
  isOpen,
  itemName,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Delete Item?
        </h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>? This action cannot be undone.
        </p>
        <div className="flex gap-4 justify-end">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            loading={isDeleting}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// CARD CONTAINER
// ============================================

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 ${className}`}>
      {children}
    </div>
  );
}
