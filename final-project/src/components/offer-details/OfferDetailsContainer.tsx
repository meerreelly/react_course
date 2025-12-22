import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Grid, Button, Typography, Divider, useTheme } from '@mui/material';
import { Edit, Delete, Add, LocalOffer } from '@mui/icons-material';
import { offerService } from '../../services/offerService';
import { orderService } from '../../services/orderService';
import { categoryService } from '../../services/categoryService';
import { userService } from '../../services/userService';
import { useAuthStore } from '../../state/authStore';
import { Loading, ErrorMessage, InfoCard, AlertMessage } from '../common';
import { OfferHeader, SlotsGrid, ReviewList, BookingModal, CategoryChips } from '../offers';
import type { OfferDto, SlotDto, ReviewDto, CategoryDto } from '../../types';

export const OfferDetailsContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const { user, updateBalance } = useAuthStore();

  const [offer, setOffer] = useState<OfferDto | null>(null);
  const [slots, setSlots] = useState<SlotDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<SlotDto | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const isOwner = user?.id === offer?.providerId;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [offerData, slotsData, reviewsData, categoriesData] = await Promise.all([
          offerService.getById(id),
          offerService.getSlots(id),
          offerService.getReviews(id),
          categoryService.getAll(),
        ]);
        setOffer(offerData);
        setSlots(slotsData);
        setReviews(reviewsData);
        setCategories(categoriesData);
      } catch {
        setError('Failed to load offer details');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleBookSlot = useCallback((slot: SlotDto) => {
    setSelectedSlot(slot);
    setBookingDialogOpen(true);
  }, []);

  const handleCloseBookingDialog = useCallback(() => {
    setBookingDialogOpen(false);
  }, []);

  const handleConfirmBooking = useCallback(async () => {
    if (!selectedSlot || !offer) return;
    setBookingLoading(true);
    try {
      await orderService.create({
        offerId: offer.id,
        slotId: selectedSlot.id,
        notes: bookingNotes || undefined,
      });
      const updatedUser = await userService.getMe();
      updateBalance(updatedUser.balance);
      setBookingDialogOpen(false);
      setBookingNotes('');
      setSuccess('Booking confirmed! Redirecting...');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setError('Failed to create order');
    } finally {
      setBookingLoading(false);
    }
  }, [selectedSlot, offer, bookingNotes, updateBalance, navigate]);

  const handleDeleteOffer = useCallback(async () => {
    if (!id) return;
    if (window.confirm('Are you sure you want to delete this offer?')) {
      try {
        await offerService.delete(id);
        navigate('/');
      } catch {
        setError('Failed to delete offer');
      }
    }
  }, [id, navigate]);

  const handleClearSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  const handleNavigateToEdit = useCallback(() => {
    navigate(`/offers/${id}/edit`);
  }, [navigate, id]);

  const handleNavigateToSlots = useCallback(() => {
    navigate(`/offers/${id}/slots`);
  }, [navigate, id]);

  const getCategoryNames = useMemo(() => {
    return (categoryIds: string[]) => {
      return categoryIds
        .map((cid) => categories.find((c) => c.id === cid)?.name)
        .filter(Boolean) as string[];
    };
  }, [categories]);

  const averageRating = useMemo(() => 
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0,
    [reviews]
  );

  const availableSlots = useMemo(() => 
    slots.filter((slot) => !slot.isBooked),
    [slots]
  );

  if (loading) return <Loading />;
  if (error && !offer) return <ErrorMessage message={error} />;
  if (!offer) return <ErrorMessage message="Offer not found" />;

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

      {/* Header Section */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
        <OfferHeader
          title={offer.title}
          averageRating={averageRating}
          reviewCount={reviews.length}
          status={offer.status}
        />
        {isOwner && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={handleNavigateToEdit}
              size="small"
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleDeleteOffer}
              size="small"
            >
              Delete
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Description Card */}
          <InfoCard title="Description" icon={<LocalOffer />}>
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
              {offer.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
              <CategoryChips categoryNames={getCategoryNames(offer.categoryIds)} />
            </Box>

            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ${offer.pricePerHour.toFixed(2)} / hour
            </Typography>
          </InfoCard>

          {/* Available Slots Card */}
          <Box sx={{ mt: 3 }}>
            <InfoCard
              title="Available Slots"
              action={
                isOwner && (
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<Add />}
                    onClick={handleNavigateToSlots}
                    sx={{
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                    }}
                  >
                    Manage Slots
                  </Button>
                )
              }
            >
              <SlotsGrid
                slots={availableSlots}
                onBook={handleBookSlot}
                showBookButton={!isOwner}
              />
            </InfoCard>
          </Box>
        </Grid>

        {/* Sidebar - Reviews */}
        <Grid size={{ xs: 12, md: 4 }}>
          <InfoCard title="Reviews" variant="gradient">
            <ReviewList reviews={reviews} />
          </InfoCard>
        </Grid>
      </Grid>

      {/* Booking Modal */}
      <BookingModal
        open={bookingDialogOpen}
        onClose={handleCloseBookingDialog}
        offer={offer}
        slot={selectedSlot}
        notes={bookingNotes}
        onNotesChange={setBookingNotes}
        onConfirm={handleConfirmBooking}
        loading={bookingLoading}
      />
    </Box>
  );
};
