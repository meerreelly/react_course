import AuthModal from './AuthModal';
import { useAuthModalStore } from '../../state/authModalStore';

const AuthModalProvider = () => {
  const { isOpen, mode, close, switchMode } = useAuthModalStore();
  const modalMode = mode === 'signin' ? 'sign-in' : 'sign-up';

  return (
    <AuthModal
      open={isOpen}
      onClose={close}
      mode={modalMode}
      onSwitchMode={switchMode}
    />
  );
};

export default AuthModalProvider;
