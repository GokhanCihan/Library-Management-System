import './App.css';
import Authors from './pages/Authors/Authors';
import Books from './pages/Books/Books';
import Categories from './pages/Categories/Categories';
import Publishers from './pages/Publishers/Publishers';
import Borrowings from './pages/Borrowings/Borrowings';
import Home from './pages/Home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/books"} element={<Books />} />
        <Route path={"/authors"} element={<Authors />} />
        <Route path={"/categories"} element={<Categories />} />
        <Route path={"/publishers"} element={<Publishers />} />
        <Route path={"/borrowings"} element={<Borrowings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
