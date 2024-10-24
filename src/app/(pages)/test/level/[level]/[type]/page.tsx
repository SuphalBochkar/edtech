import React from "react";

const page = ({ params }: { params: object }) => {
  return (
    <div className="text-background">
      This is level\[level]\[type] page.tsx
      <div>{JSON.stringify(params)}</div>
    </div>
  );
};

export default page;
