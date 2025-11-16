import React from 'react'
import axios from 'axios'
import Header from '../Components/Header.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer.js';

export default function MakePayment() {

    const location = useLocation();

    const checkoutHandler = async (amount) => {
        try {
            const { data: { key } } = await axios.get("http://www.localhost:5000/customer/getkey")

            const { data: { order } } = await axios.post("http://localhost:5000/customer/checkout", {
                amount
            })

            console.log("Order:", order)

            const options = {
                key,
                amount: order.amount,
                currency: "INR",
                name: "Malkhan Singh Dewda",
                description: "Tutorial of RazorPay",
                image: "https://avatars.githubusercontent.com/u/75520279?v=4",
                order_id: order.id,
                callback_url: "http://localhost:5000/customer/paymentverification",
                prefill: {
                    name: "Malkhan Singh Dewda",
                    email: "rajputmalkhansingh@gmail.com",
                    contact: "6264612198"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            console.log(options)
            console.log("window:",window)
            const razor = new window.Razorpay(options);
            console.log(razor)
            razor.open();

        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div>
            <Header />
            <h1 style={{marginTop:60}}>Make Payment</h1>
            <button className="btn btn-sm btn-success"
                onClick={() => checkoutHandler(location.state)}
            >Pay ₹ {location.state} with Razorpay</button>
            <Footer />
        </div>
    )
}

// import React from 'react'
// import axios from 'axios'
// import Header from '../Components/Header.js'
// import Footer from '../Components/Footer.js'
// import { useLocation, useNavigate } from 'react-router-dom'

// export default function MakePayment() {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const checkoutHandler = async (amount) => {
//         try {
//             // 🔐 Get Razorpay key
//             const { data: { key } } = await axios.get("http://localhost:5000/customer/getkey");

//             // 🧾 Create order
//             const { data: { order } } = await axios.post("http://localhost:5000/customer/checkout", {
//                 amount
//             });

//             console.log("Order:", order);

//             const options = {
//                 key: key, // Razorpay Test Key
//                 amount: order.amount,
//                 currency: "INR",
//                 name: "Malkhan Singh Dewda",
//                 description: "React Razorpay Payment",
//                 // ❌ image line removed to avoid SVG error
//                 order_id: order.id, // Razorpay Order ID
//                 handler: function (response) {
//                     console.log("Payment Success:", response);
//                     // ✅ Redirect to PaymentSuccess page
//                     window.location.href = `/payment-success?reference=${response.razorpay_payment_id}`;
//                 },
//                 prefill: {
//                     name: "Malkhan Singh Dewda",
//                     email: "malkhansinghdewda@gmail.com",
//                     contact: "6264612198"
//                 },
//                 notes: {
//                     address: "Razorpay Corporate Office"
//                 },
//                 theme: {
//                     color: "#121212"
//                 }
//             };

//             const razor = new window.Razorpay(options);
//             razor.open();

//         } catch (error) {
//             console.log("Payment Error:", error);
//             alert("Something went wrong during payment. Please try again.");
//         }
//     }

//     return (
//         <div>
//             <Header />
//             <h1 style={{ marginTop: 60 }}>Make Payment</h1>
//             <button
//                 className="btn btn-sm btn-success"
//                 onClick={() => checkoutHandler(location.state)}
//             >
//                 Pay ₹{location.state} with Razorpay
//             </button>
//             <Footer />
//         </div>
//     );
// }

