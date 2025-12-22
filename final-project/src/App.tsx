import { ClerkProvider } from '@clerk/clerk-react';
import { ThemedApp, AppRoutes } from './components/providers';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <ThemedApp>
        <AppRoutes />
      </ThemedApp>
    </ClerkProvider>
  );
}

export default App;
