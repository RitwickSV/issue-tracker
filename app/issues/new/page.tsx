import React from "react";
import dynamic from "next/dynamic";
import delay from "delay";
import IssueFormSkeleton from "../_components/IssueFormSkeleton";

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const AddNewIssuePage = () => {
  return <IssueForm />;
};

export default AddNewIssuePage;
