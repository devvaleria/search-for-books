export interface IsSearchState {
  foundData: {
    pagination: paginationType;
    books: Array<bookCardType>;
    totalItems: number | undefined;
  };
  currentInfoForSearch: {
    title: string;
    category: categoryType;
    sortingBy: sortType;
  };
  selectedBook: selectedBookType | undefined;
  status: statusType;
  APIKey: string;
  categories: Array<categoryType>;
  sortValues: Array<sortType>;
  currentPage: currentPageType;
}

export interface IsGetSearchResult {
  intitle: string | undefined;
  category: categoryType;
  pagination: paginationType;
  sort: sortType;
  APIKey: string;
}
export interface IsGetSelectedBook {
  bookId: string;
  APIKey: string;
}

export interface IsFetchData {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
    categories: string;
    imageLinks: {
      smallThumbnail?: string;
      thumbnail?: string;
    };
  };
}

export type statusType = "idle" | "loading" | "failed";

export type defaultPropsType = {
  APIKey: string;
  status?: statusType;
};
export type currentPageType = "selectedBookInfo" | "foundBookCards";

export type selectedBookType = {
  id: string;
  title: string;
  categories: Array<categoryType>;
  authors: Array<string>;
  description: string;
  imageLinks: {
    large?: string;
    medium?: string;
    small?: string;
  };
};

export type bookCardType = {
  id: string;
  title: string;
  authors: Array<string>;
  category: string;
  imageLinks: {
    smallThumbnail?: string;
    thumbnail?: string;
  };
};

export type paginationType = {
  startIndex: number;
  maxResults: number;
  step: number
};

export type sortType = "relevance" | "newest";

export type categoryType =
  | "All"
  | "Art"
  | "Biography"
  | "Computers"
  | "History"
  | "Medical"
  | "Poetry";
