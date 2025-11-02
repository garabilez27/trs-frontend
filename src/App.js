import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import MainLayout from './layouts/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Product/Products';
import AddProduct from './pages/Product/Add';
import EditProduct from './pages/Product/Edit';
import { isLoggedIn } from './utils/auth';

function PrivateRoute({ children }) {
  return isLoggedIn() ? children : <Navigate to="/" />;
}

function PublicRoute({ children }) {
  return isLoggedIn() ? <Navigate to="/dashboard" /> : children;
}

function Wrapper() {
  // This wrapper applies the layout and auth check once
  return (
    <PrivateRoute>
      <MainLayout>
        <Outlet /> {/* Nested route content will be rendered here */}
      </MainLayout>
    </PrivateRoute>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><MainLayout><Dashboard /></MainLayout></PrivateRoute>} />
        <Route path="/products" element={<Wrapper />}>
          <Route index element={<Products />} />            {/* /products */}
          <Route path="add" element={<AddProduct />} />     {/* /products/add */}
          <Route path=":id/edit" element={<EditProduct />} /> {/* /products/:id/edit */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
