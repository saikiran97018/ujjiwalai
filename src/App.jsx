import { BrowserRouter,Routes,Route } from 'react-router-dom';
import LandingPage from './components/Landing/Landing';
import SignIn from './components/Logins/SignIn';
import SignUp from './components/Logins/SignUp';
import ChangePassword from './components/Logins/ChangePass';
import DocumentBot from './components/bot/DocumentBot';
// import SignUp from './pages/auth/Signup';
// import AdminSignUp from './pages/auth/AdminSignUp';
// import SignIn from './pages/auth/SignIn';
// import AdminSignIn from './pages/auth/AdminSignIn';
// import HomePage from './pages/user/HomePage';
// import ProfilePage from './pages/user/ProfilePage';
// import EventsPage from './pages/admin/Events';
// import AdminDashboard from './pages/admin/Admin';
// import GalleryPage from './pages/admin/Gallery';
// import UserEventsPage from './pages/user/events/eventsDisplay';
// import UserGalleryPage from './pages/user/gallery/membersDisplay';
// import EventRegister from './pages/user/registration/EventRegister';
// import TicketVerification from './pages/admin/ticket';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/landing/:id' element={<LandingPage/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/changepassword' element={<ChangePassword/>}/>
      <Route path='/chat/:id' element={<DocumentBot/>}/>
      
       
      

    </Routes>
    </BrowserRouter>
  );
}

export default App;
