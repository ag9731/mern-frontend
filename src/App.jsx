import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './api/components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './RequireAuth';
// import Dashboard from './api/components/Dashboard';
import Register from './api/components/Register';
import ResetPassword from './api/components/ResetPassword';
import "./index.css";
import ForgotPassword2 from './api/components/ForgotPassword2';
import Dashboard2 from './api/components/Dashboard2';
// import ForgotPassword from './api/components/ForgotPassword';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
       <Routes>
            <Route path='/register' element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/forgot-password" element={<ForgotPassword2/>}/>
            <Route path="/reset-password/:token" element={<ResetPassword/>}/>

            {/* Protected Routes */}
            <Route element={ <RequireAuth/>}>
               <Route path='/dashboard' element={<Dashboard2/>}/>
            </Route>
             
       </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
