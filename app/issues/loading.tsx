import React from "react";
import IssuesAction from "./IssuesAction";

const issues = [1, 2, 3, 4, 5];

const IssueLoadingPage = () => {
  return (
    <div className="flex-col space-y-5">
      <IssuesAction />
      <div className="overflow-x-auto rounded-2xl">
        <table className="table table-auto ">
          <thead className="text-lg bg-gray-200">
            <tr>
              <td className="w-1/3">Issue</td>
              <td className="w-1/3 hidden md:table-cell">Status</td>
              <td className="w-1/3 hidden md:table-cell">Created On</td>
            </tr>
          </thead>
          <tbody className="bg-gray-50">
            {issues.map((issue) => (
              <tr key={issue}>
                <td>
                  <div className="skeleton h-5 w-auto"></div>

                  {
                    <span className="text-sm md:hidden">
                      <br />
                    </span>
                  }
                </td>
                <td className="hidden md:table-cell">
                  <div className="skeleton h-5 w-auto"></div>
                </td>
                <td className="hidden md:table-cell">
                  <div className="skeleton h-5 w-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueLoadingPage;
