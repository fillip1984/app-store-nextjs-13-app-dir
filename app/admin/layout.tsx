"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const segment = useSelectedLayoutSegment();

  const adminLocations = [
    {
      label: "Categories",
      href: "/admin/categories",
    },
    {
      label: "Applications",
      href: "/admin/applications",
    },
  ];

  return (
    <>
      <div className="flex gap-2 p-4">
        {adminLocations.map((adminLocation) => (
          <Link
            key={adminLocation.label}
            href={adminLocation.href}
            className={`${
              "/admin/" + segment === adminLocation.href
                ? "underline text-primary-content"
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
