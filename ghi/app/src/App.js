import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import HatList from './HatList';
import ShoeList from './ShoeList';
<<<<<<< HEAD
import CreateShoeForm from './CreateShoeForm';
=======
import HatForm from './HatForm';
>>>>>>> dae230be18d8af7b4a305f6b0f6c06b8e5721cee

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/hats" element={<HatList />} />
          <Route path="/shoes" element={<ShoeList />} />
<<<<<<< HEAD
          
          <Route path="/shoes/create" element={<CreateShoeForm />} />

=======
          <Route path="/hats/new" element={<HatForm />} />
>>>>>>> dae230be18d8af7b4a305f6b0f6c06b8e5721cee
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
