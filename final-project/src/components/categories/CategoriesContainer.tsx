import { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Add, Category } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { categoryService } from '../../services/categoryService';
import { useAuthStore } from '../../state/authStore';
import { Loading, ErrorMessage, PageHeader, InfoCard, AlertMessage } from '../common';
import { CategoriesGrid, CategoryDialog } from '../categories';
import type { CategoryDto } from '../../types';

const validationSchema = Yup.object({
  name: Yup.string().required('Category name is required').min(2, 'Name must be at least 2 characters'),
});

export const CategoriesContainer = () => {
  const { isAdmin } = useAuthStore();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryDto | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAll();
      setCategories(data);
    } catch {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setSubmitting(true);
      try {
        if (editingCategory) {
          await categoryService.update(editingCategory.id, values);
          setSuccess('Category updated successfully');
        } else {
          await categoryService.create(values);
          setSuccess('Category created successfully');
        }
        setDialogOpen(false);
        setEditingCategory(null);
        formik.resetForm();
        fetchCategories();
      } catch {
        setError('Failed to save category');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenDialog = (category?: CategoryDto) => {
    if (category) {
      setEditingCategory(category);
      formik.setValues({ name: category.name });
    } else {
      setEditingCategory(null);
      formik.resetForm();
    }
    setDialogOpen(true);
  };

  const handleDeleteCategory = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await categoryService.delete(id);
        setSuccess('Category deleted successfully');
        fetchCategories();
      } catch {
        setError('Failed to delete category');
      }
    }
  };

  if (loading) return <Loading />;
  if (error && categories.length === 0) return <ErrorMessage message={error} />;

  return (
    <Box>
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
        title="Categories"
        subtitle="Browse and manage service categories"
        icon={<Category sx={{ fontSize: 32 }} />}
        action={
          isAdmin && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              sx={{
                background: (theme) =>
                  `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              }}
            >
              Add Category
            </Button>
          )
        }
      />

      {categories.length === 0 ? (
        <InfoCard title="No Categories">
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No categories yet
            </Typography>
            <Typography color="text.secondary">
              Categories will appear here once created
            </Typography>
          </Box>
        </InfoCard>
      ) : (
        <CategoriesGrid
          categories={categories}
          isAdmin={isAdmin}
          onEdit={handleOpenDialog}
          onDelete={handleDeleteCategory}
        />
      )}

      <CategoryDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        isEditing={!!editingCategory}
        name={formik.values.name}
        onNameChange={formik.handleChange}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        error={formik.errors.name}
        touched={formik.touched.name}
        loading={submitting}
      />
    </Box>
  );
};
