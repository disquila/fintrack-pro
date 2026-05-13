import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import StoreTest from './pages/StoreTest';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/test-store' element={<StoreTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
