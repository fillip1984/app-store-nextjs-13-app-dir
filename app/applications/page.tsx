import ApplicationList from "./(components)/ApplicationList";
import SearchAdd from "./(components)/SearchAdd";

export default function ApplicationHomePage() {
  return (
    <div className="container p-4 mx-auto">
      <h4>Applications</h4>
      <SearchAdd />
      {/* TODO: see:https://beta.nextjs.org/docs/data-fetching/fetching#asyncawait-in-server-components */}
      {/* @ts-expect-error Async Server Component */}
      <ApplicationList />
    </div>
  );
}
