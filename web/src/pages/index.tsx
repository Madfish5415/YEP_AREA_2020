import React, {FC} from "react";
import Router from "next/router";

const IndexPage: FC = () => {
    Router.push("/workflows");

    return (
        <div/>
    );
};

export default IndexPage;
