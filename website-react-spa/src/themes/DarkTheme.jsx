const darkTheme = {
  palette: {
    mode: 'dark',
    primary: {
      light: '#cfd8dc',
      main: '#455a64',
      dark: '#263238',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fafafa',
      main: '#eeeeee',
      dark: '#bdbdbd',
      contrastText: '#000',
    },
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) =>
          theme.unstable_sx({
            mb: 1,
            borderRadius: '10px',
            '&.Mui-selected': {
              border: '1px solid',
            },
          }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          '.MuiDrawer-paperAnchorRight': {
            opacity: 0.8,
            borderTopLeftRadius: '10px',
            borderBottomLeftRadius: '10px',
          },
        },
      },
    },
  },
}

export default darkTheme
