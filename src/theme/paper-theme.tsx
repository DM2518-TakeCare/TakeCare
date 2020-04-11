import { DefaultTheme, Theme } from 'react-native-paper';

export const paperTheme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#27ae60',
        accent: '#2274a5',
    },
    roundness: 10
};