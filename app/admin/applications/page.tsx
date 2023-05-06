"use client";

import {
  deleteAllApplications,
  loadApplicationsFromGitHub,
} from "@/app/api/(client)/ApplicationApi";

export default function AdminApplicationPage() {
  return (
    <div className="flex flex-col p-4 gap-4">
      <button
        onClick={() => loadApplicationsFromGitHub()}
        className="btn btn-primary">
        Load all
      </button>
      <button
        onClick={() => deleteAllApplications()}
        className="btn btn-danger">
        Delete all
      </button>
    </div>
  );
}
