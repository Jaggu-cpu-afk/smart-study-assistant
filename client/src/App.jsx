import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Upload from "./Upload";
import Notes from "./Notes";
import Mcqs from "./Mcqs";
import Flashcards from "./Flashcards";
import Viva from "./Viva";
import Exam from "./Exam";
import ForgotPassword from "./ForgotPassword";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ 
        style: { background: 'rgba(15, 23, 42, 0.9)', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }
      }} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/upload"
          element={<Upload />}
        />
<Route
  path="/notes"
  element={<Notes />}
/>
<Route
  path="/mcqs"
  element={<Mcqs />}
/>
<Route
  path="/flashcards"
  element={<Flashcards />}
/>
<Route
  path="/viva"
  element={<Viva />}
/>
<Route
  path="/exam"
  element={<Exam />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;