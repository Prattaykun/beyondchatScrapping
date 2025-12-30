# BeyondChats Blogs Frontend

This project is the frontend application for the BeyondChats Blogs platform. Built with React and Vite, it provides a user interface to browse and read the blog articles scraped and processed by the backend services.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Workflow](#workflow)
- [Scripts](#scripts)

## ✨ Features

- **Modern UI**: Built with React and styled with Tailwind CSS.
- **Fast Build Tooling**: Uses Vite for rapid development and optimized builds.
- **Routing**: Client-side routing using `react-router-dom`.
- **API Integration**: Fetches blog data from the `nodejs_analyse` backend.
- **Responsive Design**: Designed to work across different device sizes.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## 🚀 Installation

1.  **Navigate to the directory**:
    ```bash
    cd beyondchats-blogs-frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration

The application expects the backend API (`nodejs_analyse`) to be running. By default, it may look for the API at `http://localhost:3000`.

If environment configuration is needed (e.g., API URL), check for `.env` files or create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:3000
```
*(Note: Verify the actual variable name used in the code, commonly `VITE_` prefix is required for Vite).*

## 🏗 Architecture

The project uses a standard Vite + React structure:

```
beyondchats-blogs-frontend/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page components (Home, BlogDetail, etc.)
│   ├── App.jsx      # Main application component & routing setup
│   ├── main.jsx     # Entry point, mounts React to DOM
│   └── index.css    # Global styles (Tailwind imports)
├── eslint.config.js # Linting configuration
├── tailwind.config.js # Tailwind CSS configuration (if present)
├── vite.config.js   # Vite configuration
└── package.json     # Dependencies and scripts
```

### Key Technologies

- **Vite**: Build tool and development server.
- **React**: UI library.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **React Router**: For navigation between pages.

## 🔄 Workflow

1.  **Development**:
    To start the local development server with hot module replacement (HMR):
    ```bash
    npm run dev
    ```
    The app will usually be accessible at `http://localhost:5173`.

2.  **Production Build**:
    To create an optimized production build:
    ```bash
    npm run build
    ```
    The output will be generated in the `dist` directory.

3.  **Preview Production Build**:
    To locally preview the production build:
    ```bash
    npm run preview
    ```

## 📜 Scripts

- `npm run dev`: Starts the development server using `vite`.
- `npm run build`: Builds the app for production using `vite build`.
- `npm run lint`: Runs `eslint` to check for code quality issues.
- `npm run preview`: Previews the built application.
