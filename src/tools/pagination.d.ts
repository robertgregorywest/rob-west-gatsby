export type PageContext = {
  basePath: string;
  currentPage: number;
  limit: number;
  skip: number;
  prevPagePath: string;
  nextPagePath: string;
  hasPrevPage: boolean;
  hasNextPage: boolean;
};

export function paginate(
  basePath: string,
  totalCount: number,
  perPage: number
): Array<{ path: string; context: PageContext }>;

export function pageTitle(title: string, currentPage: number): string;

export function canonicalUrl(
  siteUrl: string | null | undefined,
  basePath: string,
  currentPage: number
): string;
