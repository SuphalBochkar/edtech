"use client";

import React, { useState } from "react";

const Page = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/mail", {
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        console.log("Email sent successfully:", data.data);
      } else {
        console.error("Error sending email:", data.error);
      }
    } catch (error) {
      console.error("Failed to send email:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? "Sending..." : "Send Mail"}
      </button>
    </div>
  );
};

export default Page;
