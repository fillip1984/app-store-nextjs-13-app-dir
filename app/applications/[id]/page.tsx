"use client";

import { getApplication } from "@/app/api/(client)/ApplicationApi";
import { Application } from "@prisma/client";
import { useEffect, useState } from "react";

interface PageContextProps {
  params: {
    id: string;
  };
}

export default function ApplicationDetailPage(context: PageContextProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [isLoading, setLoading] = useState(true);
  const id = context.params.id;

  useEffect(() => {
    console.log("fetching data");
    setLoading(true);
    getApplication(id)
      .then((res) => res.json())
      .then((data) => {
        setApplication(data);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //   const fetchData = async () => {
  //     const app = await getApplication(id);
  //     console.log(app);
  //     setApplication(app);
  //     setLoading(false);
  //   };

  return (
    <>
      {isLoading && <div></div>}

      {!isLoading && (
        <div>
          <h2>{application?.name}</h2>
        </div>
      )}
    </>
  );
}
