import { prisma } from "@/prisma/globalPrismaClient";
import { Application } from "@prisma/client";
import ApplicationCard from "./ApplicationCard";

async function getApplications() {
  const applications = prisma.application.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return applications;
}

const ApplicationList = async () => {
  const applications: Application[] = await getApplications();

  return (
    <div className="flex flex-col gap-2 mt-2 mb-24">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;
