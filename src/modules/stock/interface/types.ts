// Generated by https://quicktype.io

export interface BookResponse {
 _id: string;
 isbn: string;
 name: string;
 edition: string;
 observation: string;
 author: Author;
 category: Author;
 editorial: Author;
 __v: number;
}

export interface Author {
 _id: string;
 name: string;
 gender?: string;
 __v: number;
 description?: string;
}

// Generated by https://quicktype.io

export interface StockResponse {
 book: string;
 current: number;
 stock: number;
 _id: string;
 __v: number;
}

export type StockPayload = Omit<StockResponse, '_id' | '__v'>;
