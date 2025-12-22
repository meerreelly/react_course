import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Chip,
  Divider,
  Tooltip,
  Badge,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Logout,
  Add,
  ShoppingCart,
  DarkMode,
  LightMode,
  Wallet,
  Person,
  Hub,
} from '@mui/icons-material';
import { SignInButton } from '@clerk/clerk-react';
import { useAuthStore } from '../../state/authStore';
import { useUserStore } from '../../state/userStore';
import { useThemeStore } from '../../state/themeStore';
import { useClerkAuth } from '../../hooks/useClerkAuth';

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, isAuthenticated } = useAuthStore();
  const { activeOrders } = useUserStore();
  const { mode, toggleTheme } = useThemeStore();
  const { signOut } = useClerkAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    handleMenuClose();
    navigate('/dashboard');
  };

  const handleProfile = () => {
    handleMenuClose();
    if (user?.id) {
      navigate(`/user/${user.id}`);
    }
  };

  const handleLogout = async () => {
    handleMenuClose();
    await signOut();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar className="justify-between px-4 md:px-6">
        <Box
          component={RouterLink}
          to="/"
          className="flex items-center gap-2 no-underline"
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              borderRadius: 2,
              p: 0.75,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Hub sx={{ color: 'white', fontSize: 24 }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.025em',
            }}
          >
            ServiceHub
          </Typography>
        </Box>

        <Box className="flex items-center gap-2 md:gap-3">
          <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
            <IconButton
              onClick={toggleTheme}
              sx={{
                backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)',
                },
              }}
            >
              {mode === 'light' ? (
                <DarkMode sx={{ fontSize: 20 }} />
              ) : (
                <LightMode sx={{ fontSize: 20, color: theme.palette.warning.main }} />
              )}
            </IconButton>
          </Tooltip>

          {isAuthenticated && (
            <>
              <Tooltip title="Your balance">
                <Chip
                  icon={<Wallet sx={{ fontSize: 18 }} />}
                  label={`$${user?.balance?.toFixed(2) || '0.00'}`}
                  variant="outlined"
                  sx={{
                    fontWeight: 600,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    '& .MuiChip-icon': {
                      color: theme.palette.primary.main,
                    },
                  }}
                />
              </Tooltip>

              <Button
                variant="contained"
                size="small"
                startIcon={<Add sx={{ fontSize: 18 }} />}
                onClick={() => navigate('/deposit')}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                  },
                }}
              >
                <span className="hidden sm:inline">Top Up</span>
              </Button>

              {activeOrders.length > 0 && (
                <Tooltip title="Active orders">
                  <IconButton
                    onClick={() => navigate(`/orders/${activeOrders[0].id}`)}
                    sx={{
                      backgroundColor: theme.palette.warning.main + '20',
                      '&:hover': {
                        backgroundColor: theme.palette.warning.main + '30',
                      },
                    }}
                  >
                    <Badge badgeContent={activeOrders.length} color="warning">
                      <ShoppingCart sx={{ color: theme.palette.warning.main }} />
                    </Badge>
                  </IconButton>
                </Tooltip>
              )}

              <Tooltip title="Dashboard">
                <IconButton
                  onClick={() => navigate('/dashboard')}
                  sx={{
                    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.12)',
                    },
                  }}
                >
                  <Dashboard sx={{ fontSize: 20 }} />
                </IconButton>
              </Tooltip>

              <Tooltip title="Account">
                <IconButton
                  onClick={handleMenuOpen}
                  sx={{ p: 0.5 }}
                >
                  <Avatar
                    sx={{
                      width: 36,
                      height: 36,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    {user?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 180,
                  },
                }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {user?.username || 'User'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {user?.email}
                  </Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleDashboard} sx={{ py: 1.5 }}>
                  <Dashboard sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleProfile} sx={{ py: 1.5 }}>
                  <Person sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
                  Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: 'error.main' }}>
                  <Logout sx={{ mr: 1.5, fontSize: 20 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}

          {!isAuthenticated && (
            <SignInButton mode="modal">
              <Button
                variant="contained"
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  '&:hover': {
                    background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.primary.main} 100%)`,
                  },
                }}
              >
                Sign In
              </Button>
            </SignInButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
