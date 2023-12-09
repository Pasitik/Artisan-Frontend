import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import LoginForm from './features/login/Login';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';
import './App.css';
import SignupForm from './features/login/Signup';
import AddAddress from './features/AddAddress';
import AddArtisan from './features/AddArtisan';
import ApiProvider from './data/ApiProvider';
import SearchArtisan from './pages/SearchArtisan';
import ArtisanDetail from './pages/ArtisanDetail';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <ApiProvider>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/artisan/address" element={<AddAddress />} />
              <Route path="/artisan/join" element={<AddArtisan />} />
              <Route path="/artisan/profile" element={<Profile />} />
            </Route>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/search" element={<SearchArtisan />} />
            <Route path="/artisan/:id" element={<ArtisanDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ApiProvider>
    </>
  );
}

export default App;
