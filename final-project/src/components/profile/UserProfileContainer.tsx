import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import { Person, LocalOffer, Star } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { userService } from '../../services/userService';
import { useAuthStore } from '../../state/authStore';
import { Loading, ErrorMessage, PageHeader, InfoCard, AlertMessage } from '../common';
import { ProfileHeader, ProfileEditForm, ProfileOffersList, ProfileReviewsList } from '../profile';
import type { UserDto, OfferDto, ReviewDto } from '../../types';

const validationSchema = Yup.object({
  username: Yup.string().min(2, 'Username must be at least 2 characters'),
  email: Yup.string().email('Invalid email address'),
});

export const UserProfileContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser, setUser } = useAuthStore();

  const [user, setUserData] = useState<UserDto | null>(null);
  const [offers, setOffers] = useState<OfferDto[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const isOwnProfile = currentUser?.id === id;

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const [userData, offersData, reviewsData] = await Promise.all([
          userService.getById(id),
          userService.getOffers(id),
          userService.getReviewsAbout(id),
        ]);
        setUserData(userData);
        setOffers(offersData);
        setReviews(reviewsData);
      } catch {
        setError('Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      if (!id) return;
      setSubmitting(true);
      try {
        const updatedUser = await userService.update(id, {
          username: values.username || undefined,
          email: values.email || undefined,
        });
        setUserData(updatedUser);
        if (isOwnProfile) {
          setUser(updatedUser);
        }
        setEditing(false);
        setSuccess('Profile updated successfully');
      } catch {
        setError('Failed to update profile');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  if (loading) return <Loading />;
  if (error && !user) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
      <AlertMessage
        open={!!success}
        message={success || ''}
        severity="success"
        onClose={() => setSuccess(null)}
      />
      <AlertMessage
        open={!!error}
        message={error || ''}
        severity="error"
        onClose={() => setError(null)}
      />

      <PageHeader
        title="User Profile"
        icon={<Person sx={{ fontSize: 32 }} />}
      />

      {/* Profile Card */}
      <InfoCard title="Profile Information" variant="gradient">
        {editing ? (
          <ProfileEditForm
            username={formik.values.username}
            email={formik.values.email}
            onUsernameChange={(value) => formik.setFieldValue('username', value)}
            onEmailChange={(value) => formik.setFieldValue('email', value)}
            onSave={() => formik.handleSubmit()}
            onCancel={() => setEditing(false)}
            loading={submitting}
            errors={{
              username: formik.touched.username ? formik.errors.username : undefined,
              email: formik.touched.email ? formik.errors.email : undefined,
            }}
          />
        ) : (
          <ProfileHeader
            user={user}
            averageRating={averageRating}
            reviewCount={reviews.length}
            isOwnProfile={isOwnProfile}
            onEdit={() => setEditing(true)}
          />
        )}
      </InfoCard>

      {/* Offers and Reviews Grid */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Offers Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard title={`Offers (${offers.length})`} icon={<LocalOffer />}>
            <ProfileOffersList offers={offers} />
          </InfoCard>
        </Grid>

        {/* Reviews Section */}
        <Grid size={{ xs: 12, md: 6 }}>
          <InfoCard title={`Reviews (${reviews.length})`} icon={<Star />}>
            <ProfileReviewsList reviews={reviews} />
          </InfoCard>
        </Grid>
      </Grid>
    </Box>
  );
};
