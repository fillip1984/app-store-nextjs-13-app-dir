import { Application } from "@prisma/client";

//crrud
//create
export const createApplication = async (application: Partial<Application>) => {
  const result = await fetch("/api/applications", {
    method: "POST",
    body: JSON.stringify(application),
  });
  return (await result.json()) as Application;
};

//read all
export const getApplications = async () => {
  const result = await fetch("/api/applications");
  return (await result.json()) as Application[];
};

//read one
export async function getApplication(id: string) {
  const result = await fetch(`/api/applications/${id}`);
  return result;
}

//update
export const updateApplication = async (application: Application) => {
  const result = await fetch(`/api/applications/${application.id}`, {
    method: "PUT",
    body: JSON.stringify(application),
  });
  return (await result.json()) as Application;
};

//delete
export const deleteApplication = async (id: string) => {
  console.log("id", id);
  const result = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
  return (await result.json()) as boolean;
};
