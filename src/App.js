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
import VendorForm from "./components/Forms/VendorForm";
import MailForm from "./components/Forms/MailForm";
import InvoiceForm from "./components/Forms/InvoiceForm";
import GoodsForm from "./components/Forms/GoodsForm";
import ContractForm from "./components/Forms/ContractForm";
import ContractApprover from "./components/Permissions/ContractApprover";
import InvoiceApprover from "./components/Permissions/InvoiceApprover";
import InvoiceCreator from "./components/Permissions/InvoiceCreator";
import VendorApprover from "./components/Permissions/VendorApprover";
import VendorCreator from "./components/Permissions/VendorCreator";
import GoodsReceiptCreator from "./components/Permissions/GoodsReceiptCreator";
import UserDetails from "./components/Records/UserDetails";
import SetPermissions from "./components/Records/SetPermissions";
import UserRecords from "./components/Records/UserRecords";
import VendorRecords from "./components/Records/VendorRecords";
import MailRecords from "./components/Records/MailRecords";
import InvoiceRecords from "./components/Records/InvoiceRecords";
import GoodsRecords from "./components/Records/GoodsRecords";
import ContractRecords from "./components/Records/ContractRecords";
import ContractDetails from "./components/Records/ContractDetails";
import InvoiceDetails from "./components/Records/InvoiceDetails";
import VendorDetails from "./components/Records/VendorDetails";
import MailDetails from "./components/Records/MailDetails";
import GoodsDetails from "./components/Records/GoodsDetails";
import Settings from "./components/App/Settings";
import Roles from "./components/Records/Roles";
import SetRoles from "./components/Records/SetRoles";

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
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element, path }) => {
    return checkAuthentication() ? element : <Navigate to="/" />;
  };

  const PublicRoute = ({ element, path }) => {
    const isAuthenticated = !!sessionStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/" /> : element;
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

          <Route
            path="/profile/:id"
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
            path="/records/users"
            element={<ProtectedRoute element={<UserRecords />} />}
          />

          <Route
            path="/records/vendors"
            element={<ProtectedRoute element={<VendorRecords />} />}
          />

          <Route
            path="/records/mails"
            element={<ProtectedRoute element={<MailRecords />} />}
          />

          <Route
            path="/records/invoices"
            element={<ProtectedRoute element={<InvoiceRecords />} />}
          />

          <Route
            path="/records/goods"
            element={<ProtectedRoute element={<GoodsRecords />} />}
          />
          <Route
            path="/records/contracts"
            element={<ProtectedRoute element={<ContractRecords />} />}
          />
          <Route
            path="/records/vendors/:id"
            element={<ProtectedRoute element={<VendorDetails />} />}
          />

          <Route
            path="/records/mails/:id"
            element={<ProtectedRoute element={<MailDetails />} />}
          />

          <Route
            path="/records/invoices/:id"
            element={<ProtectedRoute element={<InvoiceDetails />} />}
          />

          <Route
            path="/records/goods/:id"
            element={<ProtectedRoute element={<GoodsDetails />} />}
          />

          <Route
            path="/records/contracts/:id"
            element={<ProtectedRoute element={<ContractDetails />} />}
          />
          <Route
            path="/permissions"
            element={<ProtectedRoute element={<Permissions />} />}
          />

          <Route
            path="/useraccess"
            element={<ProtectedRoute element={<Roles />} />}
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute
                element={<Settings handleLogout={handleLogout} />}
              />
            }
          />

          <Route
            path="/forms"
            element={<ProtectedRoute element={<Forms />} />}
          />

          <Route
            path="/forms/vendor"
            element={<ProtectedRoute element={<VendorForm />} />}
          />

          <Route
            path="/forms/mail"
            element={<ProtectedRoute element={<MailForm />} />}
          />

          <Route
            path="/forms/invoice"
            element={<ProtectedRoute element={<InvoiceForm />} />}
          />

          <Route
            path="/forms/goods"
            element={<ProtectedRoute element={<GoodsForm />} />}
          />
          <Route
            path="/forms/contract"
            element={<ProtectedRoute element={<ContractForm />} />}
          />

          <Route
            path="/permissions/contractapprover"
            element={<ProtectedRoute element={<ContractApprover />} />}
          />
          <Route
            path="/permissions/invoicecreator"
            element={<ProtectedRoute element={<InvoiceCreator />} />}
          />
          <Route
            path="/permissions/invoiceapprover"
            element={<ProtectedRoute element={<InvoiceApprover />} />}
          />

          <Route
            path="/permissions/vendorapprover"
            element={<ProtectedRoute element={<VendorApprover />} />}
          />

          <Route
            path="/permissions/vendorcreator"
            element={<ProtectedRoute element={<VendorCreator />} />}
          />

          <Route
            path="/permissions/goodsreceiptcreator"
            element={<ProtectedRoute element={<GoodsReceiptCreator />} />}
          />

          <Route
            path="/records/users/:id"
            element={<ProtectedRoute element={<UserDetails />} />}
          />

          <Route
            path="/records/users/:id/setpermissions"
            element={<ProtectedRoute element={<SetPermissions />} />}
          />
          <Route
            path="/records/users/:id/setroles"
            element={<ProtectedRoute element={<SetRoles />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={<PageNotFound />} />}
          />

          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
