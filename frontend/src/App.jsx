import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserList from "./pages/UserList";
import AddEditUser from "./pages/AddEditUser";
import UserDetails from "./pages/UserDetails";
import "./index.css";

export default function App() {
  return (
    <Router>
      <div className="bg-white">
        <nav className="bg-gray-800 text-white px-4 py-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold">MERN User Management</h1>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/add" element={<AddEditUser />} />
          <Route path="/edit/:id" element={<AddEditUser />} />
          <Route path="/view/:id" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}
