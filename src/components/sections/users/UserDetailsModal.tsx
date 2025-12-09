"use client";
import { motion } from "framer-motion";
import {
  FiX,
  FiUser,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiShield,
  FiCheckCircle,
  FiAlertCircle,
  FiLayers,
} from "react-icons/fi";

function UserDetailsModal({ open, onClose, data }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          bg-white dark:bg-gray-900 w-[90%] lg:w-[55%] max-h-[90vh] 
          overflow-y-auto rounded-2xl shadow-2xl border border-gray-200
          dark:border-gray-700 px-4 py-6 sm:px-6
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiUser className="text-indigo-500" />
            User Details
          </h1>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FiX className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* User Summary */}
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-start gap-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center bg-indigo-100 dark:bg-indigo-800 rounded-full">
            <FiUser className="text-indigo-600 dark:text-indigo-300 text-2xl" />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {data.fullName}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <FiMail /> {data.email}
            </p>
          </div>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Role */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiShield className="text-purple-500" />
                {data.role}
              </p>
            </div>

            {/* Position */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Position</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiBriefcase className="text-amber-500" />
                {data.position}
              </p>
            </div>

            {/* Phone Number */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Phone Number</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiPhone className="text-green-600" />
                {data.phoneNumber}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Company */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiBriefcase className="text-blue-500" />
                {data.companyName}
              </p>
            </div>

            {/* Industry */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Industry</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiLayers className="text-yellow-500" />
                {data.industry}
              </p>
            </div>

            {/* Address */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Company Address</p>
              <p className="font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
                <FiMapPin className="text-red-500" />
                {data.companyAddress}
              </p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-2">
            Account Status
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {/* Password Changed */}
            <div>
              <p className="text-gray-500">Password Changed</p>
              <p className="font-semibold flex items-center gap-2 capitalize">
                {data.passwordChanged ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertCircle className="text-red-600" />
                )}
                {data.passwordChanged ? "Yes" : "No"}
              </p>
            </div>

            {/* Details Submitted */}
            <div>
              <p className="text-gray-500">Details Submitted</p>
              <p className="font-semibold flex items-center gap-2 capitalize">
                {data.detailsSubmitted ? (
                  <FiCheckCircle className="text-green-600" />
                ) : (
                  <FiAlertCircle className="text-red-600" />
                )}
                {data.detailsSubmitted ? "Yes" : "No"}
              </p>
            </div>
          </div>
        </div>

        {/* Created Date */}
        <div className="mt-6 text-xs md:text-sm text-gray-500 flex items-center gap-2">
          <FiCalendar />
          Account Created: {new Date(data.createdAt).toLocaleString()}
        </div>
      </motion.div>
    </div>
  );
}

export default UserDetailsModal;
