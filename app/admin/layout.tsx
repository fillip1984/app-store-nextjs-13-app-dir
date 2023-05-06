"use client";

import Link from "next/link";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  const adminLocations = [
    {
      label: "Applications",
      href: "/admin/applications",
    },
    {
      label: "Categories",
      href: "/admin/categories",
    },
  ];

  return (
    <>
      <div className="flex text-primary justify-around text-xl bg-accent p-4">
        {adminLocations.map((adminLocation) => (
          <Link
            key={adminLocation.label}
            href={adminLocation.href}
            className={`${
              segment === adminLocation.href.replace("/admin/", "")
                ? "border-b-2 border-primary-content text-primary-content"
                : ""
            }`}>
            {adminLocation.label}
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </>
  );
}
