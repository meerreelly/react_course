import { memo, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  useTheme,
} from '@mui/material';
import type { OfferDto, CategoryDto } from '../../types';

interface OfferCardProps {
  offer: OfferDto;
  categories: CategoryDto[];
}

const OfferCard = memo(({ offer, categories }: OfferCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const categoryNames = useMemo(() => {
    return offer.categoryIds
      .map((id) => categories.find((c) => c.id === id)?.name)
      .filter(Boolean) as string[];
  }, [offer.categoryIds, categories]);

  const handleClick = useCallback(() => {
    navigate(`/offer/${offer.id}`);
  }, [navigate, offer.id]);

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'light'
            ? '0 12px 24px rgba(59, 130, 246, 0.15)'
            : '0 12px 24px rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Chip
              label={offer.status}
              size="small"
              color={offer.status === 'Active' ? 'success' : 'default'}
              sx={{ fontWeight: 500 }}
            />
          </Box>

          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              mb: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {offer.title}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 2,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1,
            }}
          >
            {offer.description}
          </Typography>

          {categoryNames.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              {categoryNames.slice(0, 3).map((name, index) => (
                <Chip
                  key={index}
                  label={name}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              ))}
              {categoryNames.length > 3 && (
                <Chip
                  label={`+${categoryNames.length - 3}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: '0.75rem' }}
                />
              )}
            </Box>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              pt: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              mt: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  fontSize: '0.75rem',
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                }}
              >
                {offer.providerId?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              <Typography variant="caption" color="text.secondary">
                {new Date(offer.createdOn).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="primary"
              fontWeight={700}
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ${offer.pricePerHour.toFixed(2)}/hr
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});

OfferCard.displayName = 'OfferCard';

export default OfferCard;
