# Codevolution
YouTube: https://www.youtube.com/watch?v=ZjAqacIC_3c&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=2

React.js is a library, and has a lot of variables when choosing routing, data fetching, bundling etc. Next.js is a React framework with built-in support for such needs.

# Why Next.js?
- Automatic code splitting
- In-built routing (file-based routing)
- Built-in optimization
- Faster dev speed (with Incremental static generation)
- Image optimization
- Partial Prerendering Development

# What is Next.js?
- A React based opinionated framework for production ready web project.

# React Server Components(RSC)
- Two types of React components:
  - Server Components (default in Next.js)
    - Handle files, calling DB (No hooks or user interaction supported)
  - Client Components (the usual React component)
    - To handle user interaction and can use hooks (no file handling or calling DB)
    - Need to write 'use client' at top.

# Creating routes from Scratch

## Routing Convention
- All routes must be inside `/app` folder.
- Every route file must be named `page.tsx` or `page.js`
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

## Dynamic Routes
- Using folder names within square brackets `[` and `]` for dynamic route segments in browser URL
- Eg. `/app/products/[productId]/page.tsx`
- With above folder structure, you can navigate to `localhost:3000/products/1` or `localhost:3000/products/8` and it'll render content of `[productId]/page.tsx`.