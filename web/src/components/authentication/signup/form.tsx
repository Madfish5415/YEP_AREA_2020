import {AuthenticationBloc, AuthenticationSignUpEvent} from "@area-common/blocs";
import {gray, primary, secondary, white} from "@area-common/styles";
import {SignUp} from "@area-common/types";
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
import {SignUpSignIn} from "./buttons/signin";

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
  bloc: AuthenticationBloc;
};

export const SignUpForm: React.FC<Props> = (props) => {
  const classes = useStyle();
  const {register, errors, handleSubmit} = useForm();

  const afterSubmit = async (data: any) => {
    const signup: SignUp = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName
    }

    props.bloc.add(new AuthenticationSignUpEvent(signup));
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
