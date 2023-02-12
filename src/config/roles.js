import SecurityIcon from '@mui/icons-material/Security';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
// import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
// Roles
export var SUPER_ADMIN = 'super_admin';
export var PARTNER = 'partner';
export var ADMIN = 'admin';
export var MERCHANT = 'merchant';
export var SUPERVISOR = 'supervisor';
// export
// export var DISTRIBUTOR = 'distributor';

export const ROLES = {
   user1: {
      name: 'Admin',
      value: ADMIN,
      path: 'admin', // use dashes for path for admin
      icon: <SecurityIcon color="primary" style={{ fontSize: 100 }} />,
   },
   user2: {
      name: 'Organiser',
      value: 'organiser',
      path: 'organiser', // use dashes for path for admin
      icon: <SportsEsportsOutlinedIcon color="primary" style={{ fontSize: 100 }} />,
   },
};
