import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminPage from '../pages/adminPage'
import LoginPage from '../pages/loginPage'
import './App.css'
import Testing from '../pages/testing';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
    <Toaster position=''top-right/>
    <Routes path="/*">
<Route path="/admin/*" element={<AdminPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/testing" element={<Testing />} />
<Route path="/" element={<h1>Home</h1>}/>
<Route path="/*" element={<h1>404 not found</h1>}/>

    </Routes>
    </BrowserRouter>
  );
}

export default App
