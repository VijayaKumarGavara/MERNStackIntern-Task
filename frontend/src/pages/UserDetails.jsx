import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Notification from "../components/Notification";
import { userAPI } from "../services/userApi";

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
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

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">User Details</h1>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Full Name</label>
              <p className="text-lg font-semibold">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Email</label>
              <p className="text-lg">{user.email}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Mobile</label>
              <p className="text-lg">{user.mobile}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Gender</label>
              <p className="text-lg">{user.gender}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Status</label>
              <p
                className={`text-lg font-semibold ${
                  user.status === "Active" ? "text-green-600" : "text-red-600"
                }`}>
                {user.status}
              </p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Location</label>
              <p className="text-lg">{user.location || "N/A"}</p>
            </div>

            <div className="border-b pb-4">
              <label className="text-gray-600 text-sm">Created At</label>
              <p className="text-lg">
                {new Date(user.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>

            <div>
              <label className="text-gray-600 text-sm">Updated At</label>
              <p className="text-lg">
                {new Date(user.updatedAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Link
              to={`/edit/${user._id}`}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Edit
            </Link>
            <Link
              to="/users"
              className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500">
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
