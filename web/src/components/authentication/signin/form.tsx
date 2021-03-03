import {
    Backdrop,
    Box,
    Button,
    CircularProgress, createMuiTheme,
    Grid,
    makeStyles,
    TextField,
    ThemeProvider,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSignIn } from "../../../hooks";
import {gray, primary, secondary, white} from "@area-common/styles";
import {SignInSignUp} from "./buttons/signup";

const useStyle = makeStyles({
    container: {
        width: "35%",
        height: "50%",
    },
    alert: {
        margin: "1rem 0",
    },
    backdrop: {
        color: "#ffffff",
        zIndex: 100,
    },
    form: {
        margin: "1rem 0",
    },
});

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: primary.main,
            contrastText: white
        },
        secondary: {
            main: secondary.main,
        },
        grey: {
            50: gray.main,
            100: gray.light1,
            200: gray.light2,
            300: gray.light3,
            400: gray.light4,
            500: gray.light5,
        },
    },
});

export const SignInForm: React.FC = () => {
    const classes = useStyle();

    const { register, errors, handleSubmit } = useForm();
    const { signedIn, error, signIn } = useSignIn();
    const [loading, setLoading] = useState(false);

    const afterSubmit = (data: any) => {
        setLoading(true);

        signIn(data.username, data.password);
    };

    useEffect(() => {
        if (loading && (signedIn || error)) {
            setLoading(false);
        }
    }, [signedIn, error]);

    if (signedIn) {
        Router.push("/").catch((err) => console.error(err));
    }

    return (
        <Box className={classes.container}>
            <ThemeProvider theme={theme}>
                <Backdrop open={loading} className={classes.backdrop}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                {error ? (
                    <Alert severity="error" className={classes.alert}>
                        {error}
                    </Alert>
                ) : null}
                {signedIn ? (
                    <Alert severity="success" className={classes.alert}>
                        Success, redirecting...
                    </Alert>
                ) : null}
                <form
                    noValidate
                    className={classes.form}
                    onSubmit={handleSubmit(afterSubmit)}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Username"
                                id="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({ required: true })}
                                error={!!errors.username}
                                helperText={
                                    errors.username &&
                                    "A valid username is required"
                                }
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Password"
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="password"
                                variant="outlined"
                                fullWidth
                                inputRef={register({ required: true })}
                                error={!!errors.password}
                                helperText={
                                    errors.password &&
                                    "A valid password is required"
                                }
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Sign In
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <SignInSignUp/>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Box>
    );
};
