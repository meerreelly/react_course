import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import { PrivateRoute } from '../common';
import {
  Home,
  OfferDetails,
  CreateOffer,
  SlotsManagement,
  Deposit,
  Dashboard,
  OrderPage,
  Payments,
  UserProfile,
  Categories,
  NotFound,
} from '../../pages';
import { AuthProvider } from './AuthProvider';

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<OfferDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/user/:id" element={<UserProfile />} />

        <Route
          path="/offers/create"
          element={
            <PrivateRoute>
              <CreateOffer />
            </PrivateRoute>
          }
        />
        <Route
          path="/offers/:id/slots"
          element={
            <PrivateRoute>
              <SlotsManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="/deposit"
          element={
            <PrivateRoute>
              <Deposit />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <PrivateRoute>
              <OrderPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/payments"
          element={
            <PrivateRoute>
              <Payments />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
