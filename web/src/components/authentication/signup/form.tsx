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
import {Alert} from "@material-ui/lab";
import React from "react";
import {useForm} from "react-hook-form";
import {emailRegex} from "../../../constants/regexs";
import {useSignUp} from "../../../hooks";
import {gray, primary, secondary, white} from "@area-common/styles";
import {SignUpSignIn} from "./buttons/signin";

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

export const SignUpForm: React.FC = () => {
    const classes = useStyle();
    const {register, errors, handleSubmit} = useForm();
    const {loading, signedUp, error, signUp} = useSignUp();

    const afterSubmit = async (data: any) => {
        await signUp(
            data.username,
            data.password,
            data.confirmPassword,
            data.email,
            data.firstName,
            data.lastName
        );
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
                {signedUp ? (
                    <Alert severity="success" className={classes.alert}>
                        Success, you can now sign in with your new account.
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
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="First Name"
                                id="firstName"
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({required: false})}
                                error={!!errors.firstName}
                                helperText={
                                    errors.firstName &&
                                    "A valid first name is required"
                                }
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Last Name"
                                id="lastName"
                                name="lastName"
                                autoComplete="lastName"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({required: false})}
                                error={!!errors.lastName}
                                helperText={
                                    errors.lastName &&
                                    "A valid last name is required"
                                }
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Email"
                                id="email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({
                                    required: true,
                                    pattern: emailRegex,
                                })}
                                error={!!errors.email}
                                helperText={
                                    errors.email && "A valid email is required"
                                }
                                color={"primary"}
                                margin={"dense"}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Password"
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="password"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({required: true})}
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
                            <TextField
                                required
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                autoComplete="confirmPassword"
                                autoFocus
                                variant="outlined"
                                fullWidth
                                inputRef={register({required: true})}
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
                                fullWidth
                                color="primary"
                            >
                                Sign Up
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <SignUpSignIn/>
                        </Grid>
                    </Grid>
                </form>
            </ThemeProvider>
        </Box>
    );
};
