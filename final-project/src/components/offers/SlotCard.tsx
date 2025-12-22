import { Card, CardContent, Box, Typography, Button, useTheme } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import type { SlotDto } from '../../types';

interface SlotCardProps {
  slot: SlotDto;
  onBook?: (slot: SlotDto) => void;
  showBookButton?: boolean;
  disabled?: boolean;
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const SlotCard = ({ slot, onBook, showBookButton = true, disabled = false }: SlotCardProps) => {
  const theme = useTheme();

  return (
    <Card
      variant="outlined"
      sx={{
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 12px ${theme.palette.primary.main}15`,
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          '&:last-child': { pb: 2 },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
            <AccessTime fontSize="small" color="primary" />
            <Typography variant="body2" fontWeight={500}>
              {formatDateTime(slot.startTime)}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            to {formatDateTime(slot.endTime)}
          </Typography>
        </Box>
        {showBookButton && onBook && (
          <Button
            variant="contained"
            size="small"
            onClick={() => onBook(slot)}
            disabled={disabled || slot.isBooked}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {slot.isBooked ? 'Booked' : 'Book'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SlotCard;
