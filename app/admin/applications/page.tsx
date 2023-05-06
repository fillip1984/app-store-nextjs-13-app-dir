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
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const handleLoad = async () => {
    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setIsFetching(true);
    const response = await loadApplicationsFromGitHub();
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };
  const handleDelete = async () => {
    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setIsFetching(true);
    const response = await deleteAllApplications();
    setIsFetching(false);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col p-4 gap-4">
      <button
        onClick={handleLoad}
        className={`btn btn-primary ${isMutating ? "loading" : ""}`}
        disabled={isPending}>
        Load all
      </button>
      <button
        onClick={handleDelete}
        className={`btn btn-danger ${isMutating ? "loading" : ""}`}
        disabled={isPending}>
        Delete all
      </button>
    </div>
  );
}
