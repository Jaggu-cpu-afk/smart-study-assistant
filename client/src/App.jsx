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
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

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