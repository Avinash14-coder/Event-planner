import React from "react";

const RoleSwitcher = ({ role, onRoleChange }) => {
  return (
    <div className="px-4 mb-6">
      <div className="flex bg-slate-200/50 dark:bg-surface-dark p-1.5 rounded-2xl">
        <button
          onClick={() => onRoleChange("customer")}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
            role === "customer"
              ? "bg-white dark:bg-background-dark text-primary shadow-lg shadow-black/5 scale-[1.02]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          For Customers
        </button>
        <button
          onClick={() => onRoleChange("vendor")}
          className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
            role === "vendor"
              ? "bg-white dark:bg-background-dark text-primary shadow-lg shadow-black/5 scale-[1.02]"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          For Vendors
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;
