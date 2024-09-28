import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Authors from './pages/Authors/Authors';
import Books from './pages/Books/Books';
import Categories from './pages/Categories/Categories';
import Publishers from './pages/Publishers/Publishers';
import Borrowings from './pages/Borrowings/Borrowings';
import EditBorrowing from './pages/Borrowings/EditBorrowing';
import EditBook from './pages/Books/EditBook';
import EditAuthor from './pages/Authors/EditAuthor';
import EditCategory from './pages/Categories/EditCategory';
import EditPublisher from './pages/Publishers/EditPublisher';
import CreateBook from './pages/Books/CreateBook';
import CreateAuthor from './pages/Authors/CreateAuthor';
import CreateCategory from './pages/Categories/CreateCategory';
import CreatePublisher from './pages/Publishers/CreatePublisher';
import CreateBorrowing from './pages/Borrowings/CreateBorrowing';


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

        <Route path={"/books/:id"} element={<EditBook />} />
        <Route path={"/authors/:id"} element={<EditAuthor />} />
        <Route path={"/categories/:id"} element={<EditCategory />} />
        <Route path={"/publishers/:id"} element={<EditPublisher />} />
        <Route path={"/borrowings/:id"} element={<EditBorrowing />} />

        <Route path={"/books/new"} element={<CreateBook />} />
        <Route path={"/authors/new"} element={<CreateAuthor />} />
        <Route path={"/categories/new"} element={<CreateCategory />} />
        <Route path={"/publishers/new"} element={<CreatePublisher />} />
        <Route path={"/borrowings/new"} element={<CreateBorrowing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
