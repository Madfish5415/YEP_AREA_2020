import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";

const ServicesPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    (async () => {
      const { id, ...queries } = router.query;
      const formattedQueries = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const url = `http://localhost:8080/api/authentication/services/${id}/callback?${formattedQueries}`;

      await fetch(url, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("jwt")!,
        },
      });

      window.opener.success();

      window.close();
    })();
  });

  return null;
};

export default ServicesPage;
