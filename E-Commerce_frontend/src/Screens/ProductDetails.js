import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_DETAILS } from "../utility/Constant";
import axios from "axios";
import SlickSlider from "../Components/SlickSlider.js";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [pdetails, setpdetails] = useState({});
  const [psize, setpsize] = useState([]);
  const [pcolor, setpcolor] = useState([]);
  const [quantity, setquantity] = useState(1);

  const getProductDetails = async () => {
    axios
      .get(PRODUCT_DETAILS + pid)
      .then((response) => {
        console.log("Product Detail Response:", response);

        setpdetails(response.data.product[0]);
        let sizedata = response.data.product[0].product_size;
        let arrSize = sizedata.split(",");
        setpsize(arrSize);

        let colordata = response.data.product[0].product_color;
        let arrColor = colordata.split(",");
        setpcolor(arrColor);
      })
      .catch((err) => {
        console.log("Error fetching product details:", err);
      });
  };
  console.log(pcolor)

  useEffect(() => {
    getProductDetails();
  }, []);

  const increQuantity = () => {
    setquantity(quantity + 1);
  };
  const decreQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    }
  };

  const addToCart = () => {
    navigate("/login");
  };

  return (
    <div>
      <section className="sec-product-detail bg0 p-t-65 p-b-60">
        <div className="container">
          <div className="row">
            {/* Image Section */}
            <div className="col-md-6 col-lg-7 p-b-30">
              <SlickSlider data={pdetails.product_imageurl} />
            </div>

            {/* Product Details */}
            <div className="col-md-6 col-lg-5 p-b-30">
              <div className="p-r-50 p-t-5 p-lr-0-lg">
                <h4 className="mtext-105 cl2 js-name-detail p-b-14">
                  {pdetails.product_brand} &nbsp;{" "}
                  {pdetails.product_variant_name}
                </h4>

                <span className="mtext-106 cl2">
                  ₹{pdetails.product_sp} &nbsp;&nbsp;
                  <del style={{ color: "gray" }}>₹{pdetails.product_mrp}</del>
                  &nbsp;&nbsp;
                </span>
                <span
                  className="mtext-106 cl2"
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  &nbsp;&nbsp;{pdetails.product_discount}% Off&nbsp;&nbsp;
                </span>

                <p className="stext-102 cl3 p-t-23">
                  {pdetails.product_description}
                </p>

                <div className="p-t-33">
                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Size</div>
                    <div className="size-204 respon6-next bor19">
                      <select
                        className="form-select stext-100 cl2 plh3 size-116 p-lr-14"
                        style={{
                          fontSize: 15,
                          border: "none",
                          backgroundColor: "white",
                          paddingLeft: 16,
                          boxShadow: "none",
                        }}
                      >
                        <option selected>Select a Size *</option>
                        {psize.map((sizedata, index) => (
                          <option value={sizedata} key={index}>
                            {sizedata}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-203 flex-c-m respon6">Color</div>
                    <div className="size-204 respon6-next bor19">
                      <select
                        className="form-select stext-100 cl2 plh3 size-116 p-lr-14"
                        style={{
                          fontSize: 15,
                          border: "none",
                          backgroundColor: "white",
                          paddingLeft: 16,
                          boxShadow: "none",
                        }}
                      >
                        <option selected>Select a Color *</option>
                        {pcolor.map((colordata, index) => (
                          <option value={colordata} key={index}>
                            {colordata}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex-w flex-r-m p-b-10">
                    <div className="size-204 flex-w flex-m respon6-next">
                      <div className="wrap-num-product flex-w m-r-20 m-tb-10">
                        <div
                          className="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={decreQuantity}
                        >
                          <i className="fs-16 zmdi zmdi-minus"></i>
                        </div>
                        <input
                          className="mtext-104 cl3 txt-center num-product"
                          type="number"
                          value={quantity}
                          name="quantity"
                          onChange={(e) => setquantity(e.target.value)}
                        />
                        <div
                          className="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m"
                          onClick={increQuantity}
                        >
                          <i className="fs-16 zmdi zmdi-plus"></i>
                        </div>
                      </div>

                      <button
                        className="flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail"
                        onClick={addToCart}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
