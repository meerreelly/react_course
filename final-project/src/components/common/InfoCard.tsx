import { memo } from 'react';
import { Card, CardContent, Box, Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

export interface InfoCardProps {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  variant?: 'default' | 'gradient';
}

const InfoCard = memo(({ title, subtitle, icon, action, children, variant = 'default' }: InfoCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        ...(variant === 'gradient' && {
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}05 100%)`,
        }),
      }}
    >
      <CardContent>
        {(title || icon || action) && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 2,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {icon && (
                <Box sx={{ color: theme.palette.primary.main, display: 'flex' }}>
                  {icon}
                </Box>
              )}
              <Box>
                {title && (
                  <Typography variant="h6" fontWeight={600}>
                    {title}
                  </Typography>
                )}
                {subtitle && (
                  <Typography variant="body2" color="text.secondary">
                    {subtitle}
                  </Typography>
                )}
              </Box>
            </Box>
            {action}
          </Box>
        )}
        {children}
      </CardContent>
    </Card>
  );
});

InfoCard.displayName = 'InfoCard';

export default InfoCard;
