import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const integrationsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rimaz-dev-backend-apim.azure-api.net/v1/api/',
    prepareHeaders(headers) {
      headers.set('Ocp-Apim-Subscription-Key', process.env.REACT_APP_APIM_KEY)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Get', 'Post'],
  endpoints(builder) {
    return {
      blogPreviews: builder.query({
        query: () => {
          return 'blogPreviews'
        },
      }),
      sendMessage: builder.mutation({
        query: (data) => {
          const { message, ...body } = data
          body.content = message
          return {
            url: 'message',
            method: 'POST',
            body,
          }
        },
      }),
    }
  },
})

export const { useBlogPreviewsQuery, useSendMessageMutation } = integrationsApiSlice
