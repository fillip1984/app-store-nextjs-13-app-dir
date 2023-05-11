"use client";

import {
  getApplication,
  updateApplication,
} from "@/app/api/(client)/ApplicationApi";
import { getCategories } from "@/app/api/(client)/CategoryApi";
import { Application, Category } from "@prisma/client";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PageContextProps {
  params: {
    id: string;
  };
}

export default function ApplicationDetailPage(context: PageContextProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const id = context.params.id;

  useEffect(() => {
    const initializeState = async () => {
      setLoading(true);
      const application = await getApplication(id);
      setApplication(application);

      const categories = await getCategories();
      setCategories(categories);

      setLoading(false);
    };

    initializeState();
  }, [id]);

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Application>();
  const onSubmit: SubmitHandler<Application> = async (formData) => {
    // TODO: update as mutation RFC gets released: https://beta.nextjs.org/docs/data-fetching/mutating
    setIsFetching(true);
    const response = await updateApplication({ ...formData, id });
    setIsFetching(false);

    startTransition(() => {
      // Refresh the current route:
      // - Makes a new request to the server for the route
      // - Re-fetches data requests and re-renders Server Components
      // - Sends the updated React Server Component payload to the client
      // - The client merges the payload without losing unaffected
      //   client-side React state or browser state
      router.refresh();
      router.push("/applications");

      // Note: If fetch requests are cached, the updated data will
      // produce the same result.});
    });
  };

  return (
    <>
      {isLoading && <div></div>}

      {!isLoading && (
        <form onSubmit={handleSubmit(onSubmit)} className="p-4">
          <div className="form-control w-full">
            <label className="label">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "Field is required",
                minLength: {
                  value: 4,
                  message: "Field must be 4 or more characters",
                },
              })}
              defaultValue={application?.name}
              className="input input-bordered"
            />
            {errors.name && (
              <span className="label-text-alt text-red-400">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">Description</label>
            <textarea
              className="textarea textarea-bordered"
              {...register("description", {
                required: "Field is required",
                minLength: {
                  value: 20,
                  message: "Field must be 20 or more characters",
                },
              })}
              defaultValue={application?.description || ""}
            />
            {errors.description && (
              <span className="label-text-alt text-red-400">
                {errors.description.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Repository</span>
              <span className="label-text-alt">Optional</span>
            </label>
            <input
              placeholder="Code repository url, example: https://github.com/fillip1984/app-store-nextjs-13-app-dir"
              {...register("repositoryUrl")}
              defaultValue={application?.repositoryUrl || ""}
              className="textarea textarea-bordered"
            />
            {errors.repositoryUrl && (
              <span className="label-text-alt text-red-400">
                {errors.repositoryUrl.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered"
              {...register("status", { required: "Field is required" })}
              defaultValue={application?.status}>
              <option value=""></option>
              <option value="BACKLOG">Backlog</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETE">Complete</option>
              <option value="ABANDONED">Abandoned</option>
            </select>
            {errors.status && (
              <span className="label-text-alt text-red-400">
                {errors.status.message}
              </span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered"
              {...register("categoryId", { required: "Field is required" })}
              defaultValue={application?.categoryId}>
              <option value=""></option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <span className="label-text-alt text-red-400">
                {errors.categoryId.message}
              </span>
            )}
          </div>

          <div className="flex gap-2 mt-8">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <Link href="/applications" className="btn btn-outline">
              Cancel
            </Link>
          </div>
        </form>
      )}
    </>
  );
}
