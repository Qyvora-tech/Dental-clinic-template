# Hostinger Deployment Guide — City Smiles Dental & Skin Clinic

This project is built with TanStack Start (React 19 + Vite + Nitro SSR) and is fully configured for deployment on **Hostinger**.

---

## Method 1: Hostinger Node.js Web App (Recommended — Full SSR & Features)

Hostinger supports Node.js applications natively in **hPanel** (Business Web Hosting, Cloud Hosting, and VPS).

### Step 1: Upload Your Code or Connect Git

1. Log in to your **Hostinger hPanel**.
2. Go to **Websites** → Select your domain → **Git** (or use **File Manager** / SSH).
3. Connect your repository: `https://github.com/Qyvora-tech/Dental-clinic-template.git` on branch `main`.

### Step 2: Configure Node.js in Hostinger hPanel

1. In the sidebar, go to **Advanced** → **Node.js**.
2. Click **Create Application** and configure:
   - **Node.js version**: `20.x` (or `22.x`)
   - **Application mode**: `Production`
   - **Application root**: Path where files were uploaded (e.g., `/home/u123456789/domains/yourdomain.com/public_html`)
   - **Application startup file**: `.output/server/index.mjs`
3. Click **Create**.

### Step 3: Install Dependencies & Build

1. In the Node.js management panel, click **Run NPM Script** or open **SSH Terminal**:
   ```bash
   npm install
   npm run build
   ```
2. Click **Start / Restart** application.
3. Your site is now live with full SSR, fast page speeds, and interactive booking wizards!

---

## Method 2: Deploying Public Build via Hostinger File Manager / FTP

If you build locally or on CI/CD and upload the compiled assets:

1. On your computer, run:
   ```bash
   npm run build
   ```
2. Open Hostinger **File Manager** and open your `public_html` folder.
3. Upload your project directory including `.output`.
4. The included **`.htaccess`** files:
   - [`public/.htaccess`](./public/.htaccess) (automatically built into `.output/public/.htaccess`)
   - [`.htaccess`](./.htaccess) (at root)
     will automatically manage:
   - Clean URL routing
   - Gzip and Brotli asset compression
   - 1-year immutable caching for static images, JS, and CSS
   - Security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`)

---

## Helpful Verification Commands

- `npm run build`: Generates the production SSR bundle in `.output/`
- `npm run start`: Starts the production server via `node .output/server/index.mjs` (listens on `process.env.PORT || 3000`)
- `npm test`: Runs automated test suite
