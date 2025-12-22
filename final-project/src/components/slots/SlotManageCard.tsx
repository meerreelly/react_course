import { memo, useCallback } from 'react';
import { Box, Card, CardContent, IconButton, Typography, Chip, useTheme } from '@mui/material';
import { Edit, Delete, AccessTime } from '@mui/icons-material';
import type { SlotDto } from '../../types';

interface SlotManageCardProps {
  slot: SlotDto;
  onEdit: (slot: SlotDto) => void;
  onDelete: (id: string) => void;
}

const SlotManageCard = memo(({ slot, onEdit, onDelete }: SlotManageCardProps) => {
  const theme = useTheme();

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleEdit = useCallback(() => {
    onEdit(slot);
  }, [onEdit, slot]);

  const handleDelete = useCallback(() => {
    onDelete(slot.id);
  }, [onDelete, slot.id]);

  return (
    <Card
      sx={{
        borderRadius: 3,
        transition: 'all 0.3s',
        border: `1px solid ${slot.isBooked ? theme.palette.error.main + '40' : theme.palette.success.main + '40'}`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 30px rgba(0,0,0,0.4)'
            : '0 8px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <AccessTime fontSize="small" sx={{ color: theme.palette.primary.main }} />
              <Typography variant="body1" fontWeight={600}>
                {formatDateTime(slot.startTime)}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 3.5 }}>
              to {formatDateTime(slot.endTime)}
            </Typography>
            <Chip
              label={slot.isBooked ? 'Booked' : 'Available'}
              size="small"
              color={slot.isBooked ? 'error' : 'success'}
              sx={{ mt: 2 }}
            />
          </Box>

          {!slot.isBooked && (
            <Box sx={{ display: 'flex', gap: 0.5 }}>
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}20`,
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Edit fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={handleDelete}
                sx={{
                  '&:hover': {
                    bgcolor: `${theme.palette.error.main}20`,
                  },
                }}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

export default SlotManageCard;
