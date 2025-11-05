import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CHANGE_PASSWORD } from '../utility/Constant'
import Header from '../Components/Header.js'
import Footer from '../Components/Footer.js'


export const ChangePassword = () => {
    const [oldPass, setoldPass] = useState("")
    const[newPass, setnewPass] = useState("")
    const[conPass, setconPass] = useState("")

    const handleChangePassword = (e) => {
        e.preventDefault()

        let params = {
            "oldPass": oldPass,
            "newPass": newPass,
            "conPass": conPass
        }
        console.log(params)
        var c_id = localStorage.getItem("id")
        var token = localStorage.getItem("token")

        axios.post(CHANGE_PASSWORD + c_id, params, {
            headers: {
             'Authorization': 'Bearer' + token,
                "Content-Type": "application/json",
            },
        })
         .then((response) => {
          console.log(response.data)
          alert(response.data.msg)
          setoldPass("")
          setnewPass("")
          setconPass("")
         })
         .catch((err) => {
          console.log(err)
          alert(err.response.data.msg)
          setoldPass("")
          setnewPass("")
          setconPass("")
         })
    }
  return (
    <div>
      <Header/>
      < section className="bg0 p-t-55 p-b-85">
          <div className="container" >
          <div className="flex-w flex-tr">
            <div className="size-210 p-lr-70 p-t-55 p-b-70 p-lr-15-lg w-full-md" style={{ margin: 'auto' }}>
              <form onSubmit={handleChangePassword}>
                <h4 className="mtext-105 cl2 txt-center p-b-30">
                  Change Password
                </h4>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="password"
                    required
                    name="oldPass"
                    value={oldPass}
                    onChange={(e) => setoldPass(e.target.value)}
                    placeholder="Enter a old Password"
                  />

                </div>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="password"
                    name="newPass"
                    value={newPass}
                    required
                    placeholder="Enter a New Password"
                    onChange={(e) => setnewPass(e.target.value)}
                  />
                </div>
                <div className="bor8 m-b-20 how-pos4-parent">
                  <input
                    className="stext-105 cl2 plh3 size-116 p-l-62 p-r-30"
                    type="password"
                    name="conPass"
                    value={conPass}
                    required
                    placeholder="Enter a Confirm Password"
                    onChange={(e) => setconPass(e.target.value)}
                  />
                </div>
                <button
                  className="flex-c-m stext-101 cl0 size-121 bg3 bor1 hov-btn3 p-lr-15 trans-04 pointer"
                  type='submit'
                >
                  Change Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default ChangePassword
