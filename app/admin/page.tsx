import { MdAddCircleOutline } from "react-icons/md";

const AdminPage = () => {
  const categories = [
    {
      label: "Finance",
      description:
        "Applications which deal with financial information. Budgeting, forecasting/modelling, etc...",
    },
    {
      label: "Knowledge",
      description:
        "Applications which deal with information. Collecting, sifting, sorting, currating information",
    },
    {
      label: "Productivity",
      description:
        "Applications which deal with increasing your productivity (a.k.a output)",
    },
    {
      label: "Uncategorized",
      description: "Application has not yet been categorized",
    },
  ];
  return (
    // container p-4 mx-auto
    <div className="container mx-auto p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4>Categories</h4>
        <button className="btn btn-primary text-primary-content">
          <MdAddCircleOutline size={48} />
        </button>
      </div>
      {categories.map((category) => (
        <div
          key={category.label}
          className="card w-full bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">{category.label}</h2>
            <p>{category.description}</p>
            <div className="card-actions justify-end">
              <button className="btn">Show Apps</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
