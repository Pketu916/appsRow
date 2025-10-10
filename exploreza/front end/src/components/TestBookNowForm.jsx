import React, { useState } from "react";
import EnquiryForm from "./EnquiryForm";

const TestBookNowForm = () => {
  const [showForm, setShowForm] = useState(false);

  const testDeal = {
    id: 1,
    title: "Test Travel Package",
    country: "Test Country",
    duration: "5 Days",
    price: "$299.99",
    oldPrice: "$399.99",
  };

  const handleSubmit = (formData) => {
    setShowForm(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test Enquiry Form</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
      >
        Open Enquiry Form
      </button>

      <EnquiryForm
        deal={testDeal}
        onClose={() => setShowForm(false)}
        onSubmit={handleSubmit}
        isOpen={showForm}
      />
    </div>
  );
};

export default TestBookNowForm;
