import { memo } from 'react';
import { CircularProgress, Box } from '@mui/material';

interface LoadingProps {
  fullScreen?: boolean;
}

const Loading = memo(({ fullScreen = false }: LoadingProps) => {
  if (fullScreen) {
    return (
      <Box className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        <CircularProgress color="primary" size={48} />
      </Box>
    );
  }

  return (
    <Box className="flex items-center justify-center p-8">
      <CircularProgress color="primary" />
    </Box>
  );
});

Loading.displayName = 'Loading';

export default Loading;
