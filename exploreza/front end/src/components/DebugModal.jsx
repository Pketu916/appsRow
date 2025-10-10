import React from "react";

const DebugModal = ({ showBookNowForm, selectedDeal }) => {
  if (!showBookNowForm) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded z-50">
      <h3 className="font-bold">Debug Info:</h3>
      <p>showBookNowForm: {showBookNowForm.toString()}</p>
      <p>selectedDeal: {selectedDeal ? selectedDeal.title : "null"}</p>
    </div>
  );
};

export default DebugModal;
