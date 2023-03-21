import { searchAPI } from "./searchAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IsSearchState,
  IsGetSearchResult,
  bookType,
  IsFetchData,
} from "./../../models/models";

const initialState: IsSearchState = {
  foundData: {
    books: [],
    totalItems: 0,
    pagination: {
      startIndex: 0,
      maxResults: 30,
    },
  },
  selectedBookId: undefined,
  status: "idle",
  APIKey: "",
};

type item = {
  volumeInfo: {
    title: string;
  };
};

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async ({ intitle, category, pagination }: IsGetSearchResult) => {
    const response = await searchAPI.getSearchResult({
      intitle,
      category,
      pagination,
    });
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.status = "loading";
    });
    
    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.status = "idle";
      const data: bookType[] = [];
      action.payload.items.map((book: IsFetchData | undefined) => {
        if (book) {
          const bookObject: bookType = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            description: book.volumeInfo.description,
            imageLinks: {
              small: book.volumeInfo.imageLinks.small,
              medium: book.volumeInfo.imageLinks.medium,
              large: book.volumeInfo.imageLinks.large,
            },
          };
          data.push(bookObject);
        }
      });
      state.foundData.books = data;
    });

    builder.addCase(getSearchResult.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = searchSlice.actions;
export default searchSlice.reducer;
