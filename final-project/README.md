# ServiceHub (Final Project)

React + TypeScript (Vite) frontend for a service marketplace.

## Tech Stack
- React + TypeScript + Vite
- UI: MUI (`@mui/material`) + Tailwind utility classes
- Routing: `react-router-dom`
- Auth: Clerk (`@clerk/clerk-react`)
- State: Zustand
- Forms/validation: Formik + Yup
- HTTP: Axios (+ interceptors + toasts)

## Getting Started

### Prerequisites
- Node.js (LTS recommended)

### Install
```powershell
npm install
```

### Environment Variables
Create `.env` in the project root:

```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_BASE_URL=http://localhost:5000
```

### Run (dev)
```powershell
npm run dev
```

### Build
```powershell
npm run build
```

## Architecture Decisions

### 1) Routing + UI Shell
- Entry: `src/main.tsx` → `src/App.tsx`.
- Routes are defined in `src/components/providers/AppRoutes.tsx`.
- Common shell is `src/layouts/MainLayout.tsx`:
	- Always renders `Header` and `ActiveOrderBar`.
	- Renders the current page via `<Outlet />`.

### 2) Auth (Clerk) + Route Guard
- Root auth provider: `ClerkProvider` in `src/App.tsx`.
- `AuthProvider` (`src/components/providers/AuthProvider.tsx`) runs `useClerkAuth()` on app start to:
	- fetch Clerk token (`getToken()`)
	- store token + current user in `authStore`
- Protected routes are wrapped with `PrivateRoute` (`src/components/common/PrivateRoute.tsx`).
	- It checks both Clerk state (`isLoaded`, `isSignedIn`) and local `authStore.isAuthenticated`.
	- Optional `requireAdmin` gate uses `authStore.isAdmin`.

### 3) State Management (Zustand)
- `src/state/authStore.ts`: token/user/auth flags (also balance update)
- `src/state/userStore.ts`: dashboard + activeOrders (used by header & active order bar)
- `src/state/offerStore.ts`: offers, categories, filters, sorting, pagination
- `src/state/themeStore.ts`: light/dark theme persisted via `zustand/middleware`

### 4) Data Access Layer (Services)
- `src/services/api.ts` is an Axios instance:
	- request interceptor injects `Authorization: Bearer <token>` from `authStore`
	- response interceptor shows toast errors and clears auth on `401`
- Feature services in `src/services/*` provide typed API methods (offers, orders, slots, users, categories, reviews).

### 5) Containers vs Presentational Components
- Pages in `src/pages/*` are thin wrappers that render feature containers.
- “Containers” (e.g. `*Container.tsx`) own:
	- data fetching, mutations
	- loading/error/success state
	- navigation
- Presentational components render UI (grids, cards, dialogs, lists).

### 6) Theming + Notifications
- `ThemedApp` (`src/components/providers/ThemedApp.tsx`) provides:
	- MUI theme from `createAppTheme(mode)` (`src/styles/theme.ts`)
	- global `ToastContainer` (react-hot-toast)

## Component (UI) Tree

### High-level tree (ASCII)
```text
src/main.tsx
└─ <App />  (src/App.tsx)
	 └─ <ClerkProvider>
			└─ <ThemedApp> (src/components/providers/ThemedApp.tsx)
				 ├─ <ThemeProvider> + <CssBaseline />
				 ├─ <AppRoutes> (src/components/providers/AppRoutes.tsx)
				 │  └─ <BrowserRouter>
				 │     └─ <AuthProvider> (runs useClerkAuth)
				 │        └─ <Routes>
				 │           └─ <Route element={<MainLayout />}> (src/layouts/MainLayout.tsx)
				 │              ├─ <Header /> (src/components/layout/Header.tsx)
				 │              ├─ <ActiveOrderBar /> (src/components/layout/ActiveOrderBar.tsx)
				 │              └─ <Outlet />
				 │                 ├─ /                → <Home /> → <HomeContainer />
				 │                 ├─ /offer/:id       → <OfferDetails /> → <OfferDetailsContainer />
				 │                 ├─ /categories      → <Categories /> → <CategoriesContainer />
				 │                 ├─ /user/:id        → <UserProfile /> → <UserProfileContainer />
				 │                 ├─ (PrivateRoute)
				 │                 │  ├─ /offers/create     → <CreateOffer /> → <CreateOfferContainer />
				 │                 │  ├─ /offers/:id/slots  → <SlotsManagement /> → <SlotsManagementContainer />
				 │                 │  ├─ /deposit          → <Deposit /> → <DepositContainer />
				 │                 │  ├─ /dashboard        → <Dashboard /> → <DashboardContainer />
				 │                 │  ├─ /orders/:id       → <OrderPage /> → <OrderContainer />
				 │                 │  └─ /payments         → <Payments /> → <PaymentsContainer />
				 │                 └─ *                → <NotFound />
				 └─ <ToastContainer /> (src/components/common/ToastContainer.tsx)
```

