import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { selectAuthUser, selectIsAuthInitialized } from '@fintrack-pro/features/auth';
import { useAppSelector } from '@fintrack-pro/app/store';
import { ErrorBoundary } from './components/ErrorBoundary';
import { TopLoadingBar } from './components/TopLoadingBar';
// EAGER LOAD
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { useIsFetching } from '@tanstack/react-query';
// LAZY LOAD
const HomePage = lazy(() => import('./pages/HomePage'));
const QueryTest = lazy(() => import('./pages/QueryTest'));
const StoreTest = lazy(() => import('./pages/StoreTest'));

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useAppSelector(selectAuthUser);
  const isInitialized = useAppSelector(selectIsAuthInitialized);

  if (!isInitialized) return <TopLoadingBar />;
  if (!user && isInitialized) return <Navigate to='/login' replace />;
  return <>{children}</>;
};

function App() {
  const isFetching = useIsFetching();

  return (
    <ErrorBoundary>
      {!!isFetching && <TopLoadingBar />}
      <Suspense fallback={<TopLoadingBar />}>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path='/test-store'
            element={
              <ProtectedRoute>
                <StoreTest />
              </ProtectedRoute>
            }
          />
          <Route
            path='/query-test'
            element={
              <ProtectedRoute>
                <QueryTest />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
