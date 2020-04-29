import { DefaultTheme, Theme as PaperTheme } from 'react-native-paper';

type CustomThemeElements = {
    colors: {
         onPrimary: string,
         important: string
    }
}

type Theme = PaperTheme & CustomThemeElements

export const paperTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#27ae60',
        onPrimary: '#fff',
        accent: '#2274a5',
        important: "#fc7753"
    },
    roundness: 10
};