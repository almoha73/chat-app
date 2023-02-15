import { AuthProvider } from "./context/AuthContext.js";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Signin/SignIn";
import SignUp from "./pages/SignUp";
import ChatRoom from "./pages/ChatRoom";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
