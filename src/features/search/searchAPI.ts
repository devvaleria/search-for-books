import { IsGetSearchResult } from './../../models/models';
import axios from "axios";

const instance = axios.create({
    baseURL: 'https://www.googleapis.com/books/v1/',
    headers: { "Content-Type": "application/json" }
})

export const searchAPI = {
    getSearchResult({intitle, category, pagination }: IsGetSearchResult) {
        return instance.get(`volumes?q=intitle:${intitle}${category? '+subject:' + category : ''}&startIndex=${pagination.startIndex}&maxResults=${pagination.maxResults}`)
    }
}