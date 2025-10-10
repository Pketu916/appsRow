import React from "react";

const FormSection = ({ title, children, className = "" }) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default FormSection;
