const IssueFormSkeleton = () => {
  return (
    <>
      <div className="flex-col space-y-5 max-w-lg">
        <div className="skeleton w-full h-10"></div>
        <div className="skeleton w-full h-96"></div>
      </div>
    </>
  );
};

export default IssueFormSkeleton;
