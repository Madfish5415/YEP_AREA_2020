import {AuthenticationBloc, AuthenticationSignInEvent} from "@area-common/blocs";
import {gray, primary, secondary, white} from "@area-common/styles";
import {SignIn} from "@area-common/types";
import {
  Box,
  Button,
  createMuiTheme,
  Grid,
  makeStyles,
  TextField,
  ThemeProvider,
} from "@material-ui/core";
import React from "react";
import {useForm} from "react-hook-form";

import {emailRegex} from "../../../constants/regexs";
import {SignInSignUp} from "./buttons/signup";

const useStyle = makeStyles({
  container: {
    width: "35%",
    height: "50%",
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

type Props = {
  bloc: AuthenticationBloc
}

export const SignInForm: React.FC<Props> = (props) => {
  const classes = useStyle();

  const {register, errors, handleSubmit} = useForm();

  const afterSubmit = (data: any) => {
    const signin: SignIn = {
      email: data.email,
      password: data.password
    }

    props.bloc.add(new AuthenticationSignInEvent(signin));
  };

  return (
    <Box className={classes.container}>
      <ThemeProvider theme={theme}>
        <form
          noValidate
          className={classes.form}
          onSubmit={handleSubmit(afterSubmit)}
        >
          <Grid container spacing={2}>
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
                name="password"
                type="password"
                id="password"
                autoComplete="password"
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