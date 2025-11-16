import React, { useState, useEffect, useRef } from "react";
import Header from "../Components/Header.js";
import Footer from "../Components/Footer.js";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"

import { PRODUCT_LIST, C_URL, PRODUCT_FILTER } from "../utility/Constant";
import { Link } from "react-router-dom";

const Customer = () => {
  const [visibleCount, setvisibleCount] = useState(4)
  const [pVariant, setpVariant] = useState([])
  const [activeFilters, setActiveFilters] = useState([])
  const [productDetails, setproductDetails] = useState([]);
  const [show, setshow] = useState([])
  const [categorylist, setcategorylist] = useState([])
  
  const searchdata = useRef();
  const getProductList = () => {
    axios
      .get(PRODUCT_LIST)
      .then((response) => {
        console.log(response.data.products);
        setproductDetails(response.data.products);
        setcategorylist(response.data.products)
        let setdata = new Set()
        response.data.products.map(d => setdata.add(d.product_variant_name))
        console.log(setdata)
        setpVariant([...setdata])
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    var value = searchdata.current.value
    console.log(value.toLowerCase())
    if (value !== "") {
      var newData = productDetails.filter((prod) => {
          var arr = Object.values(prod)
          console.log("Arr", arr)
          var str = arr[1]
          console.log(str.toLowerCase().includes(value.toLowerCase()))
          return str.toLowerCase().includes(value.toLowerCase())
      })
      console.log("NewData:", newData)
      setproductDetails(newData)
    }else {
      setproductDetails(categorylist)
    }
  }

  const handleChange = (event) => {
    const { name, value, checked } = event.target
   // console.log([name], value, checked)
      
   if(name === "category") {
    //case 1: select checkbox
    if(checked) {
      setActiveFilters([...activeFilters,value]);
      handleFilter1([...activeFilters,value])
    }else  {
      //case 1: unselect checkbox 
      setActiveFilters(activeFilters.filter((data) => data !== value))
      handleFilter1(activeFilters.filter((data) => data !== value))
    }
   }
  }

  const handleFilter1 = (catname) => {
    console.log(catname);
    const categoryString = catname.join(",")
    console.log(categoryString)
    if (categoryString != null) {
      var url = PRODUCT_FILTER +categoryString
      console.log(url)
      axios.get(url)
       .then((response) => {
        console.log(response)
        setproductDetails(response.data)
       })
       .catch((err) => {
        console.log(err)
       })
    } else {
      getProductList()
    }

  }

  const handleLoadMore = () => {
    setvisibleCount((prev) => prev + 4) // Load 4 more each time
  }


  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <Header />
       <div style={{ display: "flex", marginTop: 50 }}>
        <div style={{ width: "20%", borderRight: "1px solid lightgray" }}>
          <h3>Filter Product</h3>
          {pVariant.map((d, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              key={index}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  style={{ flex: "none" }}
                  name="category"
                  type="checkbox"
                  value={d}
                  onChange={handleChange}
                />
                &nbsp;
                {d}
              </label>
            </div>
          ))}
        </div>
        <div style={{ width: "80%" }}>
          {/* search button */}
          <div
            className="flex-w flex-sb-m m-l-10 m-r-10"
            style={{ backgroundColor: "white" }}
          >
            <div
              className="flex-c-m stext-106 cl6 size-105 bor4 pointer hov-btn3 trans-04 m-tb-4 js-show-search"
              onClick={() => setshow(!show)}
            >
              {show ? (
                <i className="icon-close-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-close"></i>
              ) : (
                <i className="icon-search cl2 m-r-6 fs-15 trans-04 zmdi zmdi-search"></i>
              )}
              Search
            </div>
          </div>

          <AnimatePresence initial={false}>
            {show && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ overflow: "hidden", marginBottom: 5 }}
              >
                <div className="bor8 dis-flex p-l-10 m-l-10 m-r-10 search-wrapper">
                  <button className="size-113 flex-c-m fs-16 cl2 hov-cl1 trans-04">
                    <i className="zmdi zmdi-search"></i>
                  </button>

                  <input
                    className="mtext-107 cl2 size-114 plh2 p-r-15"
                    type="text"
                    name="search-product"
                    placeholder="Search by Brand Name"
                    ref={searchdata}
                    onChange={handleSearch}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* search button */}

          <section className="bg0 p-t-10 p-b-140">
            <div className="container">
              <div className="row isotope-grid">
                {productDetails.slice(0, visibleCount).map((prod, index) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item"
                    style={{ paddingBottom: 0 }}
                    key={index}
                  >
                    <div className="block2">
                      <div className="block2-pic hov-img0">
                        <img
                          src={prod.product_imageurl[0].path}
                          alt="IMG-PRODUCT"
                          height="300"
                          style={{ objectFit: "contain" }}
                        />
                        <Link
                          to={`${C_URL}customer/productdetails/${prod._id}`}
                          className="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1"
                        >
                          Quick View
                        </Link>
                      </div>

                      <div className="block2-txt flex-w flex-t p-t-14">
                        <div className="block2-txt-child1 flex-col-l ">
                          <a
                            href="product-detail.html"
                            className="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6"
                          >
                            {prod.product_description}
                          </a>

                          <span className="stext-105 cl3">
                            &#8377;{prod.product_sp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {visibleCount < productDetails.length && (
              <button
                onClick={handleLoadMore}
                className="stext-101 cl5 size-103 bg2 bor1 hov-btn1"
                style={{ marginTop: -5 }}
              >
                Load More
              </button>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Customer;
