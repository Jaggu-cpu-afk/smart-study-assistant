# 🧠 Smart Study Assistant

![Smart Study Assistant Banner](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80\&w=1200\&auto=format\&fit=crop)

A cutting-edge, AI-powered study companion designed to transform any PDF textbook, lecture slides, or reading material into highly interactive study aids within seconds. Built with the MERN stack and powered by ultra-fast AI models.

---

## 🌐 Live Demo

🚀 **Smart Study Assistant is Live!**

👉 **[Click Here to Open Smart Study Assistant](https://smart-study-assistant-4mvj.vercel.app/)**

Experience the application by:

* Uploading PDF documents
* Generating AI-powered Notes
* Creating MCQs instantly
* Studying with Flashcards
* Preparing for Viva Questions
* Generating Exam Questions

**Live URL:** https://smart-study-assistant-4mvj.vercel.app/

---

## ✨ Features

### 📄 Smart PDF Extraction

Instantly upload large PDF documents and extract raw text effortlessly.

### 📝 AI Chapter Notes

Generates highly detailed chapter summaries, core concept breakdowns, and quick-revision bullet points.

### ❓ Automated MCQs

Generates custom Multiple Choice Questions (5, 10, 15, or 20) with answer keys and explanations.

### 🗂️ Interactive Flashcards

Creates Question/Answer flashcards for efficient revision and spaced repetition.

### 🎤 Viva Interview Prep

Simulates oral examinations by generating Viva questions and model answers.

### 📜 Comprehensive Exams

Generates both short-form and long-form exam questions to evaluate understanding.

### 🎨 Modern Glassmorphism UI

Premium Neon Dark interface featuring:

* Frosted glass cards
* Smooth animations
* Responsive design
* Modern user experience

---

## 🛠️ Technology Stack

### Frontend

* React.js (Vite)
* React Router DOM
* React Markdown
* Vanilla CSS
* Lucide React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* Multer
* PDF-Parse
* JWT Authentication

### AI Integration

* OpenRouter API
* Google Gemini API (Fallback Support)

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

* Node.js (v16 or higher)
* MongoDB Atlas Account (or Local MongoDB)
* OpenRouter API Key
* Google Gemini API Key (Optional)

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-study-assistant.git

cd smart-study-assistant
```

---

### 2️⃣ Backend Setup

Navigate to the server folder:

```bash
cd server

npm install
```

Create a `.env` file inside the `/server` directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key

OPENROUTER_API_KEY=your_openrouter_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend server:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

Open another terminal:

```bash
cd client

npm install
```

Start the frontend:

```bash
npm run dev
```

---

### 4️⃣ Open the Application

Visit:

```text
http://localhost:5173
```

Register an account, upload a PDF, and start generating study materials instantly.

---

## 📂 Project Structure

```text
smart-study-assistant/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── assets/
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── uploads/
│
└── README.md
```

---

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for:

* User Registration
* Secure Login
* Protected Routes
* Session Management

---

## 🤖 AI-Powered Study Tools

Smart Study Assistant can generate:

✅ Detailed Notes

✅ Multiple Choice Questions (MCQs)

✅ Flashcards

✅ Viva Questions

✅ Exam Questions

All generated directly from uploaded PDF content.

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Dashboard
* PDF Upload
* Notes Generator
* MCQ Generator
* Flashcards
* Viva Section

---

## 🌟 Future Enhancements

* Voice-Based Learning
* AI Study Planner
* Quiz Analytics
* Multi-Language Support
* Dark/Light Theme Toggle
* Mobile Application

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome.

Feel free to fork the repository and submit a pull request.

---

## ⭐ Support

If you found this project helpful:

⭐ Star the repository

🍴 Fork the project

📢 Share it with others

---

## 👨‍💻 Author

**Jagapathi**

Full-Stack Developer | AI Enthusiast

Building intelligent solutions with React, Node.js, MongoDB, and Generative AI.

---

## 📜 License

This project is licensed under the MIT License.
