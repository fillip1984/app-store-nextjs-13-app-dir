"use client";

import { FormEvent, useState } from "react";

const SearchAdd = () => {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (search.length > 0) {
      console.log("adding", search);
      setSearch("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-1">
        <input
          type="text"
          placeholder="Search or add an application..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-md input-primary input-bordered w-full"
        />
        {/* <label className="label">
          <span className="label-text-alt">Bottom Left label</span>
          <span className="label-text-alt">Bottom Right label</span>
        </label> */}
        <button type="submit" className="btn btn-md btn-primary btn-outline">
          Add
        </button>
      </div>
    </form>
  );
};

export default SearchAdd;
