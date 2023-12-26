import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Main from "./components/App/Main";
import Login from "./components/App/Login";
import Signup from "./components/App/Signup";
import Records from "./components/Records/Records";
import Profile from "./components/App/Profile";
import Home from "./components/App/Home";
import About from "./components/App/About";
import Permissions from "./components/Permissions/Permissions";
import UnauthorizedPage from "./components/App/UnauthorizedPage";
import Forms from "./components/Forms/Forms";
import PageNotFound from "./components/App/PageNotFound";

// import UserRecords from "./components/Records/UserRecords";
// import VendorRecords from "./components/Records/VendorRecords";
// import MailRecords from "./components/Records/MailRecords";
// import InvoiceRecords from "./components/Records/InvoiceRecords";
// import GoodsRecords from "./components/Records/GoodsRecords";
// import ContractRecords from "./components/Records/ContractRecords";

// import VendorForm from "./components/Forms/VendorForm";
// import MailForm from "./components/Forms/MailForm";
// import InvoiceForm from "./components/Forms/InvoiceForm";
// import GoodsForm from "./components/Forms/GoodsForm";
// import ContractForm from "./components/Forms/ContractForm";
// import UserDetails from "./components/Records/UserDetails";
// import VendorDetails from "./components/Records/VendorDetails";
// import MailDetails from "./components/Records/MailDetails";
// import InvoiceDetails from "./components/Records/InvoiceDetails";
// import GoodsDetails from "./components/Records/GoodsDetails";
// import ContractDetails from "./components/Records/ContractDetails";
// import ImageViewer from "./components/ImageViewer";
// import UserRole from "./components/roles/UserRole";
// import AdminRole from "./components/roles/AdminRole";
// import ChangePermissions from "./components/Records/ChangePermissions";
// import ContractApprover from "./components/Permissions/ContractApprover";
// import InvoiceCreator from "./components/Permissions/InvoiceCreator";
// import InvoiceApprover from "./components/Permissions/InvoiceApprover";
// import VendorApprover from "./components/Permissions/VendorApprover";
// import VendorCreator from "./components/Permissions/VendorCreator";

// import GoodsReceiptCreator from "./components/Permissions/GoodsReceiptCreator";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!sessionStorage.getItem("token")
  );

  const checkAuthentication = () => {
    return isAuthenticated;
  };

  const handleLogin = (token) => {
    sessionStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element, path }) => {
    return checkAuthentication() ? element : <Navigate to="/home" />;
  };

  const PublicRoute = ({ element, path }) => {
    const isAuthenticated = !!sessionStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/unauthorized" /> : element;
  };

  return (
    <Router>
      <div className="bg-gray-100 pb-9">
        <Routes>
          <Route path="/" element={<PublicRoute element={<Main />} />} />
          <Route
            path="/signup"
            element={
              <PublicRoute element={<Signup handleLogin={handleLogin} />} />
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute element={<Login handleLogin={handleLogin} />} />
            }
          />

          {/* Use the ProtectedRoute component for authenticated routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={<Profile handleLogout={handleLogout} />}
              />
            }
          />
          <Route
            path="/about"
            element={<ProtectedRoute element={<About />} />}
          />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route
            path="/records"
            element={<ProtectedRoute element={<Records />} />}
          />
          <Route
            path="/permissions"
            element={<ProtectedRoute element={<Permissions />} />}
          />
          <Route
            path="/forms"
            element={<ProtectedRoute element={<Forms />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={<PageNotFound />} />}
          />

          {/* Add a route for unauthorized access */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
