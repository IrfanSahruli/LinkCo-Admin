import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Auth/Login';
import AddProduct from './pages/Product/AddProduct';
import Product from './pages/Product/ProductList';
import RequestWithdraw from './pages/Withdraw/RequestWithdraw';
import UpdateProduct from './pages/Product/[id]/UpdateProduct';
import DetailProduct from './pages/Product/[id]/DetailProduct';
import DetailWithdraw from './pages/Withdraw/[id]/DetailWithdraw';
import OrderList from './pages/Order/OrderList';
import DetailOrder from './pages/Order/[id]/DetailOrder';
import UsersList from './pages/User/UsersList';
import KycUser from './pages/User/Kyc/KycUser';
import DetailKycUser from './pages/User/Kyc/[id]/DetailKycUser';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Login />
              </>
            }
          />
          <Route
            path='/dashboard'
            element={
              <>
                <Dashboard />
              </>
            }
          />
          <Route
            path='/user'
            element={
              <>
                <UsersList />
              </>
            }
          />
          <Route
            path='/kycuser'
            element={
              <>
                <KycUser />
              </>
            }
          />
          <Route
            path='/detailkycuser/:id'
            element={
              <>
                <DetailKycUser />
              </>
            }
          />
          <Route
            path='/order'
            element={
              <>
                <OrderList />
              </>
            }
          />
          <Route
            path='/order/:id'
            element={
              <>
                <DetailOrder />
              </>
            }
          />
          <Route
            path='/requestwithdraw'
            element={
              <>
                <RequestWithdraw />
              </>
            }
          />
          <Route
            path='/requestwithdraw/:id'
            element={
              <>
                <DetailWithdraw />
              </>
            }
          />
          <Route
            path='/product'
            element={
              <>
                <Product />
              </>
            }
          />
          <Route
            path='/detailproduct/:id'
            element={
              <>
                <DetailProduct />
              </>
            }
          />
          <Route
            path='/updateproduct/:id'
            element={
              <>
                <UpdateProduct />
              </>
            }
          />
          <Route
            path='/addproduct'
            element={
              <>
                <AddProduct />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  )
};

export default App;
