import { Application } from "@prisma/client";

//crrud
//create
export const createApplication = async (application: Partial<Application>) => {
  const result = await fetch("/api/applications", {
    method: "POST",
    body: JSON.stringify(application),
  });
  return await result.json();
};

//read all
export const getApplications = async () => {
  const result = await fetch("/api/applications");
  return await result.json();
};

//read one
export const getApplication = async (id: number) => {
  const result = await fetch(`/api/applications/${id}`);
  return await result.json();
};

//update
export const updateApplication = async (application: Application) => {
  const result = await fetch(`/api/applications/${application.id}`, {
    method: "PUT",
    body: JSON.stringify(application),
  });
  return await result.json();
};

//delete
export const deleteApplication = async (id: number) => {
  const result = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
  return await result.json();
};
