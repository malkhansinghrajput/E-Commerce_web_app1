import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 
import Index from "../Screens/Index.js"
import ProductDetails from '../Screens/ProductDetails.js'
import Login from '../Screens/Login.js'
import Logout from '../Screens/Logout.js'
import Customer from '../Screens/Customer.js'
import Admin from '../Screens/Admin.js'
import Register from '../Screens/Register.js'
import ForgotPassword from '../Screens/ForgotPassword.js'
import { SendEmail } from '../Screens/SendEmail.js'
import Cart from '../Screens/Cart.js'
import CustomerProductDetails from '../Screens/CustomerProductDetails.js'
import MakePayment from '../Screens/MakePayment.js'
import PaymentSuccess from '../Screens/PaymentSuccess.js'
import ChangePassword from '../Screens/ChangePassword.js'
import EditProfile from '../Screens/EditProfile.js'
import MyOrder from '../Screens/MyOrder.js'
import ViewProfile from '../Screens/ViewProfile.js'
import  AddProduct from '../Screens/AddProduct.js'
import  EditProduct  from '../Screens/EditProduct.js'
import { ViewProduct } from '../Screens/ViewProduct.js'
import { ViewOrder } from '../Screens/ViewOrder.js'
import { ManageCustomer } from '../Screens/ManageCustomer.js'

 const RouterDemo = () => {
  return (
    <div>
        <Router>
            <Routes>
                <Route path='/' element={<Index />}></Route>
                
                <Route path='/login' element={<Login/>}></Route>

                <Route path='/logout' element={<Logout/>}></Route>

                <Route path='/forgotpassword'  element={<ForgotPassword />}></Route>

                <Route path="/register"  element={<Register />}></Route>

                <Route path='/sendemail'  element={<SendEmail />}></Route>
           
                <Route path='/productdetails/:pid' element={< ProductDetails />}></Route>

                {/* ============= */}

                <Route path= '/customer' element={<Customer/>}></Route>

                <Route path='/customer/cart'  element={<Cart />}></Route>

                <Route path='/customer/profile' element={< ViewProfile/>}></Route>

                <Route path='/customer/orders' element={< MyOrder/>}></Route>

                <Route path='/customer/changepassword' element={< ChangePassword />}></Route>

                <Route path='/customer/editprofile' element={ < EditProfile />}></Route>

                 <Route path='/customer/makepayment' element={<MakePayment/>}></Route>

                 <Route path='/customer/paymentsuccess' element={<PaymentSuccess/>}></Route>

                <Route path='/customer/productdetails/:pid'  element={<CustomerProductDetails/>}></Route>

                {/* ============= */}

                <Route path='/admin'  element={<Admin/>}></Route>

                <Route path='/admin/addproduct' element={<AddProduct/>}></Route>

                <Route path='/admin/viewproduct' element={<ViewProduct/>}></Route>

                <Route path='/admin/editproduct'  element={< EditProduct/>}></Route>

                <Route path='/admin/managecustomer' element={<ManageCustomer/>}></Route>

                <Route path='/admin/vieworders' element={<ViewOrder/>}></Route>

            </Routes>
        </Router>
    </div>
  )
}
export default RouterDemo