import { Toaster } from 'react-hot-toast';

const ToastContainer = () => {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        style: {
          background: '#333',
          color: '#fff',
          borderRadius: '8px',
        },
        success: {
          style: {
            background: '#4caf50',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#4caf50',
          },
        },
        error: {
          style: {
            background: '#f44336',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#f44336',
          },
        },
      }}
    />
  );
};

export default ToastContainer;
