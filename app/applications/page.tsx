import React from "react";
import SearchAdd from "./SearchAdd";
import ApplicationList from "./ApplicationList";

const ApplicationHome = () => {
  return (
    <div className="container p-4 mx-auto">
      <SearchAdd />
      {/* TODO: see:https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components */}
      {/* @ts-expect-error Async Server Component */}
      <ApplicationList />
    </div>
  );
};

export default ApplicationHome;
