import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bibliotecaApi = createApi({
  reducerPath: "bibliotecaApi",
  baseQuery: fetchBaseQuery(),
  tagTypes: [],
  endpoints: () => ({}),
});

// export const { useGetCharactersQuery, useLazyGetCharactersQuery } = bibliotecaApi;