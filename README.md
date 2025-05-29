# Board Frontend V2

A Board API frontend application.

<p align="center">
  <a href="https://github.com/boomNDS/board-frontend-v2/actions/workflows/ci.yml" target="_blank">
    <img src="https://github.com/boomNDS/board-frontend-v2/actions/workflows/ci.yml/badge.svg" alt="CI Status" />
  </a>
  <a href="https://github.com/boomNDS/board-frontend-v2/blob/main/LICENSE" target="_blank">
    <img src="https://img.shields.io/github/license/boomNDS/board-frontend-v2" alt="License" />
  </a>
</p>

### Environment Setup

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Docker Support

### Building the Docker Image

```bash
# Build the image
docker build --build-arg NEXT_PUBLIC_API_URL=http://localhost:3001 -t board-app .

# Run the container
docker run -p 3000:3000 board-app
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
