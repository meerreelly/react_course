import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { offerService } from '../../services/offerService';
import { slotService } from '../../services/slotService';
import type { SlotDto } from '../../types';
import SlotDialog from './SlotDialog';

const validationSchema = Yup.object({
  startTime: Yup.string().required('Start time is required'),
  endTime: Yup.string().required('End time is required'),
});

interface SlotDialogContainerProps {
  open: boolean;
  offerId: string;
  editingSlot: SlotDto | null;
  onClose: () => void;
  onSaved: () => Promise<void>;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

const SlotDialogContainer = memo(
  ({ open, offerId, editingSlot, onClose, onSaved, onSuccess, onError }: SlotDialogContainerProps) => {
    const [submitting, setSubmitting] = useState(false);

    const formik = useFormik({
      initialValues: {
        startTime: '',
        endTime: '',
      },
      validationSchema,
      onSubmit: async (values, helpers) => {
        setSubmitting(true);
        try {
          if (editingSlot) {
            await slotService.update(editingSlot.id, {
              startTime: new Date(values.startTime).toISOString(),
              endTime: new Date(values.endTime).toISOString(),
            });
            onSuccess('Slot updated successfully');
          } else {
            await offerService.createSlot(offerId, {
              startTime: new Date(values.startTime).toISOString(),
              endTime: new Date(values.endTime).toISOString(),
            });
            onSuccess('Slot created successfully');
          }

          helpers.resetForm();
          onClose();
          await onSaved();
        } catch {
          onError('Failed to save slot');
        } finally {
          setSubmitting(false);
        }
      },
    });

    const { resetForm, setValues, handleChange, handleSubmit, values, errors, touched } = formik;

    const dialogErrors = useMemo(
      () => ({
        startTime: errors.startTime,
        endTime: errors.endTime,
      }),
      [errors.endTime, errors.startTime]
    );

    const dialogTouched = useMemo(
      () => ({
        startTime: touched.startTime,
        endTime: touched.endTime,
      }),
      [touched.endTime, touched.startTime]
    );

    const handleStartTimeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
      },
      [handleChange]
    );

    const handleEndTimeChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e);
      },
      [handleChange]
    );

    useEffect(() => {
      if (!open) return;

      if (editingSlot) {
        setValues({
          startTime: editingSlot.startTime.slice(0, 16),
          endTime: editingSlot.endTime.slice(0, 16),
        });
      } else {
        resetForm();
      }
    }, [editingSlot, open, resetForm, setValues]);

    const handleDialogSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
      },
      [handleSubmit]
    );

    return (
      <SlotDialog
        open={open}
        onClose={onClose}
        isEditing={!!editingSlot}
        startTime={values.startTime}
        endTime={values.endTime}
        onStartTimeChange={handleStartTimeChange}
        onEndTimeChange={handleEndTimeChange}
        onSubmit={handleDialogSubmit}
        errors={dialogErrors}
        touched={dialogTouched}
        loading={submitting}
      />
    );
  }
);

export default SlotDialogContainer;
