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
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mt-8 mb-24">
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  );
};

export default ApplicationList;
