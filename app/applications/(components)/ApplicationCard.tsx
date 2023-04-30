"use client";

import { deleteApplication } from "@/app/api/(client)/ApplicationApi";
import { Application } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";

interface ApplicationCardProps {
  application: Application;
}

const ApplicationCard = ({ application }: ApplicationCardProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setIsFetching(true);
    const response = await deleteApplication(application.id);
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.});
    });
  };
  return (
    <Link
      href={`/applications/${application.id}`}
      className="card bg-base-300 shadow-xl">
      <div className="card-body">
        <h4 className="card-title">{application.name}</h4>
        <p>{application.description}</p>
        <div className="card-actions justify-end">
          <button
            onClick={handleDelete}
            className={`btn btn-danger ${isMutating ? "loading" : ""}`}
            disabled={isPending}>
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ApplicationCard;
