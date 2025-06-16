# Stock Analyzer Backend

A backend service built with **Express** and **TypeScript** for stock data processing and analysis.  
It includes authentication, protected routes, utility functions, and a clean, modular folder structure ready for integration with stock APIs like Upstox or Groww.

## 🔧 How to Run

1. **Install dependencies**
```bash
npm install
````

2. **Setup environment variables**
   Copy `.env.example` to `.env` and update the required values.

3. **Start the server**

```bash
npm run start

# start in dev mode
npm run dev
```

---

## 📦 Components

* ✅ JWT Authentication
* 🔒 Protected Routes middleware
* 🌐 CORS support
* 🧩 Service Layer for handling logic
* ⚙️ Utility functions
* 🧾 TypeScript type safety
* 📁 Modular and scalable folder structure

```
src/
├── config/         → Env config, logger, route setup
├── db/             → DB connection ('postgres')
├── middlewares/    → CORS, JWT route protection
├── routes/         → Auth and other routes
├── services/       → API service logic
├── types/          → TypeScript interfaces
├── utils/          → Hashing, tokens, messages, etc.
├── index.ts        → Server entry point
```

---

> Ready to integrate with stock APIs for real-time or historical data.

