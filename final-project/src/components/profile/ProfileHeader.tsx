import { Box, Avatar, Typography, Rating, Button, useTheme } from '@mui/material';
import { Edit } from '@mui/icons-material';
import type { UserDto } from '../../types';

interface ProfileHeaderProps {
  user: UserDto;
  averageRating: number;
  reviewCount: number;
  isOwnProfile: boolean;
  onEdit?: () => void;
}

const ProfileHeader = ({
  user,
  averageRating,
  reviewCount,
  isOwnProfile,
  onEdit,
}: ProfileHeaderProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
      <Avatar
        sx={{
          width: 96,
          height: 96,
          fontSize: '2.5rem',
          fontWeight: 600,
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        }}
      >
        {user.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
      </Avatar>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h5" fontWeight={700}>
              {user.username || 'No username'}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {user.email}
            </Typography>
          </Box>
          {isOwnProfile && onEdit && (
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={onEdit}
              size="small"
            >
              Edit Profile
            </Button>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1.5 }}>
          <Rating value={averageRating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Member since {new Date(user.createdAt).toLocaleDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileHeader;
