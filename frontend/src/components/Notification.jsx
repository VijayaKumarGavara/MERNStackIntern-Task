import { useEffect } from "react";

export default function Notification({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div
      className={`${bgColor} text-white px-4 py-3 rounded mb-4 flex justify-between items-center`}>
      <span>{message}</span>
      <button onClick={onClose} className="font-bold text-xl">
        ×
      </button>
    </div>
  );
}
