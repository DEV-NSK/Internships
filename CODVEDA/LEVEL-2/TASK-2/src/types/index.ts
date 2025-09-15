export interface ApiResponse {
  id: number;
  name: string;
  description: string;
  [key: string]: any; // Allow for additional properties
}

export interface SearchParams {
  query: string;
  page: number;
  limit: number;
}