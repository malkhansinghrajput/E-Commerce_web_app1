import React, { useState, useEffect } from 'react'
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'
import { useNavigate, Link } from 'react-router-dom'
import { ORDER_LIST } from '../utility/Constant.js'
import axios from 'axios'


const MyOrder = () => {
    const navigate = useNavigate()
    const [ orderList, setorderList ] = useState([])

    useEffect(() => {
        var c_id = localStorage.getItem('id')
        axios.get(ORDER_LIST + c_id)
        .then((response) => {
            console.log(response)
            setorderList(response.data.orderlist[0].orders)
        })
        .catch((err) => {
            console.log(err)
            alert(err)
        })
    },[])
  return (
    <div>
        < Header/>
        <div id="wrapper" className="container " style={{ marginTop: 60 }}>
        <div className="row">
          <div className="span12">
            <h4 className="title">
              <span className="text">
                <strong>MY</strong>ORDERS
              </span>
            </h4>
            {orderList.length > 0 ? (
              <table
                className="table"
                style={{ fontSize: 20, marginBottom: 100 }}
              >
                <thead>
                  <tr style={{ backgroundColor: "white" }}>
                    <th> Brand</th>
                    <th> Variant</th>
                    <th> Description</th>
                    <th> Image</th>
                    <th> Price</th>
                    <th> Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ backgroundColor: "white" }}>
                  {orderList.map((order, index) => (
                    <tr
                      key={order.product_id}
                      style={{ backgroundColor: "white" }}
                    >
                      <td>{order.product_brand}</td>
                      <td>{order.product_variant_name}</td>
                      <td>{order.product_description}</td>
                      <td>
                        <img
                          src={order.product_imageurl}
                          style={{
                            width: 100,
                            height: 100,
                            objectFit: "contain",
                          }}
                        />
                      </td>
                      <td>&#8377;{order.product_price}</td>
                      <td>{order.product_quantity}</td>
                      <td>
                        &#8377;{order.product_price * order.product_quantity}
                      </td>
                      <td>
                        <Link
                          to={`/customer/productdetails/${order.product_id}`}
                        >
                          DETAILS
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>Your Order List is Empty</h3>
            )}
          </div>
        </div>
      </div>
        < Footer/>
    </div>
  )
}

export default MyOrder
