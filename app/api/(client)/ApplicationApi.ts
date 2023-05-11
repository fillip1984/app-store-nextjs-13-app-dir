import { Application } from "@prisma/client";
import { log } from "console";

//crrud
//create
export async function createApplication(application: Partial<Application>) {
  const result = await fetch("/api/applications", {
    method: "POST",
    body: JSON.stringify(application),
  });
  return (await result.json()) as Application;
}

//read all
export async function getApplications(): Promise<
  Application & {
    category: {
      name: string;
    };
  }
> {
  const result = await fetch("/api/applications");
  return await result.json();
}

//read one
export async function getApplication(id: string) {
  const result = await fetch(`/api/applications/${id}`);
  return await result.json();
}

//update
export async function updateApplication(application: Application) {
  const result = await fetch(`/api/applications/${application.id}`, {
    method: "PUT",
    body: JSON.stringify(application),
  });
  return (await result.json()) as Application;
}

//delete
export async function deleteApplication(id: string) {
  const result = await fetch(`/api/applications/${id}`, {
    method: "DELETE",
  });
  return (await result.json()) as boolean;
}

/////specialized
export async function loadApplicationsFromGitHub() {
  const result = await fetch("/api/github");
  return await result.json();
}

export async function deleteAllApplications() {
  const result = await fetch("/api/applications", {
    method: "DELETE",
  });
  const count = await result.json();
}
