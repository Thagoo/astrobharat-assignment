// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Astrologer } from "../../utils/types";

// Define a service using a base URL and expected endpoints
export const astrologerApi = createApi({
  reducerPath: "astrologerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/",
  }),
  endpoints: (builder) => ({
    getAstrologers: builder.query<Astrologer[], void>({
      query: () => `astrologers`,
    }),
    getAstrologerById: builder.query<Astrologer, string>({
      query: (id) => `astrologers/${id}`,
    }),
    registerAstrologer: builder.mutation<string, Astrologer>({
      query: (data) => ({
        url: `astrologers/register`,
        method: "POST",
        body: data,
      }),
    }),
    updateAstrologer: builder.mutation<
      any,
      { astrologerId: string; data: Astrologer }
    >({
      query: ({ astrologerId, data }) => ({
        url: `astrologers/${astrologerId}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAstrologer: builder.mutation<any, string>({
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
export const { useGetAstrologerByIdQuery } = astrologerApi;
export const { useRegisterAstrologerMutation } = astrologerApi;
export const { useUpdateAstrologerMutation } = astrologerApi;
export const { useDeleteAstrologerMutation } = astrologerApi;
