import React from 'react';

const AdminModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Request to Add New Admin</h2>
        <p className="mb-4">
          Admin requests are placed and, once accepted, the admin will be created. 
          The user’s email will have access to this panel, allowing multiple users to manage this dashboard.
        </p>
        <input
          type="text"
          placeholder="Admin Name"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="email"
          placeholder="Admin Email"
          className="block w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;