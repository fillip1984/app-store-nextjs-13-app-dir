"use client";

import {
  deleteAllApplications,
  loadApplicationsFromGitHub,
} from "@/app/api/(client)/ApplicationApi";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function AdminApplicationPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isLoadingFromGithub, setLoadingFromGithub] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  // const [isFetching, setIsFetching] = useState(false);
  const isMutating = isLoadingFromGithub || isDeleting;

  const handleLoad = async () => {
    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setLoadingFromGithub(true);
    const response = await loadApplicationsFromGitHub();
    setLoadingFromGithub(false);

    startTransition(() => {
      router.refresh();
    });
  };
  const handleDelete = async () => {
    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setDeleting(true);
    const response = await deleteAllApplications();
    setDeleting(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <button
        onClick={handleLoad}
        className={`btn btn-primary ${isLoadingFromGithub ? "loading" : ""}`}
        disabled={isMutating}>
        Load from Github
      </button>
      <button
        onClick={handleDelete}
        className={`btn btn-danger ${isDeleting ? "loading" : ""}`}
        disabled={isMutating}>
        Delete all
      </button>
    </div>
  );
}
