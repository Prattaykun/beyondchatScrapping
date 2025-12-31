# Node.js Scraper for BeyondChats Blogs

This project is a Node.js-based backend application designed to scrape blog articles from [BeyondChats](https://beyondchats.com), parse their content, and store them in a MongoDB database. It serves as the initial data ingestion phase for the BeyondChats blog analysis system.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Architecture](#architecture)
- [Workflow](#workflow)
- [Scripts](#scripts)

## ✨ Features

- **Automated Scraping**: Fetches blog posts from the BeyondChats website.
- **Content Parsing**: Extracts titles, images, headings, paragraphs, and lists from HTML content using `cheerio`.
- **Duplicate Prevention**: Checks for existing articles to avoid duplicate entries.
- **Data Persistence**: Stores structured data in MongoDB using `mongoose`.
- **Express Server**: Provides an entry point to trigger the scraping pipeline.

## 🛠 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local instance or Atlas URI)

## 🚀 Installation

1.  **Navigate to the directory**:
    ```bash
    cd nodejs_scrapper
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

## ⚙️ Configuration

Create a `.env` file in the root of the `nodejs_scrapper` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/beyondchats
PORT=5000
```

- `MONGO_URI`: Your MongoDB connection string.
- `PORT`: The port on which the server will run (default is 5000).

## 🏗 Architecture

The project is structured as follows:

```
nodejs_scrapper/
├── config/
│   └── db.js            # MongoDB connection logic
├── models/
│   └── Article.js       # Mongoose schema for Blog Articles
├── scraper/
│   ├── fetchBlogs.js    # Logic to fetch blog URLs
│   ├── fetchLastPages.js # Logic to determine pagination
│   ├── fetchMainPage.js # Initial page fetch
│   ├── parseBlogs.js    # Logic to parse HTML content
│   └── scrapeBlogs.js   # Standalone script to run the full scraping process
├── routes/              # Express routes (if applicable)
├── server.js            # Main application entry point
└── package.json         # Project dependencies and scripts
```

### Key Components

- **`server.js`**: Initializes the database connection and runs the scraping pipeline sequence (`fetchMainPage` -> `fetchLastPages` -> `fetchBlogs` -> `parseBlogs`) on startup.
- **`scraper/scrapeBlogs.js`**: A comprehensive script that connects to the DB, crawls the blog list, visits individual pages, parses the content (handling headings, paragraphs, lists, and images), and saves them to the database.
- **`models/Article.js`**: Defines the data structure for storing articles, including title, source URL, images, and content blocks.

## 🔄 Workflow

1.  **Setup**: Ensure your MongoDB instance is running and your `.env` file is configured.
2.  **Run Scraper**: You can run the scraper in two ways:
    - **Standalone Script**: Runs the dedicated scraping script.
      ```bash
      npm run scrape
      ```
    - **Server Startup**: Starts the Express server, which also triggers the bootstrap scraping pipeline.
      ```bash
      npm start
      ```
3.  **Data Verification**: Check your MongoDB database to verify that articles have been correctly populated in the `articles` collection.

## 📜 Scripts

  - `npm start`: Runs `node server.js`. Starts the server and runs the bootstrap scraping sequence.
  - `npm run scrape`: Runs `node scripts/runScraper.js`. Executes the standalone scraping script.
## 🔗 Live Demo & API Endpoints

### Base URL
https://beyondchat-scrapping-3vja.vercel.app

### Fetch All Articles
GET /api/articles  
https://beyondchat-scrapping-3vja.vercel.app/api/articles

### Fetch Single Article
GET /api/articles/:id  
Example:  
https://beyondchat-scrapping-3vja.vercel.app/api/articles/6954a626c2aa9cfe6e53bafc

### Create Article
POST /api/articles  
https://beyondchat-scrapping-3vja.vercel.app/api/articles

### Update Article
PUT /api/articles/:id

### Delete Article
DELETE /api/articles/:id

