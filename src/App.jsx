import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from '../pages/adminPage'
import LoginPage from '../pages/loginPage'
import './App.css'
import Testing from '../pages/testing';
import { Toaster } from 'react-hot-toast';
import RegisterPage from '../pages/client/register';
import HomePage from '../pages/homePage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ResponsiveTesting from '../pages/client/text';
import ForgetPasswords from '../pages/client/forgetPassword';


function App() {
  return (
    <GoogleOAuthProvider clientId='621704032952-chr33g29rviu7mmuhbfd37kp00af4sfv.apps.googleusercontent.com'>
    <BrowserRouter>
    <Toaster position='top-right'/>
    <Routes path="/*">
    <Route path="/admin/*" element={<AdminPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/testing" element={<Testing />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forget" element={<ForgetPasswords />} />
    <Route path="/*" element={<HomePage />}/>
    <Route path="/r" element={<ResponsiveTesting/>}/>
    </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App
