import { Application } from "@prisma/client";

async function getApplications() {
  const response = await fetch("/api/applications");
  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
}

const ApplicationList = async () => {
  const applications: Application[] = await getApplications();

  return (
    <div>
      <h3>test</h3>
      {applications.map((application) => (
        <div key={application.id}>{application.name}</div>
      ))}
    </div>
  );
};

export default ApplicationList;
