import React from "react";

interface ConfirmationEmailProps {
  name: string;
}

export const BuyCourseEmailTemplate: React.FC<
  Readonly<ConfirmationEmailProps>
> = ({ name = "Learner" }) => (
  <div
    style={{
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#ffffff",
      color: "#333333",
    }}
  >
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h1
        style={{
          fontSize: "28px",
          color: "#6b46c1",
          marginBottom: "10px",
        }}
      >
        Your Learning Journey Begins!
      </h1>
      <div
        style={{
          height: "2px",
          width: "60px",
          margin: "0 auto",
          backgroundColor: "#6b46c1",
        }}
      ></div>
    </div>

    <div
      style={{
        backgroundColor: "#f3f4f6",
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "30px",
      }}
    >
      <p
        style={{
          fontSize: "18px",
          marginBottom: "15px",
          textAlign: "center",
          color: "#4b5563",
        }}
      >
        Your payment has been successful
      </p>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "15px",
          color: "#1f2937",
        }}
      >
        Thank you, <span style={{ color: "#6b46c1" }}>{name}</span>!
      </h2>
      <p
        style={{
          fontSize: "16px",
          textAlign: "center",
          color: "#4b5563",
        }}
      >
        We welcome you to our course.
        <br />
        Happy learning!
      </p>
    </div>

    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontSize: "16px",
          marginBottom: "20px",
          color: "#4b5563",
        }}
      >
        Thank you for purchasing our course
      </p>
      <a
        href="#"
        style={{
          display: "inline-block",
          padding: "12px 24px",
          backgroundColor: "#6b46c1",
          color: "#ffffff",
          fontWeight: "bold",
          textDecoration: "none",
          borderRadius: "6px",
        }}
      >
        Start Learning Now
      </a>
    </div>

    <div
      style={{
        marginTop: "40px",
        textAlign: "center",
        fontSize: "14px",
        color: "#6b7280",
      }}
    >
      <p>
        If you have any questions, please don{"'"}t hesitate to contact our
        support team.
      </p>
      <p style={{ marginTop: "10px" }}>© 2025 Edtech. All rights reserved.</p>
    </div>
  </div>
);

export default BuyCourseEmailTemplate;
