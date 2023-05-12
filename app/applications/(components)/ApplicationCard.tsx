"use client";

import { deleteApplication } from "@/app/api/(client)/ApplicationApi";
import { Application } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { BiCategory, BiInfinite } from "react-icons/bi";
import { BsTextLeft } from "react-icons/bs";

interface ApplicationCardProps {
  application: Application & {
    category: {
      name: string;
    };
  };
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
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
        <h3>{application.name}</h3>
        <p className="flex items-center gap-2">
          <BiInfinite className="text-xl" />
          {application.status}
        </p>
        <p className="flex items-center gap-2">
          <BiCategory className="text-xl" />
          {application.category?.name}
        </p>
        <p className="flex items-start gap-2">
          <BsTextLeft className="text-xl flex-shrink-0" />
          {application.description}
        </p>
        {/* <div className="card-actions justify-end">
          <button
            onClick={handleDelete}
            className={`btn btn-danger ${isMutating ? "loading" : ""}`}
            disabled={isPending}>
            Delete
          </button>
        </div> */}
      </div>
    </Link>
  );
}
