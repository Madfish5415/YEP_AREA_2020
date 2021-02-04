import React, {FC} from "react";
import {
    createStyles,
    makeStyles,
    Theme,
    Toolbar,
    AppBar,
    Typography,
    Tabs,
    Tab,
    withStyles
} from "@material-ui/core";
import {gray, primary, white} from "@area-common/styles";

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
})((props: StyledTabsProps) => <Tabs {...props} TabIndicatorProps={{children: <span/>}}/>);

interface StyledTabProps {
    label: string;
}

const StyledTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
            textTransform: "none",
            opacity: 1,
            color: white,
            fontSize: 24,
        },
        selected: {
            textTransform: "none",
            opacity: 1,
            color: primary.main,
            fontSize: 24,
        },
    }),
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        appbar: {
            backgroundColor: gray.main,
            height: 80,
        },
        title: {
            color: primary.main,
            fontSize: 48,
            font: "roboto",
            fontStyle: "bold",
            paddingLeft: 120,
        },
        titleDivider: {
            flex: 1,
            justifyContent: "center"
        },
        tabsDivider: {
            flex: 1,
            justifyContent: "left"
        }
    }),
);

const AppBarComponent: FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    return (
        <div className={classes.root}>
            <AppBar position={"static"} className={classes.appbar}>
                <Toolbar>
                    <div className={classes.titleDivider}>
                        <Typography className={classes.title}>
                            AREA 51
                        </Typography>
                    </div>
                    <div className={classes.tabsDivider}>
                        <StyledTabs value={value} onChange={handleChange}>
                            <StyledTab label="Workflows"/>
                            <StyledTab label="Credentials"/>
                            <StyledTab label="Settings"/>
                        </StyledTabs>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AppBarComponent