export interface Paginator<T> {
  page: number;
  results: T[];
  header:{ columnDef: string; header: string; cell: (element: any) => string; }[];
  total_pages: number;
  total_results: number;
}
