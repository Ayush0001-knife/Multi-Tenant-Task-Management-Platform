import React, { useEffect, useState } from "react";

const Notification = ({ message, duration, bgColor, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.(); // Optional: callback to clear message in parent
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-transform duration-500 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "-translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <div className={`text-white px-6 py-3 rounded-lg shadow-lg ${bgColor}`}>
        {message}
      </div>
    </div>
  );
};

export default Notification;
