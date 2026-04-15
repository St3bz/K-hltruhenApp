/**
 * TypeScript interfaces for the Kühltruhnen App
 * These define the structure of data from the backend API
 */

/**
 * Kategorien für Kühlschrank-Artikel
 * Matches the Java Enum from backend
 */
export enum KuhlschrankKategorie {
  Obst = "Obst",
  Gemüse = "Gemüse",
  Fleisch = "Fleisch",
  Fertiggerichte = "Fertiggerichte",
  Beilagen = "Beilagen",
  Sonstiges = "Sonstiges",
}

/**
 * Artikel im Kühlschrank
 * Represents an item stored in the refrigerator
 */
export interface KuhlschrankArtikel {
  id?: bigint;
  name: string;
  menge: number; // quantity
  kategorie: KuhlschrankKategorie;
  haltbarkeitsdatum: string | Date; // expiration date (ISO format from backend)
}

/**
 * Artikel im Vorrat (Pantry/Stock)
 * Represents an item in the pantry/inventory
 */
export interface VorratsArtikel {
  id?: bigint;
  name: string;
  zielMenge: number; // target quantity
  momentaneMenge: number; // current quantity
}

/**
 * Generic API Response wrapper
 * Used for error handling and status messages
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

/**
 * Long type - JavaScript doesn't have true 64-bit integers
 * Using number is sufficient for IDs in this context
 */
export type Long = number | bigint;
