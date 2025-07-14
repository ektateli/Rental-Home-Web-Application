import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Properties from './pages/PropertyPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PropertyDetails from './pages/PropertyDetails'; 
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import OwnerDashboard from './pages/OwnerDashboard';
import TenantDashboard from './pages/TenantDashboard';
import AddProperty from './pages/AddProperty';
import EditProperty from './pages/EditProperty';
import PaymentPage from './pages/PaymentPage';
import './App.css';

function App() {
  return (
   <div className="app-wrapper">  {/* 👈 Add this wrapper */}
      <Router>
        <Navbar />

        <div className="content-wrapper"> {/* 👈 Add content wrapper */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/owner-dashboard" element={<OwnerDashboard />} />
            <Route path="/tenant-dashboard" element={<TenantDashboard />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/edit-property/:id" element={<EditProperty />} />
            <Route path="/booking/:bookingId" element={<PaymentPage />} />
          </Routes>
        </div>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
