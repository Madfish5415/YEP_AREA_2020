import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";

const PartiesPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.query.id) return;

    (async () => {
      const { id, ...queries } = router.query;
      const formattedQueries = Object.entries(queries)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");
      const url = `http://localhost:8080/api/authentication/parties/${id}/callback?${formattedQueries}`;

      const response = await fetch(url, {
        method: "GET",
      });

      const json = await response.json();

      localStorage.setItem("jwt", json.data.token);

      window.opener.success();

      window.close();
    })();
  });

  return null;
};

export default PartiesPage;
