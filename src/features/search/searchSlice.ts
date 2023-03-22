import { searchAPI } from "./searchAPI";
import {
  PayloadAction,
  combineReducers,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  IsSearchState,
  IsGetSearchResult,
  IsFetchData,
  IsGetSelectedBook,
  bookCardType,
  selectedBookType,
} from "./../../models/models";

const initialState: IsSearchState = {
  foundData: {
    books: [],
    totalItems: undefined,
    pagination: {
      startIndex: 0,
      maxResults: 30,
    },
  },
  selectedBook: undefined,
  status: "idle",
  APIKey: "",
  categories: ['All', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry'],
  sortValues: ['relevance', 'newest']
};

export const getSearchResult = createAsyncThunk(
  "search/getSearchResult",
  async ({ intitle, category, pagination, sort, APIKey }: IsGetSearchResult) => {
    const response = await searchAPI.getSearchResult({
      intitle,
      category,
      pagination,
      sort,
      APIKey
    });
    return response.data;
  }
);

export const getSelectedBook = createAsyncThunk(
  "search/getSelectedBook",
  async ({ bookId, APIKey }: IsGetSelectedBook) => {
    const response = await searchAPI.getSelectedBook({
      bookId,
      APIKey
    });
    return response.data;
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSelectedBook: (state, action: PayloadAction<string>) => {
      
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchResult.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(getSearchResult.fulfilled, (state, action) => {
      state.foundData.totalItems = action.payload.totalItems
      const data: bookCardType[] = [];
      if (action.payload.totalItems > 0){
        action.payload.items?.map((book: IsFetchData ) => {
          const bookObject: bookCardType = {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            category: book.volumeInfo.categories,
            imageLinks: {
              smallThumbnail: book.volumeInfo.imageLinks?.smallThumbnail,
              thumbnail: book.volumeInfo.imageLinks?.thumbnail
            },
          };
          data.push(bookObject)
      });}
      state.foundData.books = data;
      state.status = "idle";
    });

    builder.addCase(getSelectedBook.fulfilled, (state, action) => {
      state.status = "idle";
      const book = action.payload
      const data:selectedBookType = {
        id: book.id,
        title: book.volumeInfo.title,
        categories: book.volumeInfo.categories,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        imageLinks: {
          large: book.volumeInfo.imageLinks.large,
          medium:book.volumeInfo.imageLinks.medium,
          small:book.volumeInfo.imageLinks.small
        }
      }
      state.selectedBook = data
    });

    builder.addCase(getSearchResult.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setSelectedBook } = searchSlice.actions;
export default searchSlice.reducer;
