import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import ShoeList from './ShoeList';
import CreateShoeForm from './CreateShoeForm';
import HatForm from './HatForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatList />} />
          <Route path="/shoes" element={<ShoeList />} />
          
          <Route path="/shoes/create" element={<CreateShoeForm />} />

          <Route path="/hats/new" element={<HatForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
