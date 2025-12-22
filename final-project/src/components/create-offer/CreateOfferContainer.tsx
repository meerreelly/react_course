import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { Add, Description } from '@mui/icons-material';
import { categoryService } from '../../services/categoryService';
import { Loading, ErrorMessage, PageHeader, InfoCard, AlertMessage } from '../common';
import type { CategoryDto } from '../../types';
import CreateOfferForm from './CreateOfferForm';

export const CreateOfferContainer = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
    fetchCategories();
  }, []);

  const handleClearError = useCallback(() => {
    setError(null);
  }, []);

  const handleCancel = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleCreated = useCallback(
    (offerId: string) => {
      navigate(`/offer/${offerId}`);
    },
    [navigate]
  );

  const headerIcon = useMemo(() => <Add sx={{ fontSize: 32 }} />, []);
  const infoIcon = useMemo(() => <Description />, []);

  if (loading) return <Loading />;
  if (error && categories.length === 0) return <ErrorMessage message={error} />;

  return (
    <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
      <AlertMessage
        open={!!error}
        message={error || ''}
        severity="error"
        onClose={handleClearError}
      />

      <PageHeader
        title="Create New Offer"
        subtitle="Fill in the details to create your service offer"
        icon={headerIcon}
      />

      <InfoCard
        title="Offer Details"
        icon={infoIcon}
        variant="gradient"
      >
        <CreateOfferForm
          categories={categories}
          onCancel={handleCancel}
          onCreated={handleCreated}
          onError={setError}
        />
      </InfoCard>
    </Box>
  );
};
