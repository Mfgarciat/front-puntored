
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoutes';
import Login from './pages/auth/Login';
import NewRecharge from './pages/recharge/pages/NewRecharge';
import RechargeSummary from './pages/recharge/pages/RechargeSummary';
import RechargeHistory from './pages/recharge/pages/RechargeHistory';
import Header from './components/header/Header';
import './App.css';
import Registration from './pages/user/Registration';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>         
          <Route path="/" element={<Login />} />
          <Route path="/user/registration" element={<Registration />} />
          <Route path="/recharge/new" element={<PrivateRoute><NewRecharge /></PrivateRoute>} />
          <Route path="/recharge/summary" element={<PrivateRoute><RechargeSummary /></PrivateRoute>} />
          <Route path="/recharge/history" element={<PrivateRoute><RechargeHistory /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;