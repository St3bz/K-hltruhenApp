/**
 * API Service Layer
 * Centralized functions for all backend API calls
 * This approach makes it easy to change API endpoints or add logging in one place
 */

import { KuhlschrankArtikel, VorratsArtikel } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

/**
 * Generic fetch wrapper with error handling
 * Handles common HTTP error scenarios
 */
async function fetchAPI<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorData}`);
  }

  // Handle empty responses (e.g., DELETE operations)
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0" || response.status === 204) {
    return {} as T;
  }

  return response.json();
}

/**
 * ============================================
 * KUHLSCHRANK (Refrigerator) API FUNCTIONS
 * ============================================
 */

/**
 * Get all refrigerator items
 */
export async function getAllKuhlschrankArtikels(): Promise<
  KuhlschrankArtikel[]
> {
  return fetchAPI<KuhlschrankArtikel[]>(
    `${API_BASE_URL}/api/v1/kuhlschrank`
  );
}

/**
 * Get a specific refrigerator item by ID
 */
export async function getKuhlschrankArtikelById(
  id: bigint
): Promise<KuhlschrankArtikel> {
  return fetchAPI<KuhlschrankArtikel>(
    `${API_BASE_URL}/api/v1/kuhlschrank/${id}`
  );
}

/**
 * Create a new refrigerator item
 */
export async function createKuhlschrankArtikel(
  artikel: Omit<KuhlschrankArtikel, "id">
): Promise<KuhlschrankArtikel> {
  return fetchAPI<KuhlschrankArtikel>(
    `${API_BASE_URL}/api/v1/kuhlschrank`,
    {
      method: "POST",
      body: JSON.stringify(artikel),
    }
  );
}

/**
 * Update an existing refrigerator item
 */
export async function updateKuhlschrankArtikel(
  id: bigint,
  artikel: Omit<KuhlschrankArtikel, "id">
): Promise<KuhlschrankArtikel> {
  return fetchAPI<KuhlschrankArtikel>(
    `${API_BASE_URL}/api/v1/kuhlschrank/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(artikel),
    }
  );
}

/**
 * Delete a refrigerator item
 */
export async function deleteKuhlschrankArtikel(id: bigint): Promise<void> {
  await fetchAPI<void>(
    `${API_BASE_URL}/api/v1/kuhlschrank/${id}`,
    {
      method: "DELETE",
      // body: JSON.stringify(id),
    }
  );
}

/**
 * ============================================
 * VORRAT (Pantry/Stock) API FUNCTIONS
 * ============================================
 */

/**
 * Get all pantry/stock items
 */
export async function getAllVorratsArtikels(): Promise<VorratsArtikel[]> {
  return fetchAPI<VorratsArtikel[]>(
    `${API_BASE_URL}/api/v1/vorrat`
  );
}

/**
 * Get a specific pantry/stock item by ID
 */
export async function getVorratsArtikelById(id: bigint): Promise<VorratsArtikel> {
  return fetchAPI<VorratsArtikel>(
    `${API_BASE_URL}/api/v1/vorrat/${id}`
  );
}

/**
 * Create a new pantry/stock item
 */
export async function createVorratsArtikel(
  artikel: Omit<VorratsArtikel, "id">
): Promise<VorratsArtikel> {
  return fetchAPI<VorratsArtikel>(
    `${API_BASE_URL}/api/v1/vorrat`,
    {
      method: "POST",
      body: JSON.stringify(artikel),
    }
  );
}

/**
 * Update an existing pantry/stock item
 */
export async function updateVorratsArtikel(
  id: bigint,
  artikel: Omit<VorratsArtikel, "id">
): Promise<VorratsArtikel> {
  return fetchAPI<VorratsArtikel>(
    `${API_BASE_URL}/api/v1/vorrat/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(artikel),
    }
  );
}

/**
 * Delete a pantry/stock item
 */
export async function deleteVorratsArtikel(id: bigint): Promise<void> {
  await fetchAPI<void>(
    `${API_BASE_URL}/api/v1/vorrat/${id}`,
    {
      method: "DELETE",
      //body: JSON.stringify(id),
    }
  );
}
