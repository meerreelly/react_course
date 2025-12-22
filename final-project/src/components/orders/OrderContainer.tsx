import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { orderService } from "../../services/orderService";
import { reviewService } from "../../services/reviewService";
import { offerService } from "../../services/offerService";
import { slotService } from "../../services/slotService";
import { userService } from "../../services/userService";
import { useAuthStore } from "../../state/authStore";
import {
  Loading,
  ErrorMessage,
  PageHeader,
  InfoCard,
  AlertMessage,
} from "../common";
import {
  OrderStatusBadge,
  OrderInfoGrid,
  OrderInfoField,
  OrderActions,
  ReviewModal,
} from ".";
import type { OrderDto, OfferDto, SlotDto } from "../../types";

const reviewValidationSchema = Yup.object({
  rating: Yup.number().required("Rating is required").min(1).max(5),
  comment: Yup.string()
    .required("Comment is required")
    .min(10, "Comment must be at least 10 characters"),
});

export const OrderContainer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateBalance } = useAuthStore();

  const [order, setOrder] = useState<OrderDto | null>(null);
  const [offer, setOffer] = useState<OfferDto | null>(null);
  const [slot, setSlot] = useState<SlotDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const fetchData = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const orderData = await orderService.getById(id);
      setOrder(orderData);
      const [offerData, slotData] = await Promise.all([
        offerService.getById(orderData.offerId),
        slotService.getById(orderData.slotId),
      ]);
      setOffer(offerData);
      setSlot(slotData);
    } catch {
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleStartOrder = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await orderService.start(id);
      setActionSuccess("Order started successfully");
      fetchData();
    } catch {
      setError("Failed to start order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCompleteOrder = async () => {
    if (!id) return;
    setSubmitting(true);
    try {
      await orderService.complete(id);
      const updatedUser = await userService.getMe();
      updateBalance(updatedUser.balance);
      setActionSuccess("Order completed successfully");
      fetchData();
    } catch {
      setError("Failed to complete order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelOrder = async () => {
    if (!id) return;
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setSubmitting(true);
      try {
        await orderService.cancel(id);
        const updatedUser = await userService.getMe();
        updateBalance(updatedUser.balance);
        setActionSuccess("Order cancelled successfully");
        fetchData();
      } catch {
        setError("Failed to cancel order");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const reviewFormik = useFormik({
    initialValues: {
      rating: 5,
      comment: "",
    },
    validationSchema: reviewValidationSchema,
    onSubmit: async (values) => {
      if (!id) return;
      setSubmitting(true);
      try {
        await reviewService.create({
          orderId: id,
          rating: values.rating,
          comment: values.comment,
        });
        setReviewDialogOpen(false);
        setActionSuccess("Review submitted successfully");
        reviewFormik.resetForm();
      } catch {
        setError("Failed to submit review");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const isBuyer = order?.buyerId === user?.id;
  const isProvider = offer?.providerId === user?.id;

  if (loading) return <Loading />;
  if (error && !order) return <ErrorMessage message={error} />;
  if (!order || !offer) return <ErrorMessage message="Order not found" />;

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto" }}>
      <AlertMessage
        open={!!actionSuccess}
        message={actionSuccess || ""}
        severity="success"
        onClose={() => setActionSuccess(null)}
      />
      <AlertMessage
        open={!!error}
        message={error || ""}
        severity="error"
        onClose={() => setError(null)}
      />

      <PageHeader
        title="Order Details"
        action={
          <Button variant="outlined" onClick={() => navigate("/dashboard")}>
            Back to Dashboard
          </Button>
        }
      />

      <InfoCard
        title={offer.title}
        subtitle={`Order #${order.id.slice(0, 8)}`}
        action={<OrderStatusBadge status={order.status} size="medium" />}
      >
        <OrderInfoGrid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <OrderInfoField
              label="Created"
              value={formatDateTime(order.createdAt)}
            />
          </Grid>
          {slot && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <OrderInfoField
                label="Scheduled Time"
                value={`${formatDateTime(slot.startTime)} - ${formatDateTime(
                  slot.endTime
                )}`}
              />
            </Grid>
          )}
          <Grid size={{ xs: 12, sm: 6 }}>
            <OrderInfoField
              label="Price"
              value={`$${offer.pricePerHour.toFixed(2)}/hr`}
            />
          </Grid>
          {order.completedDate && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <OrderInfoField
                label="Completed"
                value={formatDateTime(order.completedDate)}
              />
            </Grid>
          )}
          {order.notes && (
            <Grid size={{ xs: 12 }}>
              <OrderInfoField label="Notes" value={order.notes} />
            </Grid>
          )}
        </OrderInfoGrid>
      </InfoCard>

      <Box sx={{ mt: 3 }}>
        <InfoCard title="Actions">
          <OrderActions
            status={order.status}
            isBuyer={isBuyer}
            isProvider={isProvider}
            onStart={handleStartOrder}
            onComplete={handleCompleteOrder}
            onCancel={handleCancelOrder}
            onReview={() => setReviewDialogOpen(true)}
            loading={submitting}
          />
        </InfoCard>
      </Box>

      <ReviewModal
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        rating={reviewFormik.values.rating}
        comment={reviewFormik.values.comment}
        onRatingChange={(value) => reviewFormik.setFieldValue("rating", value)}
        onCommentChange={(comment) =>
          reviewFormik.setFieldValue("comment", comment)
        }
        onSubmit={() => reviewFormik.handleSubmit()}
        errors={{
          comment: reviewFormik.touched.comment
            ? reviewFormik.errors.comment
            : undefined,
        }}
        loading={submitting}
      />
    </Box>
  );
};
