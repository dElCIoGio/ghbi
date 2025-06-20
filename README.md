# GHBI

GHBI is a React and TypeScript storefront for the Glossy Hair By Isis shop. The project uses Vite for development and bundles the app for deployment with Nginx. Product data is fetched from the Shopify Storefront API.

## Prerequisites

- Node.js 20+
- npm

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the example environment file and provide your values:
   ```bash
   cp .env.example .env
   ```
   - `VITE_ENV` – the current environment (e.g. `development` or `production`).
   - `VITE_SHOPIFY_DOMAIN` – your Shopify domain without a protocol.
   - `VITE_SHOPIFY_STOREFRONT_TOKEN` – Storefront API access token.
   - `VITE_SHOPIFY_API_VERSION` – version of the Shopify API to use.
3. Start the development server:
   ```bash
   npm run dev
   ```

## Build

Create an optimized production build:

```bash
npm run build
```

## Docker deployment

Build the Docker image and start the container:

```bash
docker build -t ghbi .
docker run --env-file .env -p 8080:8080 ghbi
```

The application will be served on port `8080`.
