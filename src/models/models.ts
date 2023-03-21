export interface IsSearchState {
    foundData: {
        pagination: paginationType
        books: Array<bookType>,
        totalItems: number
    },
    selectedBookId: string | undefined,
    status: 'idle' | 'loading' | 'failed';
    APIKey: string
}

export type paginationType = {
    startIndex: number
    maxResults: number
}

export type bookType = {
    id: string;
    title: string;
    authors: Array<string>;
    categories: Array<string>
    description: string
    imageLinks: {
        small: string;
        medium: string;
        large: string;
    };
}

export interface IsGetSearchResult {
    intitle: string
    category?: string
    pagination: paginationType
}

export interface IsFetchData { 
    id: string;
    volumeInfo: {
        title: string;
        authors: Array<string>
        imageLinks: {
            smallThumbnail:string,
            thumbnail:string,
            small:string,
            medium:string,
            large:string,
            extraLarge:string
        }
        description: string,
        categories: Array<string>,
    }
    
}