### High-level diagram (Mermaid)
```mermaid
flowchart TD
	A[src/main.tsx] --> B[App]
	B --> C[ClerkProvider]
	C --> D[ThemedApp]
	D --> E[ThemeProvider + CssBaseline]
	D --> F[AppRoutes]
	D --> T[ToastContainer]

	F --> G[BrowserRouter]
	G --> H[AuthProvider (useClerkAuth)]
	H --> I[Routes]
	I --> J[MainLayout]
	J --> K[Header]
	J --> L[ActiveOrderBar]
	J --> M[Outlet]

	M --> R1[/ (Home → HomeContainer)]
	M --> R2[/offer/:id (OfferDetails → OfferDetailsContainer)]
	M --> R3[/categories (Categories → CategoriesContainer)]
	M --> R4[/user/:id (UserProfile → UserProfileContainer)]
	M --> PR[PrivateRoute]
	M --> RN[* (NotFound)]

	PR --> P1[/offers/create (CreateOfferContainer)]
	PR --> P2[/offers/:id/slots (SlotsManagementContainer)]
	PR --> P3[/deposit (DepositContainer)]
	PR --> P4[/dashboard (DashboardContainer)]
	PR --> P5[/orders/:id (OrderContainer)]
	PR --> P6[/payments (PaymentsContainer)]
```

