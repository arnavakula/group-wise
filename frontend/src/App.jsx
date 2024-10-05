import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Explore from './components/Explore';
import Profile from './components/Profile';
import StudyGroupForm from './components/StudyGroupForm';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={ <LandingPage /> } />
      <Route path='/signup' element={ <SignupPage /> } />
      <Route path='/login' element={ <LoginPage /> } />
      <Route path='/dashboard' element={ <Dashboard /> }>
        <Route index element={ <Explore /> } />
        <Route path='profile' element={ <Profile /> } />
        <Route path='create' element={< StudyGroupForm />}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
