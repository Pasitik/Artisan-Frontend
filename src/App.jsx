import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css';
import SignupForm from './pages/Signup';
import AddAddress from './features/AddAddress';
import AddArtisan from './features/AddArtisan';
import ApiProvider from './data/ApiProvider';
import SearchArtisan from './features/SearchArtisan';
import ArtisanDetail from './features/ArtisanDetail';
import Profile from './features/Profile';
import About from './pages/About';
import UserProvider from './data/UserProvider';
import LearnMore from './pages/LeanMore';

function App() {
  return (
    <>
      <ApiProvider>
        <UserProvider>
          <Router>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/artisan/address" element={<AddAddress />} />
                <Route path="/artisan/join" element={<AddArtisan />} />
                <Route path="/artisan/profile" element={<Profile />} />
              </Route>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<SignupForm />} />
              <Route path="/search" element={<SearchArtisan />} />
              <Route path="/more" element={<LearnMore />} />
              <Route path="/artisan/:id" element={<ArtisanDetail />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </UserProvider>
      </ApiProvider>
    </>
  );
}

export default App;
