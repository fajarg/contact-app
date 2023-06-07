import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApiSlice = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://contact.herokuapp.com/" }),
  tagTypes: ["contactApi"],
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => ({
        url: `/contact`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      providesTags: ["contactApi"],
    }),
    getContactById: builder.query({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
    postContact: builder.mutation({
      query: (data) => ({
        url: `/contact`,
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          photo: data.photo,
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
    putContact: builder.mutation({
      query: (data) => ({
        url: `/contact/${data.id}`,
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: {
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          photo: data.photo,
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }),
      invalidatesTags: ["contactApi"],
    }),
  }),
});

export const {
  useGetAllContactQuery,
  useGetContactByIdQuery,
  usePostContactMutation,
  usePutContactMutation,
  useDeleteContactMutation,
} = contactApiSlice;
