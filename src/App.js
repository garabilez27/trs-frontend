import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import PrivateRoute from './components/PrivateRoute';
import { removeToken, isLoggedIn } from './utils/auth';

function App() {
  const logout = () => {
    removeToken();
    window.location.href = '/';
  };

  return (
    <BrowserRouter>

        {/* {isLoggedIn() ? (
          <>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            
          </>
        )} */}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={
          <PrivateRoute><Products /></PrivateRoute>
        } />

        <Route path="/products/add" element={
          <PrivateRoute><ProductForm /></PrivateRoute>
        } />

        <Route path="/products/edit/:id" element={
          <PrivateRoute><ProductForm /></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
