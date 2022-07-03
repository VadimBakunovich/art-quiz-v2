import { BrowserRouter } from 'react-router-dom';
import AppRouter from 'router';
import AppModal from 'components/AppModal';

export const App = () => (
  <BrowserRouter>
    <AppRouter />
    <AppModal />
  </BrowserRouter>
);
