import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./features/login/Login";
import Home from "./pages/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import "./App.css";
import SignupForm from "./features/login/signup";
import AddArtisan from "./features/AddAddress";
import ApiProvider from "./data/ApiProvider";

function App() {
  return (
    <>
      <ApiProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/artisan/join" element={<AddArtisan />} />
            </Route>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Routes>
        </Router>
      </ApiProvider>
    </>
  );
}

export default App;
