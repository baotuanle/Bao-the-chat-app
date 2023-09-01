import { useContext, useState } from 'react';
import './App.css';
import Register from './components/register';
import Login from './components/login';
import Home from "./components/home";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import BrowserRouter, Route, and Routes
import { AuthContext } from './context/AuthContext';

function App() {
  
  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
        </Route>
      </Routes>
    </Router>
  );
}


export default App;
