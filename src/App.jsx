import './App.css';
import Main from './layouts/Main';
import Authors from './pages/Authors/Authors';
import Books from './pages/Books/Books';
import Categories from './pages/Categories/Categories';
import Publishers from './pages/Publishers/Publishers';
import Borrowings from './pages/Borrowings/Borrowings';

function App() {

  return (
    <>
      <Authors />
      <Publishers />
      <Categories />
      <Books />
      <Borrowings />
    </>
  )
}

export default App
