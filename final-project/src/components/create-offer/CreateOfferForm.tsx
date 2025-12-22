import { memo, useCallback } from 'react';
import { Box, TextField } from '@mui/material';
import { FastField, Form, Formik, type FieldProps } from 'formik';
import * as Yup from 'yup';
import { offerService } from '../../services/offerService';
import { CategorySelect, FormActions, PriceInput } from '../forms';
import type { CategoryDto } from '../../types';

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
  pricePerHour: Yup.number().required('Price is required').min(0.01, 'Price must be greater than 0'),
  categoryIds: Yup.array().min(1, 'Select at least one category'),
});

interface CreateOfferFormValues {
  title: string;
  description: string;
  pricePerHour: number;
  categoryIds: string[];
}

interface CreateOfferFormProps {
  categories: CategoryDto[];
  onCreated: (offerId: string) => void;
  onCancel: () => void;
  onError: (message: string) => void;
}

const CreateOfferForm = memo(({ categories, onCreated, onCancel, onError }: CreateOfferFormProps) => {
  const handleSubmit = useCallback(
    async (values: CreateOfferFormValues, helpers: { setSubmitting: (v: boolean) => void }) => {
      try {
        const offer = await offerService.create(values);
        onCreated(offer.id);
      } catch {
        onError('Failed to create offer');
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [onCreated, onError]
  );

  return (
    <Formik<CreateOfferFormValues>
      initialValues={{
        title: '',
        description: '',
        pricePerHour: 0,
        categoryIds: [],
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue, setFieldTouched }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FastField name="title">
              {({ field, meta }: FieldProps<string, CreateOfferFormValues>) => (
                <TextField
                  fullWidth
                  label="Title"
                  placeholder="e.g., Professional Web Development"
                  {...field}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched ? meta.error : undefined}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              )}
            </FastField>

            <FastField name="description">
              {({ field, meta }: FieldProps<string, CreateOfferFormValues>) => (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  placeholder="Describe your service in detail..."
                  {...field}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched ? meta.error : undefined}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />
              )}
            </FastField>

            <FastField name="pricePerHour">
              {({ field, meta }: FieldProps<number, CreateOfferFormValues>) => (
                <PriceInput
                  value={field.value}
                  onChange={(value) => setFieldValue('pricePerHour', value)}
                  onBlur={() => setFieldTouched('pricePerHour', true)}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched ? meta.error : undefined}
                  label="Price per Hour"
                />
              )}
            </FastField>

            <FastField name="categoryIds">
              {({ field, meta }: FieldProps<string[], CreateOfferFormValues>) => (
                <CategorySelect
                  categories={categories}
                  selectedIds={field.value}
                  onChange={(ids) => setFieldValue('categoryIds', ids)}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={
                    meta.touched && typeof meta.error === 'string' ? meta.error : undefined
                  }
                />
              )}
            </FastField>

            <FormActions
              submitLabel="Create Offer"
              cancelLabel="Cancel"
              onCancel={onCancel}
              loading={isSubmitting}
            />
          </Box>
        </Form>
      )}
    </Formik>
  );
});

export default CreateOfferForm;
