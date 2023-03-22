import { IsGetSearchResult, IsGetSelectedBook } from "./../../models/models";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/",
  headers: { "Content-Type": "application/json" },
});

export const searchAPI = {
  getSearchResult({ intitle, category, pagination, sort, APIKey }: IsGetSearchResult) {
    return instance.get(
      `volumes?q=${category === 'All' ? '' : "+subject:" + category}${"+intitle:" + intitle}&startIndex=${pagination.startIndex}&maxResults=${pagination.maxResults}&orderBy=${sort}&key=${APIKey}`
    );
  },
  getSelectedBook({ bookId, APIKey }: IsGetSelectedBook ) {
    return instance.get(
        `volumes/${bookId}?key=${APIKey}`
    )
  }
};
