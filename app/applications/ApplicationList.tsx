import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";

async function getApplications() {
  const applications = prisma.application.findMany();
  return applications;
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
