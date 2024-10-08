# Codevolution
YouTube [Playlist](https://www.youtube.com/watch?v=ZjAqacIC_3c&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=2)

React.js is a library, and has a lot of variables when choosing routing, data fetching, bundling etc. Next.js is a React framework with built-in support for such needs.

## Why Next.js?
- Automatic code splitting
- In-built routing (file-based routing)
- Built-in optimization
- Faster dev speed (with Incremental static generation)
- Image optimization
- Partial Prerendering Development

## What is Next.js?
A React based opinionated framework for production ready web project.

## React Server Components(RSC)
- Two types of React components:
  - Server Components (default in Next.js)
    - Handle files, calling DB (No hooks or user interaction supported)
  - Client Components (the usual React component)
    - To handle user interaction and can use hooks (no file handling or calling DB)
    - Need to write 'use client' at top.

## Creating routes from Scratch

### Routing Convention
- All routes must be inside `/app` folder.
- Every route folder should have a file that must be named `page.tsx` or `page.js`
- Every folder becomes a path segment in browser URL. (can be used for nested path segments)

An example routing structure and its browser URL,

```sh
    src/app
    |
    |__ about
    |   |__ page.tsx # localhost:3000/about
    |
    |__ profile
    |   |__ page.tsx # localhost:3000/profile
    |
    |__ layout.tsx
    |__ page.tsx # localhost:3000
```

### Dynamic Routes
- Using folder names within square brackets `[` and `]` for dynamic route segments in browser URL
- Eg. `/app/products/[productId]/page.tsx`
- With above folder structure, you can navigate to `localhost:3000/products/1` or `localhost:3000/products/8` and it'll render content of `[productId]/page.tsx`.

### File Colocation
- Every folder that has `page.tsx` or `page.js` becomes the publicly accessible route, but a folder without these file can still be created and used for keeping together relevant components files.
- The `page.tsx` or `page.js` must export a default function with React component.

### Private Folder
- You can prefix the folder name with an underscore `_` to make it a private folder, which is not accessible by the Next.js routing system.
- In case you want to have a path segment with `_`, you can prefix the folder name with `%5F` which is an encoded version of underscore.

### Route Groups
- You can group the related route pages into a parent folder. Eg. put `register`, `login` in a folder called `auth`. But this will make `auth` part of route segment.
- If we want to avoid this problem, we can use the Route Group concept, where we rename the folder as `(auth)` that tells Next.js to skip it from routing system.

## Layout
- Since a `page` is unique to a single route. We can use `Layout` to share the UI components between multiple routes.
- A `layout.tsx` file has a component that accepts a `children` prop which is rendered between the layout.

> #### Warning
> 
> - Root level `layout.tsx` file is an auto-generated file and even after you delete it manually, it gets re-generated during code compilation.
> - You **WILL LOOSE** your prevoius custom code changes within layout file if you manually delete it and Next.js re-generates it.

- You can also have nested routes with their own `layout.tsx`

> #### NOTE
>
> `page.tsx` contents are loaded only when the exact route is matched. But `layout.tsx` contents are loaded from parent folder till current folder.

### Route Group Layout
- **Route Group** can be used to selectively apply a layout to certain URL segments in same folder level.
- Eg. Keeping a common layout for `login` and `register` but not for `forgot-password`. You'd need to create a new Route Group folder (with `(` and `)`) and then create a `layout.tsx` within that folder.

## Metadata API
- Used for better SEO and indexing.
- 2 ways,
    1. Export a static metadata object. Like,
        ```js
        export const metadata = {
            title: "Page Title",
            description: "Description"
        }
        ```
    2. Dynamic `generateMetadata()` function
        ```js
        export const generateMetadata = async ({params}: Props): Promise<Metadata> => {
            // Do some page-specific async data fetch
            return {
                title: "" // dynamic title content
            }
        }
        ```
- Metadata can be used in Layout as well as Page.
- Layout metadata is passed to all pages within that layout, but Page metadata is only for that specific route page.
- Page based metadata always override Layout metadata if same keys are present.
> You can't export both, static `metadata` object and the `generateMetadata()` method from the same route segment.


### Metadata Object
- By using `Metadata` interface from `next` package, we can get list of all attributes supported by Next.js regarding metadata.
- Eg. `title` has more properties,
    ```js
    export const metadata = {
        title: {
            absolute: "Absolute Title", // ignores the 'title.template' of parent
            default: "Fallback Title", // child segments fallback to this value, if 'title' not defined
            template: "%s | Common Title" // applies to child segments, not the current page
        }
    }
    ```

## UI Navigation
Can be done using `<Link>` or programmatically.

### Using `<Link>` component
- `href` attribute of `<Link>` component can be used to navigate.
- `active` link can be identified using `usePathname()` hook and matching `pathname` with current page's Nav link.
    ```js
    ...
    import { usePathname } from "next/navigation";
    ...
    ...
    const pathname = usePathname();
    ...
    ...
    const isActive = pathname.startsWith(link.href);
    ```
> #### NOTE
> - As Next.js components are **Server Rendered** by default, we can't use hooks within them.
> - We'll need to make them client-rendered using `"use client"` at the top of the component file.

### Programmatically using `useRouter()` hook
- Ensure your component is client-rendered. Put `"use client"` at top.
    ```js
    "use client";

    import { useRouter } from "next/navigation";
    ...
    ...
    const router = useRouter();
    ...
    ...
    // Inside an event handler
    router.push("/"); // navigates to 'Home' page

    ```
- You can also replace the history with `replace` attribute on `<Link>` component.
- Methods on `router` are:
  - `push("/")` - the usual way to navigate, pushes route to stack
  - `replace("/")` - replaces the history
  - `back()` - navigate to previous page
  - `forward()` - navigate to next page

## Templates
- `layout` simply mount the `children` content by keeping the rest of the component un-touched.
- If you want to reset the component state and effects (eg. entry/exit animation or useEffect() effects), you can use the `template.js` or `template.tsx` to replace layout.
- Templates re-mount the DOM which resets the state and effects within a component.
- You can use both `layout` and `template` in a component. Layout renders first and has children as template.
- For shared UIs, always prefer **Layout**

## Loading UI
- Displays a UI while the component is loading.
- Create a `loading.tsx` inside the folder where loading is required.
- When used with **Shared Layouts**, enabled interactively while the component is loading. Eg. Header navigation or sidebar is still clickable while page is loading.

## Error Handling
- Use `error.tsx` file inside a route folder to show a fallback UI whenever an unhandled error is thrown from the route component.
- This functional component, also receives an `error` object as a prop to show more info like `error.message`.
    ```js
    "use client"
    export default function ErrorBoundary({error}: {error: Error}) {
        return <div>{error.message}</div>
    }
    ```
- `error.tsx` file wraps the route segment and its children in a React **Error Boundary** ensuring the rest of the application remains functional.
> #### NOTE
> You can add a **"Realod"** button in the `error.tsx` to attempt a retry for that route segment instead of full page reload.

## Special Files
Since Next.js is an opinionated React.js framework, it has many special files that perform complex task and gives us a simple developer experience.

- `page.tsx`
- `layout.tsx`
- `template.tsx`
- `not-found.tsx`
- `loading.tsx`
- `error.tsx`

The order in which these files get rendered is,

```html
<Layout>
    <Template>
        <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<NotFound />}>
                    <Page />
                </ErrorBoundary>
            </Suspense>
        </ErrorBoundary>
    </Template>
</Layout>
```

## Recover from re-triable error
- We can use the `reset()` function provided by ErrorBoundary to re-render the component throwing error.

> #### Important
> To ensure that `page.tsx` can be recovered, we need to convert that to a client-rendered component by writing "use client" at the top.

- Error events bubble up to the closest parent's **ErrorBoundary**, hence, in a nested URL segment scenario, placing the `error.tsx` file at parent level will ensure it's handling error from all its children components, and replace the entire parent with `fallback` UI provided in `error.tsx`.

> #### Important
> - In case of Layout, **ErrorBoundary** works differently, as `<Layout/>` is the parent most rendered component for any URL segment, hence <ErrorBoundary/> can't handle layout's error.
> - We can place the `error.tsx` at the parent level of the `layout.tsx` to catch the errors from layout file.



## Next.js Project Structure
```yaml
/my-nextjs-app
  /components      # Reusable UI components
  /pages           # Next.js pages (includes dynamic routes)
  /public          # Static assets (images, fonts)
  /styles          # Global styles and CSS modules
  /utils           # Utility functions and helpers
  /hooks           # Custom React hooks
  /context         # React context providers (for state management)
  /api             # API routes (for serverless functions)
  /lib             # Libraries or services (e.g., API clients)
  /types           # TypeScript types (if using TypeScript)
  /middleware      # Middleware functions (e.g., authentication)
  /tests           # Unit and integration tests
  next.config.js   # Next.js configuration
  tsconfig.json    # TypeScript configuration (if using TypeScript)
  package.json     # Project dependencies and scripts
```