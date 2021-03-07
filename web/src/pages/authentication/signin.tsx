import {
  AuthenticationBloc,
  AuthenticationErrorState,
  AuthenticationInitialState,
  AuthenticationRepository,
  AuthenticationSignInState,
} from "@area-common/blocs";
import { gray, primary } from "@area-common/styles";
import { BlocBuilder } from "@felangel/react-bloc";
import {
  Backdrop,
  Box,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useRouter } from "next/dist/client/router";
import React, { FC, useEffect } from "react";

import { SignInForm } from "../../components/authentication/signin/form";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: gray.main,
      width: "100%",
      height: "100%",
    },
    formContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
      height: "100%",
    },
    title: {
      color: primary.main,
      fontSize: 96,
      font: "roboto",
      fontWeight: "bold",
    },
    alert: {
      margin: "1rem 0",
    },
    backdrop: {
      color: "#ffffff",
      zIndex: 100,
    },
  })
);

const SigninPage: FC = () => {
  const classes = useStyles();
  const authBloc = new AuthenticationBloc(
    new AuthenticationRepository("http://localhost:8080")
  );
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      router
        .push("/workflows")
        .then()
        .catch((e) => console.log(e));
    }
  }, [router]);

  return (
    <Box className={classes.root}>
      <Box className={classes.formContainer}>
        <Typography className={classes.title}>AREA 51</Typography>
        <BlocBuilder
          bloc={authBloc}
          builder={(state) => {
            if (state instanceof AuthenticationErrorState) {
              return (
                <Box className={classes.formContainer}>
                  <Alert severity="error" className={classes.alert}>
                    {state.error.message}
                  </Alert>
                  <SignInForm bloc={authBloc} />
                </Box>
              );
            }
            if (state instanceof AuthenticationInitialState) {
              return <SignInForm bloc={authBloc} />;
            }
            if (state instanceof AuthenticationSignInState) {
              localStorage.setItem("jwt", state.authentication);
              router
                .push("/workflows")
                .then()
                .catch((e) => console.log(e));
            }
            return (
              <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress color="inherit" />
              </Backdrop>
            );
          }}
        />
      </Box>
    </Box>
  );
};

export default SigninPage;
