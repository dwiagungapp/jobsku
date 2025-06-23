import React from "react";
import { FiBriefcase } from "react-icons/fi";

export default function StatCard({
  icon: Icon = FiBriefcase,
  label,
  value,
  color = "indigo",
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center space-x-4">
      <div className={`p-3 bg-${color}-100 text-${color}-600 rounded-full`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-semibold text-gray-700">{value}</p>
      </div>
    </div>
  );
}
