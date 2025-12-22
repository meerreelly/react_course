import { Box, TextField, Button, InputAdornment, useTheme } from '@mui/material';
import { Person, Email, Save, Cancel } from '@mui/icons-material';

interface ProfileEditFormProps {
  username: string;
  email: string;
  onUsernameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  loading: boolean;
  errors?: {
    username?: string;
    email?: string;
  };
}

const ProfileEditForm = ({
  username,
  email,
  onUsernameChange,
  onEmailChange,
  onSave,
  onCancel,
  loading,
  errors,
}: ProfileEditFormProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
      <TextField
        fullWidth
        label="Username"
        value={username}
        onChange={(e) => onUsernameChange(e.target.value)}
        error={!!errors?.username}
        helperText={errors?.username}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        error={!!errors?.email}
        helperText={errors?.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ),
        }}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={onSave}
          disabled={loading}
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          }}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button
          variant="outlined"
          startIcon={<Cancel />}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileEditForm;
