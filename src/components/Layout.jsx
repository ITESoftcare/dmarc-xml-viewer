import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { Icon } from '@iconify/react';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon, useMediaQuery } from '@mui/material';
import Report from '../pages/Report';
import FilePicker from './FilePicker';
import { useContext, useEffect, useState } from 'react';
import { store } from '../reducers/store';
import dayjs from 'dayjs';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  overflow: 'auto',
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Demo() {
  const theme = useTheme();
  const { state, dispatch } = useContext(store);
  const [open, setOpen] = useState(true);
  const isPhone = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    if (isPhone) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isPhone]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Icon icon="material-symbols:menu-rounded" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Report
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Toolbar variant="dense" disableGutters>
          <Typography sx={{ marginX: 'auto' }} fontWeight="bold">
            DMARC XML Viewer
          </Typography>
          <IconButton onClick={handleDrawerClose} sx={{ mr: 1 }}>
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
      <Main open={open}>
        <DrawerHeader />
        <Report />
        {/* <Copyright sx={{ py: 4 }} /> */}
      </Main>
    </Box>
  );
}
