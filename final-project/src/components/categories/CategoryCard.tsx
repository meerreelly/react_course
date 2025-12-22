import { Box, Card, CardContent, IconButton, Typography, useTheme } from '@mui/material';
import { Edit, Delete, Category } from '@mui/icons-material';
import type { CategoryDto } from '../../types';

interface CategoryCardProps {
  category: CategoryDto;
  isAdmin: boolean;
  onEdit: (category: CategoryDto) => void;
  onDelete: (id: string) => void;
}

const CategoryCard = ({ category, isAdmin, onEdit, onDelete }: CategoryCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        borderRadius: 3,
        transition: 'all 0.3s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 30px rgba(0,0,0,0.4)'
            : '0 8px 30px rgba(0,0,0,0.12)',
        },
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}20 0%, ${theme.palette.secondary.main}20 100%)`,
            }}
          >
            <Category sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Typography variant="h6" fontWeight={600}>
            {category.name}
          </Typography>
        </Box>

        {isAdmin && (
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={() => onEdit(category)}
              sx={{
                '&:hover': {
                  bgcolor: `${theme.palette.primary.main}20`,
                  color: theme.palette.primary.main,
                },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(category.id)}
              sx={{
                '&:hover': {
                  bgcolor: `${theme.palette.error.main}20`,
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
