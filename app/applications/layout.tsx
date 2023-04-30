import React from "react";

const ApplicationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h4 className="bg-secondary py-2 px-4">Applications</h4>
      {children}
    </div>
  );
};

export default ApplicationLayout;
