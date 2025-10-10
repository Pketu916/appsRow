import React, { useState, useEffect } from "react";
import { api } from "../../utils/api";
import Modal from "../components/Modal";
import DataTable from "../components/DataTable";
import toast from "react-hot-toast";

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create', 'edit', 'view'
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
    loginMethod: "password",
    isActive: true,
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await api.adminManagement.getAll(token);

      if (response.success) {
        setAdmins(response.data || []);
        setError(null);
      } else {
        setError(response.message || "Failed to fetch admins");
        toast.error(response.message || "Failed to fetch admins");
      }
    } catch (err) {
      const errorMessage = "Failed to fetch admins";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedAdmin(null);
    setModalMode("create");
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "admin",
      loginMethod: "password",
      isActive: true,
    });
    setShowModal(true);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setModalMode("edit");
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
      role: admin.role,
      loginMethod: admin.loginMethod,
      isActive: admin.isActive,
    });
    setShowModal(true);
  };

  const handleView = (admin) => {
    setSelectedAdmin(admin);
    setModalMode("view");
    setShowModal(true);
  };

  const handleDelete = async (admin) => {
    if (
      !window.confirm(`Are you sure you want to delete admin "${admin.name}"?`)
    ) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const response = await api.adminManagement.delete(admin._id, token);

      if (response.success) {
        toast.success("Admin deleted successfully");
        fetchAdmins();
      } else {
        toast.error(response.message || "Failed to delete admin");
      }
    } catch (err) {
      toast.error("Failed to delete admin");
      console.error("Error deleting admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    if (
      modalMode === "create" &&
      (formData.loginMethod === "password" ||
        formData.loginMethod === "both") &&
      !formData.password
    ) {
      toast.error("Password is required");
      return;
    }

    try {
      setFormLoading(true);
      const token = localStorage.getItem("adminToken");

      let response;
      if (modalMode === "create") {
        response = await api.adminManagement.create(formData, token);
      } else {
        // For edit, don't send password if it's empty
        const updateData = { ...formData };
        if (!updateData.password) {
          delete updateData.password;
        }

        response = await api.adminManagement.update(
          selectedAdmin._id,
          updateData,
          token
        );
      }

      if (response.success) {
        toast.success(
          `Admin ${modalMode === "create" ? "created" : "updated"} successfully`
        );
        setShowModal(false);
        fetchAdmins();
      } else {
        toast.error(response.message || `Failed to ${modalMode} admin`);
      }
    } catch (err) {
      toast.error(`Failed to ${modalMode} admin`);
      console.error(`Error ${modalMode}ing admin:`, err);
    } finally {
      setFormLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedAdmin(null);
    setError(null);
  };

  const getModalTitle = () => {
    switch (modalMode) {
      case "create":
        return "Create New Admin";
      case "edit":
        return "Edit Admin";
      case "view":
        return "View Admin Details";
      default:
        return "Admin";
    }
  };

  const columns = [
    {
      key: "name",
      header: "Name",
      render: (value, row) => (
        <div>
          <div className="font-medium text-gray-900">{value}</div>
          <div className="text-sm text-gray-500">{row.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (value) => {
        const roleColors = {
          super_admin: "bg-red-100 text-red-800",
          admin: "bg-blue-100 text-blue-800",
          moderator: "bg-green-100 text-green-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              roleColors[value] || "bg-gray-100 text-gray-800"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "loginMethod",
      header: "Login Method",
      render: (value) => {
        const methodColors = {
          password: "bg-blue-100 text-blue-800",
          otp: "bg-purple-100 text-purple-800",
          both: "bg-green-100 text-green-800",
        };
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              methodColors[value] || "bg-gray-100 text-gray-800"
            }`}
          >
            {value}
          </span>
        );
      },
    },
    {
      key: "isActive",
      header: "Status",
      render: (value) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
      render: (value) => (
        <div className="text-sm text-gray-900">
          {new Date(value).toLocaleDateString()}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
            Admin Management
          </h1>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={handleCreate}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Add New Admin
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {admins.length}
            </div>
            <div className="text-sm text-gray-600">Total Admins</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {admins.filter((a) => a.isActive).length}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {admins.filter((a) => a.role === "super_admin").length}
            </div>
            <div className="text-sm text-gray-600">Super Admins</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {admins.filter((a) => a.role === "admin").length}
            </div>
            <div className="text-sm text-gray-600">Regular Admins</div>
          </div>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Admins Table */}
        <div className="overflow-x-auto">
          <DataTable
            data={admins}
            columns={columns}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            loading={loading}
            emptyMessage="No admins found"
          />
        </div>
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={getModalTitle()}
        size="md"
      >
        {modalMode === "view" ? (
          <div className="space-y-4">
            {selectedAdmin && (
              <>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.email}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {selectedAdmin.role}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Login Method
                    </label>
                    <p className="mt-1 text-sm text-gray-900 capitalize">
                      {selectedAdmin.loginMethod}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Status
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {selectedAdmin.isActive ? "Active" : "Inactive"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Created At
                    </label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedAdmin.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password{" "}
                {modalMode === "create" ? "*" : "(leave empty to keep current)"}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required={modalMode === "create"}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Login Method
              </label>
              <select
                value={formData.loginMethod}
                onChange={(e) =>
                  setFormData({ ...formData, loginMethod: e.target.value })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="password">Password Only</option>
                <option value="otp">OTP Only</option>
                <option value="both">Both Password & OTP</option>
              </select>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isActive"
                className="ml-2 block text-sm text-gray-900"
              >
                Active
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleModalClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formLoading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {formLoading
                  ? "Saving..."
                  : modalMode === "create"
                  ? "Create Admin"
                  : "Update Admin"}
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default AdminManagement;
