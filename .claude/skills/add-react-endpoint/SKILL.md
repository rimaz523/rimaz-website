---
name: add-react-endpoint
description: Add an RTK Query endpoint (query or mutation) to the website-react-spa frontend and consume it in a component. Use when the React app needs to call a new backend API route.
---

# Add an RTK Query endpoint to website-react-spa

The React app talks to the .NET backend exclusively through a single RTK Query API slice: `src/features/integrations/integrations-api-slice.js`. Do not add `fetch`/`axios` calls in components — add an endpoint here and use the generated hook.

## 1. Add the endpoint

In the `endpoints(builder)` block, add a `builder.query(...)` for reads or `builder.mutation(...)` for writes:

```js
// read
getArticleBySlug: builder.query({
  query: ({ slug }) => ({ url: 'article?slug=' + slug, method: 'GET' }),
}),

// write
sendMessage: builder.mutation({
  query: (data) => ({ url: 'message', method: 'POST', body: data }),
}),
```

- URLs are relative to `baseUrl` (`process.env.REACT_APP_INTEGRATIONS_APIM_URL`); the APIM subscription key + `Content-Type` headers are already injected by `prepareHeaders`. Don't set the base URL or key inline.
- For cache invalidation, use the existing `tagTypes: ['Get', 'Post']` with `providesTags` on queries and `invalidatesTags` on mutations rather than manual refetching.

## 2. Export the generated hook

Add the auto-generated hook to the destructured export at the bottom of the file (name = `use` + endpoint name + `Query`/`Mutation`):

```js
export const {
  useBlogPreviewsQuery,
  useGetArticleBySlugQuery,
  useSendMessageMutation,
} = integrationsApiSlice
```

## 3. Consume it in a component

```js
const { data, isLoading, isError } = useGetArticleBySlugQuery({ slug })
// or
const [sendMessage, { isLoading }] = useSendMessageMutation()
```

Let RTK Query own loading/error/caching state — don't duplicate it in `useState`.

## Notes

- The store (`src/app/store.js`) already wires this slice's `reducer` and `middleware`; **only** a brand-new `createApi` slice would need store changes. The API cache is deliberately **not** in the redux-persist `whitelist`.
- Backend route shapes live in the .NET API controllers (`integrations-dotnet-api/src/WebApi/Controllers/`); match the query/route params to the corresponding MediatR request.
- Run `yarn lint` before committing (a Husky `lint-staged` hook also enforces this).
