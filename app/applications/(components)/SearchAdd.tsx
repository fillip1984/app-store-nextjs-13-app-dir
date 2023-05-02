"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { createApplication } from "../../api/(client)/ApplicationApi";

const SearchAdd = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const [search, setSearch] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
      setIsFetching(true);
      const response = await createApplication({ name: search });
      setSearch("");
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
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isMutating ? "opacity-0" : ""}`}>
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Search or add an application..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-md input-primary input-bordered w-full"
          disabled={isPending}
        />
        {/* <label className="label">
          <span className="label-text-alt">Bottom Left label</span>
          <span className="label-text-alt">Bottom Right label</span>
        </label> */}
        <button
          type="submit"
          className={`btn btn-primary text-primary-content ${isMutating} ? 'loading':''`}
          disabled={isPending}>
          Add
        </button>
      </div>
    </form>
  );
};

export default SearchAdd;
