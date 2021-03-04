import React, {FC} from "react";
import {Box, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {gray, primary} from "@area-common/styles";
import {VerifyForm} from "../../components/authentication/verify/form";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: gray.main,
            width: "100%",
            height: "100%"
        },
        formContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "100%"
        },
        title: {
            color: primary.main,
            fontSize: 96,
            font: "roboto",
            fontWeight: "bold"
        }
    })
);

const VerifyPage: FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box className={classes.formContainer}>
                <Typography className={classes.title}>
                    AREA 51
                </Typography>
                <VerifyForm/>
            </Box>
        </Box>
    );
};

export default VerifyPage;