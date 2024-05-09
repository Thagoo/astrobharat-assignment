// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Astrologer } from "../../utils/types";

// Define a service using a base URL and expected endpoints
export const astrologerApi = createApi({
  reducerPath: "astrologerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",
  }),
  endpoints: (builder) => ({
    getAstrologers: builder.query<Astrologer, string>({
      query: () => `astrologers`,
    }),
    registerAstrologer: builder.query<Astrologer, string>({
      query: (data) => ({
        url: `astrologers/register`,
        method: "POST",
        body: { data },
      }),
    }),
    updateAstrologer: builder.query<
      any,
      { astrologerId: string; data: Astrologer }
    >({
      query: ({ astrologerId, data }) => ({
        url: `astrologers/${astrologerId}`,
        method: "PUT",
        body: { data },
      }),
    }),
    deleteAstrologer: builder.query<any, { astrologerId: string }>({
      query: (astrologerId) => ({
        url: `astrologers/${astrologerId}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAstrologersQuery } = astrologerApi;
