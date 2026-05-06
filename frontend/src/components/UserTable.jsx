import { Link } from "react-router-dom";

export default function UserTable({ users, onDelete }) {
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500 py-8">No users found</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="border px-4 py-2 text-left">ID</th>
            <th className="border px-4 py-2 text-left">Full Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            <th className="border px-4 py-2 text-left">Gender</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="hover:bg-gray-100">
              <td className="border px-4 py-2 text-sm">{user._id.slice(-5)}</td>
              <td className="border px-4 py-2">
                {user.firstName} {user.lastName}
              </td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.mobile}</td>
              <td className="border px-4 py-2">{user.gender}</td>
              <td className="border px-4 py-2">
                <span
                  className={`px-3 py-1 rounded text-white text-sm ${
                    user.status === "Active" ? "bg-green-500" : "bg-red-500"
                  }`}>
                  {user.status}
                </span>
              </td>
              <td className="border px-4 py-2">
                <div className="flex gap-2">
                  <Link
                    to={`/view/${user._id}`}
                    className="text-blue-600 hover:underline text-sm">
                    View
                  </Link>
                  <Link
                    to={`/edit/${user._id}`}
                    className="text-blue-600 hover:underline text-sm">
                    Edit
                  </Link>
                  <button
                    onClick={() => onDelete(user._id)}
                    className="text-red-600 hover:underline text-sm">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
