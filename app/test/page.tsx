import React from "react";

const IssueDetailLoadingPage = () => {
  return (
    <div className="flex-col space-y-5 max-w-lg">
      <h1 className="skeleton w-1/3 h-10"></h1>
      <div className="skeleton p-2 w-1/2 h-5"></div>
      <div className="card shadow-3xl p-5 bg-gray-50 skeleton h-20"></div>
    </div>
  );
};

export default IssueDetailLoadingPage;
