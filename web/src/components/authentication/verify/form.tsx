import {
    Backdrop,
    Box,
    Button,
    CircularProgress, createMuiTheme,
    Grid,
    makeStyles,
    TextField, ThemeProvider,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useVerify} from "../../../hooks";
import {gray, primary, secondary} from "@area-common/styles";

const useStyle = makeStyles({
    container: {
        width: "35%",
        height: "40%",
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

export const VerifyForm: React.FC = () => {
    const classes = useStyle();
    const router = useRouter();
    const {register, errors, handleSubmit} = useForm();
    const {loading, verified, error, verify} = useVerify();

    const [username, setUsername] = useState<string>("");
    const [id, setID] = useState<string>("");

    useEffect(() => {
        const url = new URL(window.location.href);

        setUsername(url.searchParams.get("username") || "");
        setID(url.searchParams.get("id") || "");
    }, []);

    if (verified) {
        router.push("/").catch((err) => console.error(err));
    }

    const afterSubmit = async (data: any) => {
        await verify(data.username, data.id);
    };

    return (
        <Box className={classes.container}>
            <ThemeProvider theme={theme}>
                <Backdrop open={loading} className={classes.backdrop}>
                    <CircularProgress color="inherit"/>
                </Backdrop>
                {error ? (
                    <Alert severity="error" className={classes.alert}>
                        {error}
                    </Alert>
                ) : null}
                {verified ? (
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                inputRef={register({required: true})}
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
                                label="ID"
                                name="id"
                                id="id"
                                autoComplete="id"
                                variant="outlined"
                                fullWidth
                                value={id}
                                onChange={(e) => setID(e.target.value)}
                                inputRef={register({required: true})}
                                error={!!errors.id}
                                helperText={errors.id && "A valid ID is required"}
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                color="primary"
                            >
                                Verify
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Box>
    );
};
