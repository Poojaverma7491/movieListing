import { ReactNode, RefObject } from "react";
import { Category} from "./utils"
import { ButtonProps } from "@mui/material";
import { LinkProps } from "react-router-dom";
import { SxProps, Theme } from "@mui/system";
import type { Swiper as SwiperType } from "swiper";

// Media
export interface BaseMedia {
  id: number;
  title?: string;
  name?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  first_air_date?: string | null;
  vote_average?: number;
  media_type?: Category
}

export interface MovieItem extends BaseMedia {
  title: string; 
}

export interface MediaItem extends BaseMedia {
  category: Category;
}

export interface MediaDetail extends BaseMedia {
  genres?: Genre[];
  [key: string]: any;
}
export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string; 
}

export interface Suggestion {
  id: number;
  category: Category;
  title: string;
  thumbnail: string;
  description: string;
}

// Response
export interface MovieTvListResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}
export interface VideoResponse {
  id: number;
  results: Video[];
}
export interface BookmarkResponse {
  success: boolean;
  data: (string | number)[];
}

// Props

export interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (filters: Record<string, string>) => void;
  category: Category;
}


export interface SortDialogProps {
  open: boolean;
  onClose: () => void;
  onApply: (sort: string) => void;
  currentSort: string;
}

export interface AppButtonProps extends ButtonProps {
  to?: LinkProps["to"];
  sx?: SxProps<Theme>;
  theme?: "contained" | "outlined";
}

export interface CarouselItemProps {
  item: MovieItem;
  onTrailerOpen: (key: string | null) => void;
}

export interface MovieCardProps {
  item: MediaItem;
  category: Category;
  bookmarkedOverride?: boolean | null;
  disableLike?: boolean;
  userLoggedIn?: boolean;
}

export interface PageHeaderProps {
  children: ReactNode;
}

export interface LoginDialogProps {
  open: boolean;
  onClose: () => void;
}

export interface MovieSearchProps {
  onFilterChange: (filters: Record<string, string>) => void;
  onSortChange: (sort: string) => void;
  currentSort: string;
  safeCategory: Category;
}

export interface MovieGridProps {
  category?: Category
  type?: string;
  keyword?: string;
  genreId?: string;
}

export interface ListSwiperIconButtonProps {
  swiperRef: RefObject<SwiperType | null>;
}

export interface SectionProps {
  title: string;
  linkTo: string;
  children: ReactNode;
}

export interface MovieListProps {
  category: Category;
  type: string;
  id?: string | number;
  genreId?: string;
  userLoggedIn?: boolean;
}

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

// Params
export interface RouteParams {
  category?: Category;
  keyword?: string;
  genreId?: string;
  type?: string;
  [key: string]: string | undefined;
}

export interface RequestParams {
  params?: Record<string, any>;
}

// ApiConfig
export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  originalImage: (imgPath: string) => string;
  w500Image: (imgPath: string) => string;
}

// Auth
export interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  userLoggedIn: boolean;
  checkUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  authedFetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface Props {
  index: number;
  title: string;
  genreId: number;
}
