import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({ 
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://json-server-vercel-flax-eight.vercel.app/'
	}),
	tagTypes: ['Heroes'],
	endpoints: builder => ({
		getHeroes: builder.query({
			query: () => '/heroes',
			providesTags: ['Heroes']
		}),
		createHero: builder.mutation({
			query: hero => ({
				url: '/heroes',
				method: 'POST',
				body: hero
			}),
			invalidatesTags: ['Heroes']
		}),
		deleteHero: builder.mutation({
			query: id => ({
				url: `/heroes/${id}`,
				method: 'DELETE',
				body: id
			}),
			invalidatesTags: ['Heroes']
		})
	})
})

export const {
	useGetHeroesQuery, 
	useCreateHeroMutation, 
	useDeleteHeroMutation
} = apiSlice;