"use client";

import { useSession } from "next-auth/react";
import React from "react";

const TestPage = () => {
  const session = useSession();

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page</p>
      <p>Session: {JSON.stringify(session)}</p>
    </div>
  );
};

export default TestPage;
