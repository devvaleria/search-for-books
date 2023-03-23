import { searchAPI } from "./searchAPI";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IsSearchState,
  IsGetSearchResult,
  IsFetchData,
  IsGetSelectedBook,
  bookCardType,
  selectedBookType,
  paginationType,
  currentPageType,
} from "./../../models/models";

const initialState: IsSearchState = {
  foundData: {
    books: [],
    totalItems: undefined,
    pagination: {
      startIndex: 0,
      maxResults: 30,
      step: 30,
    },
  },
  currentInfoForSearch: {
    title: "",
    category: "All",
    sortingBy: "relevance",
  },
  selectedBook: undefined,
  status: "idle",
  APIKey: "",
  categories: [
    "All",
    "Art",
    "Biography",
    "Computers",
    "History",
    "Medical",
    "Poetry",
  ],
  sortValues: ["relevance", "newest"],
  currentPage: "foundBookCards",
};

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async (
    { intitle, category, pagination, sort, APIKey }: IsGetSearchResult,
    { dispatch }
  ) => {
    dispatch(setCurrentPage("foundBookCards"));
    dispatch(resetFoundData());
    dispatch(
      setCurrentInfoForSearch({ title: intitle, sortingBy: sort, category })
    );
    const newPagination: paginationType = {
      startIndex: 0,
      maxResults: pagination.maxResults,
      step: pagination.step,
    };
    const response = await searchAPI.getSearchResult({
      intitle,
      category,
      pagination: newPagination,
      sort,
      APIKey,
    });
    dispatch(resetPagitation());
    return response.data;
  }
);
export const loadMoreResults = createAsyncThunk(
  "search/loadMoreResults",
  async (
    { intitle, category, pagination, sort, APIKey }: IsGetSearchResult,
    { dispatch }
  ) => {
    const newPagination: paginationType = {
      startIndex: pagination.startIndex + pagination.step,
      maxResults: pagination.maxResults,
      step: pagination.step,
    };
    const response = await searchAPI.getSearchResult({
      intitle,
      category,
      pagination: newPagination,
      sort,
      APIKey,
    });
    dispatch(setNextPagitation());
    return response.data;
  }
);

export const getSelectedBook = createAsyncThunk(
  "search/getSelectedBook",
  async ({ bookId, APIKey }: IsGetSelectedBook, { dispatch }) => {
    dispatch(setCurrentPage("selectedBookInfo"));
    const response = await searchAPI.getSelectedBook({
      bookId,
      APIKey,
    });
    return response.data;
  }
);

export const getUsersAPIKey = createAsyncThunk(
  "users/fetchByIdStatus",
  (APIKey: string, { dispatch }) => {
    if (!APIKey) {
      if (document.cookie.includes("APIKey=")) {
        const indexOfAPIKey = document.cookie.indexOf("APIKey=");
        const APIKeyCookie = document.cookie
          .slice(7 + indexOfAPIKey)
          .split(";")[0];
        dispatch(setAPIKey(APIKeyCookie));
      } else {
        let APIKeyPrompt: string | null = "";
        while (!APIKeyPrompt) {
          APIKeyPrompt = prompt(
            "Enter your API key. Info: https://developers.google.com/books/docs/v1/using?hl=en#APIKey"
          );
          if (APIKeyPrompt) {
            dispatch(setAPIKey(APIKeyPrompt));
            document.cookie = "APIKey=" + APIKeyPrompt;
          }
        }
      }
    } else {
      dispatch(setAPIKey(APIKey));
      document.cookie = "APIKey=" + APIKey;
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setAPIKey: (state, action: PayloadAction<string>) => {
      state.APIKey = action.payload;
    },
    resetFoundData: (state) => {
      const resetData = {
        books: [],
        totalItems: undefined,
        pagination: {
          startIndex: 0,
          maxResults: state.foundData.pagination.maxResults,
          step: state.foundData.pagination.step,
        },
      };
      state.foundData = resetData;
    },
    setCurrentPage: (state, action: PayloadAction<currentPageType>) => {
      state.currentPage = action.payload;
    },
    setNextPagitation: (state) => {
      state.foundData.pagination.startIndex += state.foundData.pagination.step;
    },
    resetPagitation: (state) => {
      state.foundData.pagination.startIndex = 0;
    },
    setCurrentInfoForSearch: (state, action) => {
      state.currentInfoForSearch.category = action.payload.category;
      state.currentInfoForSearch.sortingBy = action.payload.sortingBy;
      state.currentInfoForSearch.title = action.payload.title;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loadMoreResults.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getSelectedBook.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.foundData.totalItems = action.payload.totalItems;
      const data: bookCardType[] = [];
      if (action.payload.totalItems > 0) {
        action.payload.items?.map((book: IsFetchData) => {
          const bookObject: bookCardType = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            category: book.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
              thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            },
          };
          data.push(bookObject);
        });
      }
      state.foundData.books = data;
      state.status = "idle";
    });

    builder.addCase(getSelectedBook.fulfilled, (state, action) => {
      state.status = "idle";
      const book = action.payload;
      const data: selectedBookType = {
        id: book.id,
        title: book.volumeInfo.title,
        categories: book.volumeInfo.categories,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        imageLinks: {
          large: book.volumeInfo.imageLinks?.large,
          medium: book.volumeInfo.imageLinks?.medium,
          small: book.volumeInfo.imageLinks?.small,
        },
      };
      state.selectedBook = data;
    });

    builder.addCase(loadMoreResults.fulfilled, (state, action) => {
      const data: bookCardType[] = [];
      if (action.payload.totalItems > 0) {
        action.payload.items?.map((book: IsFetchData) => {
          const bookObject: bookCardType = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            category: book.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
              thumbnail: book.volumeInfo.imageLinks?.thumbnail,
            },
          };
          data.push(bookObject);
        });
      }
      data.map((item) => state.foundData.books.push(item));
      state.status = "idle";
    });

    builder.addCase(getSearchResult.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getSelectedBook.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(loadMoreResults.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {
  setAPIKey,
  setNextPagitation,
  setCurrentInfoForSearch,
  resetPagitation,
  setCurrentPage,
  resetFoundData,
} = searchSlice.actions;
export default searchSlice.reducer;
