import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import HomePage from 'pages/HomePage';

const Question = lazy(() => import('pages/Question'));

export default function AppRouter() {
  const location = useLocation();

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<Question />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
