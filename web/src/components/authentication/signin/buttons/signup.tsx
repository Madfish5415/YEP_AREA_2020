import {Box, makeStyles, Typography} from "@material-ui/core";
import Link from "next/link";
import React from "react";
import {primary, white} from "@area-common/styles";

const useStyle = makeStyles({
    text: {
        color: white,
        padding: "5px",
        font: "roboto",
    },
    clickableText: {
        color: primary.main,
        padding: "5px",
        font: "roboto",
        textDecorationLine: "underline"
    }
});

export const SignInSignUp: React.FC = () => {
    const classes = useStyle();

    return (
        <Box display={"flex"} flexDirection={"row"} alignContent={"center"} justifyContent={"center"}>
            <Typography className={classes.text}>
                First time?
            </Typography>
            <Link href={"/authentication/signup"}>
                <Typography className={classes.clickableText}>
                    Sign Up
                </Typography>
            </Link>
        </Box>

    );
};