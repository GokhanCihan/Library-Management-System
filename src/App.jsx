import './App.css'
import Main from './layouts/Main'
import Authors from './pages/Authors/Authors'
import Categories from './pages/Categories/Categories'
import Publishers from './pages/Publishers/Publishers'

function App() {

  return (
    <>
      <Main children={<Categories />}/>
    </>
  )
}

export default App
