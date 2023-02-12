import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { getTheme } from './utils/StorageUtil';
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import getDesignTokens from './config/theme';
import 'react-circular-progressbar/dist/styles.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import Layout from './components/Layout';
// import dayjs from "dayjs";
dayjs.extend(utc);
// import Demo from "./components/Demo";

function App() {
  const currTheme = getTheme();
  let themePref = currTheme ? 'light' : 'dark';
  const coreTheme = createTheme(getDesignTokens(themePref));

  return (
    <ThemeProvider theme={coreTheme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
