import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/Signup';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/signup' element={ <SignupPage /> } />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
