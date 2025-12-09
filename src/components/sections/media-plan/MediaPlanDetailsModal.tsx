"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaBullseye,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaUser,
  FaFlagCheckered,
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

function MediaPlanDetailsModal({ open, onClose, data }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl md:max-w-3xl 
                   lg:w-[60%] w-[90%] max-h-[90vh] overflow-y-auto no-scrollbar"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <FaBullseye className="text-primary" />
            Media Plan Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 transition"
          >
            <FaTimes size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h3 className="sm:text-xl font-semibold">Plan Title</h3>
            <p className="text-sm sm:text-base text-gray-700">{data.title}</p>
          </div>

          {/* Executive Summary */}
          <div>
            <h3 className="sm:text-xl font-semibold">Executive Summary</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {data.executiveSummary}
            </p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaFlagCheckered className="text-blue-600" /> Campaign Name
              </h4>
              <p className="text-gray-700">{data.campaignName}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaBullseye className="text-red-600" /> Campaign Type
              </h4>
              <p className="capitalize text-gray-700">
                {data.campaignType.replace("_", " ")}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaMoneyBillWave className="text-green-600" /> Budget
              </h4>
              <p className="text-gray-700">
                ₦{Number(data.budget).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaUser className="text-purple-600" /> User Email
              </h4>
              <p className="text-gray-700">{data.userEmail}</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-orange-600" /> Created At
              </h4>
              <p className="text-gray-700">
                {new Date(data.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                <FaCalendarAlt className="text-teal-600" /> Updated At
              </h4>
              <p className="text-gray-700">
                {new Date(data.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* STATUS */}
          <div className="pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Admin Approval</h4>
            <div className="flex items-center gap-3">
              {data.adminApprovalStatus === "pending" && (
                <>
                  <FaTimesCircle className="text-yellow-500" size={20} />
                  <span className="text-gray-700">Pending Approval</span>
                </>
              )}

              {data.adminApprovalStatus === "approved" && (
                <>
                  <FaCheckCircle className="text-green-600" size={20} />
                  <span className="text-gray-700">Approved</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-tr from-purple-950 via-fuchsia-900 to-purple-800 text-white rounded-lg hover:bg-black transition"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default MediaPlanDetailsModal;
