import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Add, Schedule, ArrowBack } from '@mui/icons-material';
import { offerService } from '../../services/offerService';
import { slotService } from '../../services/slotService';
import { Loading, ErrorMessage, PageHeader, InfoCard, AlertMessage } from '../common';
import { SlotsManageGrid } from '../slots';
import SlotDialogContainer from './SlotDialogContainer';
import type { SlotDto, OfferDto } from '../../types';

export const SlotsManagementContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [offer, setOffer] = useState<OfferDto | null>(null);
  const [slots, setSlots] = useState<SlotDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<SlotDto | null>(null);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [offerData, slotsData] = await Promise.all([
        offerService.getById(id),
        offerService.getSlots(id),
      ]);
      setOffer(offerData);
      setSlots(slotsData);
    } catch {
      setError('Failed to load slots');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenDialog = useCallback((slot?: SlotDto) => {
    if (slot) {
      setEditingSlot(slot);
    } else {
      setEditingSlot(null);
    }
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setEditingSlot(null);
  }, []);

  const handleDeleteSlot = useCallback(async (slotId: string) => {
    if (window.confirm('Are you sure you want to delete this slot?')) {
      try {
        await slotService.delete(slotId);
        setSuccess('Slot deleted successfully');
        await fetchData();
      } catch {
        setError('Failed to delete slot');
      }
    }
  }, [fetchData]);

  const openCreateDialog = useCallback(() => {
    handleOpenDialog();
  }, [handleOpenDialog]);

  const headerIcon = useMemo(() => <Schedule sx={{ fontSize: 32 }} />, []);

  const handleNavigateBack = useCallback(() => {
    navigate(`/offer/${id}`);
  }, [navigate, id]);

  const headerAction = useMemo(
    () => (
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={openCreateDialog}
          sx={{
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          Add Slot
        </Button>
        <Button variant="outlined" startIcon={<ArrowBack />} onClick={handleNavigateBack}>
          Back to Offer
        </Button>
      </Box>
    ),
    [handleNavigateBack, openCreateDialog]
  );

  const handleClearSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  if (loading) return <Loading />;
  if (error && !offer) return <ErrorMessage message={error} />;
  if (!offer) return <ErrorMessage message="Offer not found" />;
  if (!id) return <ErrorMessage message="Offer not found" />;

  return (
    <Box>
      <AlertMessage
        open={!!success}
        message={success || ''}
        severity="success"
        onClose={handleClearSuccess}
      />
      <AlertMessage
        open={!!error}
        message={error || ''}
        severity="error"
        onClose={handleClearError}
      />

      <PageHeader
        title="Manage Slots"
        subtitle={offer.title}
        icon={headerIcon}
        action={headerAction}
      />

      {slots.length === 0 ? (
        <InfoCard title="No Slots">
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No slots created yet
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Create time slots to let customers book your service
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={openCreateDialog}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >Create First Slot
            </Button>
          </Box>
        </InfoCard>
      ) : (
        <SlotsManageGrid
          slots={slots}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteSlot}
        />
      )}

      <SlotDialogContainer
        open={dialogOpen}
        offerId={id}
        editingSlot={editingSlot}
        onClose={handleCloseDialog}
        onSaved={fetchData}
        onSuccess={setSuccess}
        onError={setError}
      />
    </Box>
  );
};
