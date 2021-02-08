import React, { FC } from "react";
import {
  createStyles,
  makeStyles,
  Theme,
  Toolbar,
  AppBar,
  Typography,
  Tabs,
  Tab,
  withStyles,
} from "@material-ui/core";
import { gray, primary, white } from "@area-common/styles";

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
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
));

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
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
