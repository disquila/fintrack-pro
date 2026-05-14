import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { HomePage, QueryTest, StoreTest } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/test-store' element={<StoreTest />} />
        <Route path='/query-test' element={<QueryTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
