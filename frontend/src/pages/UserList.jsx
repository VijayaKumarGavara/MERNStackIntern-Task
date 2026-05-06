import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/UserTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import { userAPI } from "../services/userApi";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchQuery]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      let response;
      if (searchQuery) {
        response = await userAPI.searchUsers(searchQuery);
        setUsers(response.data.data);
        setTotalPages(1);
      } else {
        response = await userAPI.getAllUsers(currentPage, 10);
        setUsers(response.data.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to fetch users",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await userAPI.deleteUser(id);
      setNotification({
        message: "User deleted successfully",
        type: "success",
      });
      fetchUsers();
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to delete user",
        type: "error",
      });
    }
  };

  const handleExport = async () => {
    try {
      const response = await userAPI.exportToCSV();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      setNotification({
        message: "Failed to export CSV",
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Users</h1>
          <div className="flex gap-2">
            <Link
              to="/add"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + Add User
            </Link>
            <button
              onClick={handleExport}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Export To CSV
            </button>
          </div>
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserTable users={users} onDelete={handleDelete} />
            {!searchQuery && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
