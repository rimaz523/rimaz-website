import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const integrationsApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rimaz-dev-backend-apim.azure-api.net/v1/api/',
    prepareHeaders(headers) {
      headers.set('Ocp-Apim-Subscription-Key', process.env.REACT_APP_APIM_KEY)
      return headers
    },
  }),
  endpoints(builder) {
    return {
      blogPreviews: builder.query({
        query: () => {
          return 'blogPreviews'
        },
      }),
    }
  },
})

export const { useBlogPreviewsQuery } = integrationsApiSlice
