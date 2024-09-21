import './App.css'
import Main from './layouts/Main'
import Authors from './pages/Authors/Authors'
import Publishers from './pages/Publishers/Publishers'

function App() {

  return (
    <>
      <Main children={<Publishers />}/>
    </>
  )
}

export default App
