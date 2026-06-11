# 🧠 Smart Study Assistant

![Smart Study Assistant Banner](https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop)

A cutting-edge, AI-powered study companion designed to transform any PDF textbook, lecture slides, or reading material into highly interactive study aids within seconds. Built with the MERN stack and powered by ultra-fast AI models.

## ✨ Features

- **📄 Smart PDF Extraction**: Instantly upload large PDF documents and extract raw text effortlessly.
- **📝 AI Chapter Notes**: Generates highly detailed chapter summaries, core concept breakdowns, and quick-revision bullet points.
- **❓ Automated MCQs**: Generates custom Multiple Choice Questions (5, 10, 15, or 20) with a hidden answer key and detailed explanations at the bottom.
- **🗂️ Interactive Flashcards**: Creates quick-fire Question/Answer flashcards for spaced repetition.
- **🎤 Viva Interview Prep**: Simulates oral examinations by generating rapid-fire Viva questions and model answers.
- **📜 Comprehensive Exams**: Generates both short-form and long-form exam questions to test true mastery of the subject material.
- **🎨 Glassmorphism UI**: A stunning, premium "Neon Dark" frontend aesthetic featuring frosted glass cards, glowing accents, and smooth hover animations.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- React Router DOM
- React Markdown (for rendering beautiful dark-mode AI outputs)
- Custom Vanilla CSS (Glassmorphism architecture)
- Lucide React Icons

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database & Models)
- Multer & PDF-Parse (File handling and text extraction)
- JWT (JSON Web Tokens) for Authentication

**AI Integration:**
- OpenRouter API (Dynamically routing to lightning-fast models like `Llama-3.2-3B`)
- Google Gemini SDK (Fallback support)

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB server)
- OpenRouter API Key (or Google Gemini API Key)

### 1. Clone the repository
```bash
git clone https://github.com/Jaggu-cpu-afk/smart-study-assistant.git
cd smart-study-assistant
```

### 2. Setup the Backend
Open a new terminal and navigate to the server folder:
```bash
cd server
npm install
```

Create a `.env` file inside the `/server` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
OPENROUTER_API_KEY=your_openrouter_api_key
# GEMINI_API_KEY=your_gemini_key (Optional alternative)
```

Start the backend server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open another terminal and navigate to the client folder:
```bash
cd client
npm install
```

Start the frontend Vite server:
```bash
npm run dev
```

### 4. Open the App
Navigate to `http://localhost:5173` in your browser. Register an account, upload a PDF, and start generating!

## 📸 Screenshots

*(Add screenshots of your Dashboard, Upload Zone, and MCQs page here!)*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Jaggu-cpu-afk/smart-study-assistant/issues).


