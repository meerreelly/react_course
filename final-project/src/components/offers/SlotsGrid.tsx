import { Grid, Typography } from '@mui/material';
import SlotCard from './SlotCard';
import type { SlotDto } from '../../types';

interface SlotsGridProps {
  slots: SlotDto[];
  onBook?: (slot: SlotDto) => void;
  showBookButton?: boolean;
  emptyMessage?: string;
}

const SlotsGrid = ({
  slots,
  onBook,
  showBookButton = true,
  emptyMessage = 'No slots available at the moment',
}: SlotsGridProps) => {
  if (slots.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2 }}>
        {emptyMessage}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {slots.map((slot) => (
        <Grid key={slot.id} size={{ xs: 12, sm: 6 }}>
          <SlotCard
            slot={slot}
            onBook={onBook}
            showBookButton={showBookButton}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SlotsGrid;
