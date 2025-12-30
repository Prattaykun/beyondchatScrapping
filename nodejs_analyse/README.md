# Node.js Article Enhancer & Analysis API (Phase 2)

This project is the "Phase 2" backend for the BeyondChats blog system. It is responsible for analyzing, enhancing, and serving the blog articles that were scraped in Phase 1. It provides an API for the frontend to retrieve formatted articles and includes scripts for further data processing.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Workflow](#workflow)
- [Scripts](#scripts)

## ✨ Features

- **REST API**: Serves article data via Express endpoints.
- **Article Processing**: Scripts to analyze and format raw scraped data.
- **CORS Enabled**: Configured to allow requests from the frontend application (`http://localhost:5173`).
- **Database Integration**: Connects to the same MongoDB database as the scraper to access and update article data.

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (containing data from Phase 1)

## 🚀 Installation

1.  **Navigate to the directory**:
    ```bash
    cd nodejs_analyse
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the root of the `nodejs_analyse` directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/beyondchats
PORT=3000
```

- `MONGODB_URI`: Your MongoDB connection string. **Note**: This variable name is slightly different from the scraper (`MONGO_URI`). Ensure it points to the same database.
- `PORT`: The port on which the API server will run (default is 3000).

## 🏗 Architecture

The project follows a standard Express MVC-like structure:

```
nodejs_analyse/
├── routes/
│   ├── articles.routes.js          # Routes for raw article data
│   └── formattedArticles.routes.js # Routes for processed/formatted articles
├── scripts/
│   └── runPhase2Workflow.js        # Script to execute the Phase 2 analysis workflow
├── models/                         # Mongoose models (shared/compatible with Phase 1)
├── services/                       # Business logic for article processing
├── utils/                          # Helper functions
├── index.js                        # Main application entry point
└── package.json                    # Project dependencies and scripts
```

### Key Components

- **`index.js`**: Sets up the Express server, middleware (CORS, JSON parsing), and connects to MongoDB. It defines the base routes for the API.
- **`routes/`**: Defines the endpoints for accessing articles.
    - `/api/articles`: Access raw scraped articles.
    - `/api/formatted-articles`: Access processed articles ready for display.
- **`scripts/runPhase2Workflow.js`**: A script intended to be run to perform batch processing or enhancement on the scraped data (Phase 2 tasks).

## 🔄 Workflow

1.  **Start the Server**:
    To serve the API for the frontend, start the application:
    ```bash
    npm start
    ```
    The server will typically run on `http://localhost:3000`.

2.  **Run Analysis Phase**:
    To execute the specific analysis or enhancement workflow (Phase 2):
    ```bash
    npm run run:phase2
    ```
    This runs the `scripts/runPhase2Workflow.js` script, which processes the data in the database.

## 📜 Scripts

- `npm start`: Runs `node index.js`. Starts the API server.
- `npm run run:workflow`: Alias for `npm start`.
- `npm run run:phase2`: Runs `node scripts/runPhase2Workflow.js`. Executes the background processing task.
