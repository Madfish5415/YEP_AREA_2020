import { DefaultTheme } from "react-native-paper";
import { gray, primary, secondary, white } from "@area-common/styles";
import { Colors } from "react-native/Libraries/NewAppScreen";

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      inactive: string;
      category: string;
    }

    interface ThemeFont {
      fontSize: number;
      color: string;
    }

    interface ThemeFonts {
      main: Partial<ThemeFont>;
      placeholder: Partial<ThemeFont>;
      category: Partial<ThemeFont>;
      nodeName: Partial<ThemeFont>;
      nodeLabel: Partial<ThemeFont>;
      parametersLabel: Partial<ThemeFont>;
      headerBarLabel: Partial<ThemeFont>;
      description: Partial<ThemeFont>;
      headerBarTitle: Partial<ThemeFont>;
      buttonLabel: Partial<ThemeFont>;
      serviceName: Partial<ThemeFont>;
    }
  }
}

const Theme: ReactNativePaper.Theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: primary.main,
    accent: secondary.main,
    background: gray.main,
    placeholder: gray.light4,
    surface: primary.dark1,
    text: white,
    inactive: gray.light3,
  },
  fonts: {
    main: {
      fontSize: 14,
    },
    placeholder: {
      fontSize: 14,
    },
    category: {
      fontSize: 14,
    },
    nodeName: {
      fontSize: 18,
    },
    nodeLabel: {
      fontSize: 14,
    },
    parametersLabel: {
      fontSize: 16,
    },
    headerBarLabel: {
      fontSize: 18,
    },
    headerBarTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: primary.main,
    },
    buttonLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: white,
    },
  },
};

export default Theme;
