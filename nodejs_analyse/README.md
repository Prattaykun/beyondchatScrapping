
---

# BeyondChats – Full Stack Web Developer Intern Assignment

## 📌 Overview

This project is developed as part of the **BeyondChats Full Stack Web Developer Intern Assignment**.
The goal is to scrape blog articles, enhance them using AI by referencing top-ranking Google articles, and expose APIs for frontend consumption.

The assignment is divided into **three phases**. This repository covers **Phase 1 and Phase 2** completely.

---

## 🧩 Project Architecture (High Level)

```
MongoDB
 ├── articles (original scraped articles)
 └── formatted_articles (AI-enhanced versions)

Backend (Node.js + Express)
 ├── CRUD APIs for articles
 ├── CRUD APIs for formatted articles
 └── Phase-2 background workflow (AI enhancement)

Frontend (Phase 3 – upcoming)
 └── Uses CRUD APIs to display and compare articles
```

---

## 🛠 Tech Stack

* **Backend:** Node.js, Express
* **Database:** MongoDB
* **Web Scraping:** Axios, Cheerio
* **Google Search:** SerpAPI
* **AI Model:** Google Gemini (gemini-1.5-pro)
* **Environment Management:** dotenv

---

## 📁 Folder Structure

```
phase-2/
├── index.js                      # API Server
├── scripts/
│   └── runPhase2Workflow.js      # Phase-2 automation job
├── models/
│   ├── Article.js
│   └── FormattedArticle.js
├── routes/
│   ├── articles.routes.js
│   └── formattedArticles.routes.js
├── services/
│   ├── fetchArticles.js
│   ├── googleSearch.js
│   ├── scrapeContent.js
│   ├── geminiRewrite.js
│   └── saveFormattedArticle.js
├── utils/
│   ├── cleanHtml.js
│   └── logger.js
├── .env
├── package.json
└── README.md
```

---

## 🧠 Phase Breakdown

---

## ✅ Phase 1 – Article Scraping & CRUD APIs

### Features

* Scraped blog articles from BeyondChats
* Stored articles in MongoDB
* Implemented full CRUD APIs

### APIs

```
POST   /api/articles
GET    /api/articles
GET    /api/articles/:id
PUT    /api/articles/:id
DELETE /api/articles/:id
```

---

## 🚀 Phase 2 – AI-Powered Article Enhancement (Core Focus)

### What This Phase Does

For each original article:

1. Searches the article title on Google
2. Fetches the top 2 ranking blog/article links
3. Scrapes the main readable content
4. Uses **Gemini LLM** to rewrite the original article
5. Matches tone, structure, and clarity of top-ranking articles
6. Appends reference links at the bottom
7. Stores the enhanced article in a separate collection

---

## 🧪 Why Two Collections?

| Collection           | Purpose                   |
| -------------------- | ------------------------- |
| `articles`           | Original scraped articles |
| `formatted_articles` | AI-enhanced versions      |

This allows:

* Side-by-side comparison in frontend
* Version control
* Clean separation of original vs AI content

---

## 🔁 Phase 2 Workflow Execution

### Important Design Decision

The AI workflow is **not executed automatically** when the server starts.

✔ Implemented as a **separate background script**
✔ Prevents duplicate processing
✔ Mimics real-world production pipelines

---

## ▶ Running the Project

### 1️⃣ Install Dependencies

```bash
npm install
```

---

### 2️⃣ Setup Environment Variables (`.env`)

```env
PORT=8001
MONGODB_URI=mongodb://127.0.0.1:27017/beyondchats
GEMINI_API_KEY=your_gemini_api_key
SERP_API_KEY=your_serpapi_key
```

---

### 3️⃣ Start Backend API Server

```bash
npm start
```

Server runs at:

```
http://localhost:8001
```

---

### 4️⃣ Run Phase-2 AI Enhancement Workflow

```bash
npm run run:phase2
```

This:

* Fetches original articles
* Enhances them using Gemini
* Stores results in `formatted_articles`

---

## 🔍 Testing APIs

### Get Original Articles

```
GET /api/articles
```

### Get All AI-Enhanced Articles

```
GET /api/formatted-articles
```

### Get Enhanced Version of an Article

```
GET /api/formatted-articles/by-original/:articleId
```

These endpoints will be consumed by the frontend in Phase 3.

---

## ⚠️ Scraping Limitations (Handled Gracefully)

Some websites block automated scraping (403 errors via CloudFront).

✔ Handled by:

* Browser-like headers
* Graceful fallback
* Skipping blocked domains without crashing the pipeline

This reflects **real-world scraping constraints**.

---

## 🧩 Phase 3 (Planned)

* React-based frontend
* Responsive UI
* Side-by-side comparison:

  * Original article
  * AI-enhanced article
* Reference links visible
* Clean, professional layout

---

## 🏁 Conclusion

This project demonstrates:

* Clean backend architecture
* Separation of concerns
* Practical web scraping
* AI integration
* Scalable, production-style workflow design

---

## 👤 Author

**Prattay Roy Chowdhury**
Full Stack Web Developer Intern Candidate

---
