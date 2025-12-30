
---

# 🚀 BeyondChats – End-to-End AI Blog Processing System

A full-stack, production-ready system that **scrapes blogs, enhances them using AI, and serves them through a modern frontend interface**.

This project demonstrates a **real-world scalable pipeline** involving data ingestion, AI processing, and frontend delivery — structured as modular services.

---

## 📌 Project Overview

The system is divided into **three major phases**:

### **Phase 1 — Web Scraping**

Scrapes blog content from *BeyondChats*, extracts structured data, and stores it in MongoDB.

### **Phase 2 — AI Processing**

Uses Google Gemini + Google Search to rewrite, enhance, and enrich articles while preserving factual integrity.

### **Phase 3 — Frontend**

Displays original and AI-enhanced articles through a modern React + Vite interface.

---

## 🧠 Overall Architecture

```
                  ┌─────────────────────┐
                  │  BeyondChats Website │
                  └─────────┬───────────┘
                            │
                     (Web Scraping)
                            │
          ┌─────────────────▼─────────────────┐
          │        Phase 1: Scraper           │
          │  - Fetch articles                 │
          │  - Parse HTML (title, h1-h6, p)   │
          │  - Store in MongoDB               │
          └─────────────────┬─────────────────┘
                            │
                            ▼
          ┌───────────────────────────────────┐
          │        Phase 2: AI Processor      │
          │  - Google Search (SERP)           │
          │  - Gemini AI rewriting            │
          │  - Content enhancement            │
          │  - Store formatted articles       │
          └─────────────────┬─────────────────┘
                            │
                            ▼
          ┌───────────────────────────────────┐
          │        Phase 3: Frontend          │
          │  - React + Vite                   │
          │  - API consumption                │
          │  - Clean UI rendering             │
          └───────────────────────────────────┘
```

---

## 📁 Repository Structure

```
root/
│
├── nodejs_scrapper/          # Phase 1 – Blog Scraper
│   ├── scraper/
│   ├── models/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── nodejs_analyse/           # Phase 2 – AI Processing
│   ├── services/
│   ├── routes/
│   ├── models/
│   ├── scripts/
│   ├── index.js
│   └── package.json
│
├── beyondchats-blogs-frontend/  # Phase 3 – Frontend
│   ├── src/
│   ├── public/
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🧩 Phase 1 — Scraper (Node.js)

### 🔹 Purpose

Extracts blog articles from BeyondChats and stores structured data into MongoDB.

### 🔹 Technologies

* Node.js
* Express
* Axios
* Cheerio
* MongoDB (Mongoose)

### 🔹 Data Stored

* Title
* Slug
* Headings (`h1–h6`)
* Paragraphs
* Images
* Source URL

### 🔹 Run Instructions

```bash
cd nodejs_scrapper
npm install
npm start
```

This will:

* Crawl articles
* Parse content
* Save structured data in MongoDB

---

## 🧠 Phase 2 — AI Enhancement Engine

### 🔹 Purpose

Transforms raw scraped content into **human-like, SEO-optimized articles**.

### 🔹 Key Features

* Google SERP analysis
* Gemini AI rewriting
* Content restructuring
* Reference injection
* Separate collection for AI-enhanced data

### 🔹 Environment Variables

```env
MONGODB_URI=mongodb://localhost:27017/beyondchats
GEMINI_API_KEY=your_gemini_key
SERP_API_KEY=your_serpapi_key
PORT=3000
```

### 🔹 Run Commands

```bash
cd nodejs_analyse
npm install
npm start        # Start API
npm run run:phase2   # Run AI enhancement workflow
```

### 🔹 Output Collections

| Collection Name      | Description          |
| -------------------- | -------------------- |
| `articles`           | Raw scraped articles |
| `formatted_articles` | AI-enhanced versions |

---

## 🎨 Phase 3 — Frontend (React + Vite)

### 🔹 Features

* Modern UI with Tailwind CSS
* Blog listing & detail pages
* Fetches enhanced articles from backend
* Responsive & SEO-friendly

### 🔹 Setup

```bash
cd beyondchats-blogs-frontend
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

### 🔹 Environment Variable

```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## 🔁 End-to-End Workflow

1. **Run Scraper** → Collects raw blogs
2. **Run AI Processor** → Enhances content
3. **Start Frontend** → Displays enriched articles
4. **User reads SEO-optimized content**

---

## ✅ Key Highlights

* Clean separation of concerns
* Production-style backend architecture
* AI-driven content enhancement
* Scalable and modular design
* Real-world engineering workflow

---

## 👨‍💻 Author

**Prattay Roy Chowdhury**
Full Stack Developer | AI Engineer
Built as part of an advanced full-stack & AI engineering project.

---