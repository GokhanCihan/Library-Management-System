import './App.css'
import Main from './layouts/Main'
import Authors from './pages/Authors'

function App() {

  return (
    <>
      <Main children={<Authors />}/>
    </>
  )
}

export default App
