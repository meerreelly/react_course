import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  useTheme,
} from '@mui/material';

interface CategoryDialogProps {
  open: boolean;
  onClose: () => void;
  isEditing: boolean;
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string;
  touched?: boolean;
  loading: boolean;
}

const CategoryDialog = ({
  open,
  onClose,
  isEditing,
  name,
  onNameChange,
  onSubmit,
  error,
  touched,
  loading,
}: CategoryDialogProps) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle sx={{ fontWeight: 600 }}>
          {isEditing ? 'Edit Category' : 'Create New Category'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Category Name"
            name="name"
            value={name}
            onChange={onNameChange}
            error={touched && Boolean(error)}
            helperText={touched && error}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            }}
          >
            {loading ? 'Saving...' : isEditing ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryDialog;
