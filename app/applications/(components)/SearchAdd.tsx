"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { createApplication } from "../../api/(client)/ApplicationApi";
import { BsFunnel } from "react-icons/bs";
import { Category, Status } from "@prisma/client";
import { getCategories } from "@/app/api/(client)/CategoryApi";

export default function SearchAdd() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");

  const [categories, setCategories] = useState<Category[] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<Category | "All">("All");

  useEffect(() => {
    async function fetchCategories() {
      const cats = await getCategories();
      setCategories(cats);
    }
    fetchCategories();
  }, []);

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
          className={`btn btn-primary text-primary-content ${
            isMutating ? "loading" : ""
          }`}
          disabled={isPending}>
          Add
        </button>
        <button
          className="btn btn-accent text-2xl"
          onClick={() => setShowFilters((prev) => !prev)}>
          <BsFunnel />
        </button>
      </div>
      {showFilters && (
        <div>
          <div className="flex items-center gap-2 my-2">
            <h5>Status</h5>
            <div className="btn-group">
              <input
                type="radio"
                name="options"
                data-title="All"
                className="btn"
                checked={statusFilter === "All"}
                onChange={() => setStatusFilter("All")}
              />
              <input
                type="radio"
                name="options"
                data-title={Status.BACKLOG}
                className="btn"
                checked={statusFilter === "BACKLOG"}
                onChange={() => setStatusFilter("BACKLOG")}
              />
              <input
                type="radio"
                name="options"
                data-title={Status.IN_PROGRESS}
                className="btn"
                checked={statusFilter === "IN_PROGRESS"}
                onChange={() => setStatusFilter("IN_PROGRESS")}
              />
              <input
                type="radio"
                name="options"
                data-title={Status.COMPLETE}
                className="btn"
                checked={statusFilter === "COMPLETE"}
                onChange={() => setStatusFilter("COMPLETE")}
              />
              <input
                type="radio"
                name="options"
                data-title={Status.ABANDONED}
                className="btn"
                checked={statusFilter === "ABANDONED"}
                onChange={() => setStatusFilter("ABANDONED")}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 my-2">
            <h5>Category</h5>
            <div className="btn-group">
              <input
                type="radio"
                name="categoryOptions"
                data-title="All"
                className="btn"
                checked={categoryFilter === "All"}
                onChange={() => setCategoryFilter("All")}
              />
              {categories?.map((caegory) => (
                <input
                  key={caegory.id}
                  type="radio"
                  name="categoryOptions"
                  data-title={caegory.name}
                  className="btn"
                  checked={categoryFilter === caegory}
                  onChange={() => setCategoryFilter(caegory)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
