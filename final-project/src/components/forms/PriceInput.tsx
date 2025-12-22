import { memo } from 'react';
import { TextField, InputAdornment } from '@mui/material';

interface PriceInputProps {
  value: number;
  onChange: (value: number) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  currency?: string;
}

const PriceInput = memo(({
  value,
  onChange,
  onBlur,
  error,
  helperText,
  label = 'Price per Hour',
  currency = '$',
}: PriceInputProps) => {
  return (
    <TextField
      fullWidth
      type="number"
      label={label}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      InputProps={{
        startAdornment: <InputAdornment position="start">{currency}</InputAdornment>,
      }}
      inputProps={{
        step: 0.01,
        min: 0,
      }}
    />
  );
});

export default PriceInput;
