export interface IsSearchState {
  foundData: {
    pagination: paginationType;
    books: Array<bookCardType>;
    totalItems: number | undefined;
  };
  selectedBook: selectedBookType | undefined;
  status: "idle" | "loading" | "failed";
  APIKey: string;
  categories: Array<categoryType>
  sortValues: Array<sortType>
}

export type selectedBookType = {
    id: string;
    title: string;
    categories: Array<categoryType>;
    authors: Array<string>;
    description: string;
    imageLinks: {
        large: string;
        medium: string;
        small: string;
    };
}

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
};
export type sortType = 'relevance' | 'newest'
export type categoryType = 'All' | 'Art' | 'Biography' | 'Computers' | 'History' | 'Medical' | 'Poetry'

export interface IsGetSearchResult {
  intitle: string | undefined;
  category?: categoryType;
  pagination: paginationType;
  sort: sortType;
  APIKey: string
}
export interface IsGetSelectedBook {
  bookId: string,
  APIKey: string
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
