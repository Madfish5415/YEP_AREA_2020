import React, {FC, useEffect} from "react";
import { useRouter } from "next/router";

const IndexPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/workflows").then();
  }, [router]);

  return (
    <div/>
  );
};

export default IndexPage;
