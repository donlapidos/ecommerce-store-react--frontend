import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import "./Product.scss";
import useFetch from "../../hooks/useFetch";
import {useDispatch} from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const {data, loading,error} = useFetch(`/products/${id}?populate=*`);

  return (
    <div className='product'>
      {loading ? (
        "loading"
      ) : (
        <>
          <div className="left">
            <div className="images">
              <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes?.img?.data?.attributes?.url} alt="product1" onClick={e=> setSelectedImg("img")} />
              <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes?.img2?.data?.attributes?.url} alt="product2" onClick={e=> setSelectedImg("img2")}/>
            </div>
            <div className="mainImg">
              <img src={process.env.REACT_APP_UPLOAD_URL +data?.attributes[selectedImg].data?.attributes?.url} alt="product" />
            </div>
          </div>


          <div className="right">
            <h1>{data?.attributes?.title}</h1>
            <span className='price'>RM{data?.attributes?.price}</span>
            <p>
              {data?.attributes?.desc}
            </p>
            <div className="quantity">
              <button onClick={()=> setQuantity((prev)=> (prev === 1 ? 1 : prev - 1))}>-</button>
              {quantity}
              <button onClick={()=> setQuantity((prev)=> prev + 1)}>+</button>
            </div>
            <button className="add" onClick={() =>
                dispatch(
                  addToCart({
                    id: data.id,
                    title: data.attributes.title,
                    desc: data.attributes.desc,
                    price: data.attributes.price,
                    img: data.attributes.img.data.attributes.url,
                    quantity,
                  })
                )
              }
            >
              <AddShoppingCartIcon /> ADD TO CART
            </button>
            <div className="link">
              <div className="item">
                <FavoriteBorderIcon/> ADD TO WISHLIST
              </div>
              <div className="item">
                <BalanceIcon /> ADD TO COMPARE
              </div>
            </div>
            <div className="info">
                  <span>Vendor: Polo</span>
                  <span>Product Type: T-Shirt</span>
                  <span>Tag: T-Shirt, Women, Top</span>
                </div>
                <hr />
                <div className="info">
                  <span>DESCRIPTION</span>
                  <hr />
                  <span>ADDITIONAL INFORMATION</span>
                  <hr />
                  <span>FAQ</span>
                </div>
          </div>
          
          
          </>
      )}
    </div>
  )
}

export default Product