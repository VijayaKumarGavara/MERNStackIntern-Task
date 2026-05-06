import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";
import Notification from "../components/Notification";
import LoadingSpinner from "../components/LoadingSpinner";
import { userAPI } from "../services/userApi";

export default function AddEditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUserById(id);
      setUser(response.data.data);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to fetch user",
        type: "error",
      });
      navigate("/users");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (id) {
        await userAPI.updateUser(id, formData);
        setNotification({
          message: "User updated successfully",
          type: "success",
        });
      } else {
        await userAPI.createUser(formData);
        setNotification({
          message: "User created successfully",
          type: "success",
        });
      }
      setTimeout(() => navigate("/users"), 1500);
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "Failed to save user",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <h1 className="text-3xl font-bold mb-8">
          {id ? "Edit User" : "Add User"}
        </h1>

        {loading && !user ? (
          <LoadingSpinner />
        ) : (
          <UserForm
            initialData={user}
            onSubmit={handleSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
