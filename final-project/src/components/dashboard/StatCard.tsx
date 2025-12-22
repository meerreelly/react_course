import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';
import type { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  icon: SvgIconComponent;
  label: string;
  value: string | number;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

const StatCard = ({ icon: Icon, label, value, color = 'primary' }: StatCardProps) => {
  const theme = useTheme();

  const getGradient = () => {
    const colorMap = {
      primary: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.light}10 100%)`,
      secondary: `linear-gradient(135deg, ${theme.palette.secondary.main}15 0%, ${theme.palette.secondary.light}10 100%)`,
      success: `linear-gradient(135deg, ${theme.palette.success.main}15 0%, ${theme.palette.success.light}10 100%)`,
      warning: `linear-gradient(135deg, ${theme.palette.warning.main}15 0%, ${theme.palette.warning.light}10 100%)`,
      error: `linear-gradient(135deg, ${theme.palette.error.main}15 0%, ${theme.palette.error.light}10 100%)`,
      info: `linear-gradient(135deg, ${theme.palette.info.main}15 0%, ${theme.palette.info.light}10 100%)`,
    };
    return colorMap[color];
  };

  return (
    <Card
      sx={{
        background: getGradient(),
        border: `1px solid ${theme.palette[color].main}20`,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px ${theme.palette[color].main}20`,
        },
      }}
    >
      <CardContent>
        <Box className="flex items-center gap-3">
          <Box
            sx={{
              backgroundColor: theme.palette[color].main + '20',
              borderRadius: 2,
              p: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon sx={{ color: theme.palette[color].main, fontSize: 28 }} />
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>
              {label}
            </Typography>
            <Typography variant="h5" fontWeight={700} color={`${color}.main`}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
