import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button, Divider } from '@mui/material';

interface DashboardSectionProps {
  title: string;
  icon?: ReactNode;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}

const DashboardSection = ({
  title,
  icon,
  actionLabel,
  actionPath,
  onAction,
  isEmpty,
  emptyMessage = 'No data',
  children,
}: DashboardSectionProps) => {
  const navigate = useNavigate();

  const handleAction = () => {
    if (onAction) {
      onAction();
    } else if (actionPath) {
      navigate(actionPath);
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box className="flex justify-between items-center mb-3">
          <Box className="flex items-center gap-2">
            {icon}
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
          </Box>
          {actionLabel && (
            <Button size="small" onClick={handleAction}>
              {actionLabel}
            </Button>
          )}
        </Box>
        <Divider sx={{ mb: 2 }} />
        {isEmpty ? (
          <Typography color="text.secondary">{emptyMessage}</Typography>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardSection;
