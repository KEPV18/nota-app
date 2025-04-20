import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    background: '#ffffff',
    card: '#f5f5f5',
    text: '#2c3e50',
    border: '#bdc3c7',
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3498db',
    background: '#121212',
    card: '#1e1e1e',
    text: '#ffffff',
    border: '#333333',
  },
};