// Material Ui 5 theme

export default function getDesignTokens(mode) {
  return {
    palette: {
      mode,
      primary: {
        main: "#4c579f",
        lighter: "#D1E9FC",
        light: "#76B0F1",
        dark: "#36407c",
        darker: "#061B64",
        contrastText: "#fff",
      },
      secondary: {
        main: "#1e1e2d",
      },
      success: {
        lighter: "#E9FCD4",
        light: "#AAF27F",
        main: "#54D62C",
        dark: "#229A16",
        darker: "#08660D",
      },
      neutral: {
        main: "#f5f8fa",
        contrastText: "#7E8299",
        light: "#ff2b0d",
      },
      background: {
        ...(mode === "dark"
          ? {
              default: "#131313",
              paper: "#272727",
            }
          : {
              default: "#f8f8f8",
              paper: "#fff",
            }),
      },
      text: {
        ...(mode === "dark"
          ? {
              primary: "#ffffff",
            }
          : {
              primary: "#000000",
            }),
      },
    },
    props: {
      MuiAppBar: {
        color: "default",
      },
      MuiTypography: {
        defaultProps: {
          variantMapping: {
            h1: "span",
            h2: "h2",
            h3: "h2",
            h4: "h2",
            h5: "h2",
            h6: "h2",
            subtitle1: "h2",
            subtitle2: "h2",
            body1: "span",
            body2: "span",
          },
        },
      },
    },
    shape: {
      borderRadius: 9,
    },
    typography: {
      // fontFamily: [
      //    'Poppins',
      //    'Roboto',
      //    '"Helvetica Neue"',
      //    'Arial',
      //    'sans-serif',
      //    '"Apple Color Emoji"',
      //    '"Segoe UI Emoji"',
      //    '"Segoe UI Symbol"',
      // ].join(','),
      button: {
        textTransform: "none",
        fontSize: "13px",
        // fontWeight: 'bold',
      },
    },
  };
}
