import { createCategory, deleteAllCategories, getCategories } from "@/actions";
import { prisma } from "@/prisma/globalPrismaClient";
import { revalidatePath } from "next/cache";
import { MdAddCircleOutline } from "react-icons/md";

export default async function AdminCategoriesPage() {
  const handleLoad = async () => {
    "use server";
    const sampleCategories = [
      {
        name: "Finance",
        description:
          "Applications which deal with financial information. Budgeting, forecasting/modelling, etc...",
      },
      {
        name: "Knowledge",
        description:
          "Applications which deal with information. Collecting, sifting, sorting, currating information",
      },
      {
        name: "Productivity",
        description:
          "Applications which deal with increasing your productivity (a.k.a output)",
      },
      {
        name: "Uncategorized",
        description: "Application has not yet been categorized",
      },
    ];

    sampleCategories.forEach(async (sampleCategory) => {
      const loadedCategories = await createCategory(sampleCategory);
    });
    // const f = await prisma.category.create({ data: sampleCategories[0] });
    revalidatePath("/admin/categories");
  };

  const handleDelete = async () => {
    "use server";
    deleteAllCategories();
    revalidatePath("/admin/categories");
  };

  const categories = await getCategories();

  return (
    // container p-4 mx-auto
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="my-4 flex flex-col gap-4">
        <h4>Load/Delete categories</h4>
        <form action={handleLoad}>
          <button
            type="submit"
            className="btn btn-primary w-full"
            // className={`btn btn-primary ${isLoadingFromGithub ? "loading" : ""}`}
            // disabled={isMutating}>
          >
            Load examples
          </button>
        </form>
        <form action={handleDelete}>
          <button
            type="submit"
            className="btn btn-danger w-full"
            // className={`btn btn-danger ${isDeleting ? "loading" : ""}`}
            // disabled={isMutating}>
          >
            Delete all
          </button>
        </form>
      </div>

      <div className="flex justify-between items-center">
        <h4>Categories</h4>
        <button className="btn btn-primary text-primary-content">
          <MdAddCircleOutline size={48} />
        </button>
      </div>
      {categories.map((category) => (
        <div
          key={category.name}
          className="card w-full bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">{category.name}</h2>
            <p>{category.description}</p>
            <div className="card-actions justify-end">
              <button className="btn">Show Apps</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
