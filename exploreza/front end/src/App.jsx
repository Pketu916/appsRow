// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import Home from "./pages/home";
import PropertyDetails from "./pages/PropertyDetails";
import TravelDestinations from "./pages/TravelDestinations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import TestUpload from "./pages/TestUpload";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import TravelDestinationsAdmin from "./admin/pages/TravelDestinationsAdmin";
import Enquiry from "./admin/pages/Enquiry";
import AdminManagement from "./admin/pages/AdminManagement";
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/travel-destinations" element={<TravelDestinations />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Test Routes */}
        <Route path="/test-upload" element={<TestUpload />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="destinations" element={<TravelDestinationsAdmin />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="management" element={<AdminManagement />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
