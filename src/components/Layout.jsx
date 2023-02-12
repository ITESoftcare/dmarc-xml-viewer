import * as React from 'react';
import { styled, createTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from '@mui/material/Link';
import { Icon } from '@iconify/react';
import { useEffect } from 'react';
import { useTheme } from '@emotion/react';
import { ListItem, ListItemButton, ListItemText, useMediaQuery } from '@mui/material';
import Report from '../pages/Report';
import FilePicker from './FilePicker';
import { store } from '../reducers/store';
import dayjs from 'dayjs';
// import MenuIcon from "@mui/icons-material/Menu";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import NotificationsIcon from "@mui/icons-material/Notifications";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="_blank" href="https://github.com/itesaurabh">
        ITESaurabh
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function Layout() {
  const [open, setOpen] = React.useState(true);
  const { state, dispatch } = React.useContext(store);
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isPhone) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isPhone]);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          variant="dense"
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <Icon icon="material-symbols:menu-rounded" />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Report
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Icon icon="material-symbols:settings-outline-rounded" />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          variant="dense"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <Icon icon="material-symbols:chevron-left-rounded" />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <ListItem>
            <FilePicker />
          </ListItem>
          <Divider sx={{ my: 1 }} />
          {state.files.map(file => (
            <ListItemButton
              selected={state.selectedFile?.id === file.id}
              onClick={() => dispatch({ type: 'SET_SELECTED_FILE', payload: file })}
            >
              <ListItemText
                primary={`${dayjs.unix(file.range.start).format('DD-MM-YYYY')} - ${dayjs
                  .unix(file.range.end)
                  .format('DD-MM-YYYY')}`}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: theme =>
            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Report />
        <Copyright sx={{ py: 4 }} />
      </Box>
    </Box>
  );
}

export default Layout;