### Full visual diagram (Mermaid)
```mermaid
flowchart TB
	%% This diagram lists all custom pages/components (not MUI primitives).

	%% --- Bootstrap / Providers ---
	MAIN[src/main.tsx] --> APP[App (src/App.tsx)]
	APP --> CLERK[ClerkProvider]
	CLERK --> THEMED[ThemedApp]
	THEMED --> THEME[ThemeProvider + CssBaseline]
	THEMED --> TOAST[ToastContainer]
	THEMED --> AR[AppRoutes]

	%% --- Router / Shell ---
	AR --> BR[BrowserRouter]
	BR --> AUTH_P[AuthProvider (useClerkAuth)]
	AUTH_P --> RRS[Routes]
	RRS --> LAYOUT[MainLayout]
	LAYOUT --> HDR[Header]
	LAYOUT --> AOB[ActiveOrderBar]
	LAYOUT --> OUT[Outlet]

	%% --- Common components used across pages ---
	subgraph COMMON[Common UI]
		C_Loading[Loading]
		C_Error[ErrorMessage]
		C_PageHeader[PageHeader]
		C_InfoCard[InfoCard]
		C_Alert[AlertMessage]
		C_Modal[Modal]
		C_Private[PrivateRoute]
	end

	%% --- Public Routes ---
	OUT --> HOME_R["/ (Home)"]
	OUT --> OFFER_R["/offer/:id (Offer Details)"]
	OUT --> CATS_R["/categories"]
	OUT --> USER_R["/user/:id"]
	OUT --> NF_R["* (NotFound)"]
	OUT --> C_Private

	%% Home
	HOME_R --> HOME_P[pages/Home.tsx]
	HOME_P --> HOME_C[HomeContainer]
	HOME_C --> HOME_H[HomeHeader]
	HOME_C --> HOME_F[HomeFilters]
	HOME_C --> HOME_CNT[HomeContent]
	HOME_F --> HF_Search[SearchTermInput]
	HOME_F --> HF_Cat[CategoryFilter]
	HOME_F --> HF_SBy[SortByFilter]
	HOME_F --> HF_SOrd[SortOrderFilter]
	HOME_CNT --> HC_Empty[HomeEmptyState]
	HOME_CNT --> HC_Grid[HomeOffersGrid]
	HOME_CNT --> HC_Pag[HomePagination]
	HC_Grid --> OFF_Grid[OffersGrid]
	OFF_Grid --> OFF_Card[OfferCard]
	OD_Slots --> OFF_SlotCard[SlotCard]
	HC_Empty --> OFF_Empty[EmptyState]

	%% Offers components (library)
	OFF_SearchFilters[SearchFilters]
	HOME_C -.-> C_Loading
	HOME_C -.-> C_Error

	%% Offer Details
	OFFER_R --> OD_P[pages/OfferDetails.tsx]
	OD_P --> OD_C[OfferDetailsContainer]
	OD_C --> OD_Header[OfferHeader]
	OD_C --> OD_Cats[CategoryChips]
	OD_C --> OD_Slots[SlotsGrid]
	OD_C --> OD_Reviews[ReviewList]
	OD_C --> OD_Book[BookingModal]
	OD_C -.-> C_Loading
	OD_C -.-> C_Error
	OD_C -.-> C_InfoCard
	OD_C -.-> C_Alert

	%% Categories
	CATS_R --> CAT_P[pages/Categories.tsx]
	CAT_P --> CAT_C[CategoriesContainer]
	CAT_C --> CAT_Grid[CategoriesGrid]
	CAT_Grid --> CAT_Card[CategoryCard]
	CAT_C --> CAT_Dlg[CategoryDialog]
	CAT_C -.-> C_Loading
	CAT_C -.-> C_Error
	CAT_C -.-> C_PageHeader
	CAT_C -.-> C_InfoCard
	CAT_C -.-> C_Alert

	%% User Profile
	USER_R --> UP_P[pages/UserProfile.tsx]
	UP_P --> UP_C[UserProfileContainer]
	UP_C --> UP_Header[ProfileHeader]
	UP_C --> UP_Edit[ProfileEditForm]
	UP_C --> UP_Offers[ProfileOffersList]
	UP_C --> UP_Reviews[ProfileReviewsList]
	UP_C -.-> C_Loading
	UP_C -.-> C_Error
	UP_C -.-> C_PageHeader
	UP_C -.-> C_InfoCard
	UP_C -.-> C_Alert

	%% NotFound
	NF_R --> NF_P[pages/NotFound.tsx]

	%% --- Private Routes (guarded) ---
	C_Private --> PR_Create["/offers/create"]
	C_Private --> PR_Slots["/offers/:id/slots"]
	C_Private --> PR_Dep["/deposit"]
	C_Private --> PR_Dash["/dashboard"]
	C_Private --> PR_Order["/orders/:id"]
	C_Private --> PR_Pay["/payments"]

	%% Create Offer
	PR_Create --> CO_P[pages/CreateOffer.tsx]
	CO_P --> CO_C[CreateOfferContainer]
	CO_C --> CO_Form[CreateOfferForm]
	CO_Form --> F_CatSel[CategorySelect]
	CO_Form --> F_Price[PriceInput]
	CO_Form --> F_Actions[FormActions]
	CO_C -.-> C_Loading
	CO_C -.-> C_Error
	CO_C -.-> C_PageHeader
	CO_C -.-> C_InfoCard
	CO_C -.-> C_Alert

	%% Slots Management
	PR_Slots --> SM_P[pages/SlotsManagement.tsx]
	SM_P --> SM_C[SlotsManagementContainer]
	SM_C --> SM_Grid[SlotsManageGrid]
	SM_Grid --> SM_Card[SlotManageCard]
	SM_C --> SM_DlgC[SlotDialogContainer]
	SM_DlgC --> SM_Dlg[SlotDialog]
	SM_C -.-> C_Loading
	SM_C -.-> C_Error
	SM_C -.-> C_PageHeader
	SM_C -.-> C_InfoCard
	SM_C -.-> C_Alert

	%% Deposit
	PR_Dep --> DEP_P[pages/Deposit.tsx]
	DEP_P --> DEP_C[DepositContainer]

	%% Dashboard
	PR_Dash --> DB_P[pages/Dashboard.tsx]
	DB_P --> DB_C[DashboardContainer]
	DB_C --> DB_Stat[StatCard]
	DB_C --> DB_AOB[ActiveOrdersBanner]
	DB_C --> DB_Sec[DashboardSection]
	DB_C --> DB_Offers[DashboardOffersList]
	DB_Offers --> DB_OfferItem[OfferItem]
	DB_C --> DB_Orders[DashboardOrdersList]
	DB_Orders --> DB_OrderItem[OrderItem]
	DB_C --> DB_Reviews[DashboardReviewsGrid]
	DB_Reviews --> DB_ReviewItem[ReviewItem]
	DB_C --> DB_Tx[TransactionsTable]
	DB_C -.-> C_Loading
	DB_C -.-> C_Error

	%% Order Details
	PR_Order --> OP_P[pages/OrderPage.tsx]
	OP_P --> OR_C[OrderContainer]
	OR_C --> OR_Badge[OrderStatusBadge]
	OR_C --> OR_Grid[OrderInfoGrid]
	OR_Grid --> OR_Field[OrderInfoField]
	OR_C --> OR_Actions[OrderActions]
	OR_C --> OR_Review[ReviewModal]
	OR_C -.-> C_Loading
	OR_C -.-> C_Error
	OR_C -.-> C_PageHeader
	OR_C -.-> C_InfoCard
	OR_C -.-> C_Alert

	%% Payments
	PR_Pay --> PAY_P[pages/Payments.tsx]
	PAY_P --> PAY_C[PaymentsContainer]
	PAY_C --> PAY_Tbl[PaymentsTable]
	PAY_Tbl --> PAY_Row[PaymentRow]
	PAY_Row --> PAY_Type[PaymentTypeBadge]
	PAY_Row --> PAY_Status[PaymentStatusBadge]
	PAY_Row --> PAY_Amount[PaymentAmount]
	PAY_C -.-> C_Loading
	PAY_C -.-> C_Error
	PAY_C -.-> C_PageHeader
	PAY_C -.-> C_InfoCard
	PAY_C -.-> C_Alert

	%% --- Auth UI components available in the codebase ---
	subgraph AUTH_UI[Auth components]
		AuthButton
		AuthModal
		AuthModalProvider
	end
	HDR -.-> AuthButton
```
