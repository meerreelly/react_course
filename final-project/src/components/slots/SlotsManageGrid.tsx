import { memo } from 'react';
import { Grid, Typography } from '@mui/material';
import SlotManageCard from './SlotManageCard';
import type { SlotDto } from '../../types';

interface SlotsManageGridProps {
  slots: SlotDto[];
  onEdit: (slot: SlotDto) => void;
  onDelete: (id: string) => void;
}

const SlotsManageGrid = memo(({ slots, onEdit, onDelete }: SlotsManageGridProps) => {
  if (slots.length === 0) {
    return (
      <Typography color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        No slots created yet
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {slots.map((slot) => (
        <Grid key={slot.id} size={{ xs: 12, sm: 6, md: 4 }}>
          <SlotManageCard
            slot={slot}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
});

export default SlotsManageGrid;
