import React from "react";

const Modal = ({ imageSrc, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 relative w-11/12 md:w-1/2 lg:w-1/3">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <img
          src={imageSrc}
          alt="Modal content"
          className="w-full h-auto object-cover rounded"
        />
      </div>
    </div>
  );
};

export default Modal;
