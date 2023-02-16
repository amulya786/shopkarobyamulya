import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../Redux/actions/userAction";
import { useNavigate } from 'react-router-dom';
import SpeedDial from '@mui/material/SpeedDial';
import Avatar from '@mui/material/Avatar';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Backdrop from '@mui/material/Backdrop';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
function UserNavbar({ user}) {
  const {cartItems} = useSelector(state=>state.cart);
  const [opens, setOpen] = React.useState(false);
  const actions = [
    { icon: <ListAltIcon />, name: 'My Profile', func: profile },
    {
      icon:
      <StyledBadge badgeContent={cartItems && cartItems.length} color="secondary">
      <ShoppingCartIcon />
    </StyledBadge>, name: 'cart', func: cart
    },
    { icon: <AccountBoxIcon />, name: 'Save', func: logout },
    { icon: <LogoutIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === "admin") {
    actions.unshift(
      { icon: <DashboardIcon />, name: 'Dashboard', func: dashboard })
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    navigate('/')
  }
  function cart() {
    navigate('/cart');
  }
  function profile() {
    navigate('/account');
  }
  function dashboard() {
    navigate('/admin/dashboard');
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  return (
    <>

      <Backdrop
        sx={{ color: '#fff', zIndex: 3 }}
        open={opens}
        onClick={() => setOpen(false)}
      />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', top: 16, right: 16, zIndex: 4 }}
        onClick={() => setOpen(!opens)}
        open={opens}
        icon={<Avatar
          alt={user.name}
          src={user.avatar.url}
          sx={{ bgcolor: stringToColor(user.name), width: 56, height: 56, }}
        />}
        direction="down"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen={window.innerWidth < 400}
            tooltipTitle={action.name}
            onClick={action.func}
          />
        ))}
      </SpeedDial>

    </>
  )
}

export default UserNavbar