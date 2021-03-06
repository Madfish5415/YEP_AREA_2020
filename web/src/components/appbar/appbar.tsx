import React, { FC } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  AppBar,
  Typography,
  Tabs,
  withStyles,
  Link,
  LinkProps,
  Box,
} from "@material-ui/core";
import { default as Tab, TabProps } from "@material-ui/core/Tab";
import { gray, primary, white } from "@area-common/styles";
import { useRouter } from "next/dist/client/router";

interface StyledTabsProps {
  value: number;
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 80,
      width: "100%",
      backgroundColor: "transparent",
    },
  },
})((props: StyledTabsProps) => <Tabs {...props} />);

interface StyledTabProps {
  label: string;
}

const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: "none",
      opacity: 1,
      color: white,
      fontSize: 20,
    },
    selected: {
      textTransform: "none",
      opacity: 1,
      color: primary.main,
      fontSize: 20,
    },
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appbar: {
      backgroundColor: gray.main,
      height: 60,
      paddingLeft: 100,
      paddingRight: 100,
    },
    toolbar: {},
    title: {
      color: primary.main,
      fontSize: 40,
      font: "roboto",
      fontWeight: "bold",
    },
    titleDivider: {
      flex: 1,
      justifyContent: "center",
    },
  })
);

const AppBarComponent: FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState(
    router.pathname === "/settings"
      ? 2
      : router.pathname === "/credentials"
      ? 1
      : router.pathname === "/workflows"
      ? 0
      : -1
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    const linksTab = ["/workflows", "/credentials", "/settings"];
    setValue(newValue);
    router.push(linksTab[newValue]);
  };

  return (
    <div className={classes.root}>
      <AppBar position={"static"} className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.titleDivider}>
            <Typography className={classes.title}>AREA 51</Typography>
          </div>
          <StyledTabs value={value} onChange={handleChange}>
            <StyledTab label="Workflows" />
            <StyledTab label="Credentials" />
            <StyledTab label="Settings" />
          </StyledTabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default AppBarComponent;
