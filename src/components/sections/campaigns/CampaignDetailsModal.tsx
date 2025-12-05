import { motion } from "framer-motion";
import {
  FiX,
  FiCalendar,
  FiUser,
  FiBriefcase,
  FiInfo,
  FiLayers,
  FiDollarSign,
} from "react-icons/fi";

function CampaignDetailsModal({ open, onClose, data }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="
          bg-white dark:bg-gray-900 shadow-2xl rounded-2xl p-6 w-[90%] 
          lg:w-[60%] max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700
        "
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <FiLayers className="text-indigo-500" />
            Campaign Details
          </h1>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <FiX className="text-xl text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        {/* Campaign Name */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <FiInfo className="text-blue-500" />
            {data.campaignName}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {data.campaignDescription}
          </p>
        </div>

        {/* Grid Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Type */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Campaign Type</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FiBriefcase className="text-amber-500" />
                {data.campaignType?.replace(/_/g, " ")}
              </p>
            </div>

            {/* Primary Goal */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Primary Goal</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                🎯 {data.primaryGoal?.replace(/_/g, " ")}
              </p>
            </div>

            {/* Budget */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Budget</p>
              <p className="font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                <FiDollarSign className="text-green-600" />₦
                {Number(data.totalBudget).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Dates */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Campaign Duration</p>
              <p className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <FiCalendar className="text-purple-500" />
                {new Date(data.startDate).toLocaleDateString()} —{" "}
                {new Date(data.endDate).toLocaleDateString()}
              </p>
            </div>

            {/* Created By */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Created By</p>
              <p className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                <FiUser className="text-teal-500" />
                {data.userEmail}
              </p>
            </div>

            {/* Company */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
              <p className="text-sm text-gray-500">Company</p>
              <p className="font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-200">
                🏢 {data.companyName} — {data.industry}
              </p>
            </div>
          </div>
        </div>

        {/* Status Section */}
        <div className="mt-8 p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl border border-indigo-200 dark:border-indigo-700">
          <h3 className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-2 mb-2">
            📌 Status Overview
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Campaign Status</p>
              <p className="font-semibold capitalize">{data.status}</p>
            </div>

            <div>
              <p className="text-gray-500">Admin Approval</p>
              <p className="font-semibold capitalize">
                {data.adminApprovalStatus}
              </p>
            </div>

            <div>
              <p className="text-gray-500">User Approval</p>
              <p className="font-semibold capitalize">
                {data.userApprovalStatus?.replace(/_/g, " ")}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CampaignDetailsModal;
