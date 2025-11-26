export type ListType = "popular" | "top_rated" | "upcoming";
export type Category = "movie" | "tv";
export type Filters = { category?: Category; rating?: number; search?: string; };
export const isType = (val: string | undefined): val is ListType =>
    ['popular', 'top_rated', 'upcoming'].includes(val || '');

export const headerNav = [
  { display: 'Home', path: '/home' },
  { display: 'Movies', path: '/home/movie' },
  { display: 'TV Shows', path: '/home/tv' },
  { display: 'Bookmarks', path: '/bookmarks' },
];
