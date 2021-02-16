import { Button } from "@material-ui/core";
import Link from "next/link";
import React from "react";

export const SignUpSignIn: React.FC = () => {
    return (
        <Link href={"/authentication/signin"}>
            <Button color="default" fullWidth>
                Already signed up?
            </Button>
        </Link>
    );
};
