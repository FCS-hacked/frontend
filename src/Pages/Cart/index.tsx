import axios from 'axios';
import React, { useEffect} from 'react'
import Orders from '../Orders';
export default function Cart() {

  const [orderDetails, setOrderDetails] = React.useState<any>({});

  useEffect(() => {
    const url = window.location.href;
    const orderId = url.split('?')[1].split('=');
    console.log(orderId, " orderId");
    if(orderId[1] !== undefined){
    axios.get("http://localhost:8000/products/self/orders/" + orderId[1], {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res.data);
      setOrderDetails(res.data);
    });
    }
    else {
      alert("No Order Found");
    }
  }, []);

  if (orderDetails?.items_detailed?.length > 0) {
    return (
      <div>
        <h1>Cart</h1>
        <h3>Total: {orderDetails.price}</h3>
       <Orders amount={orderDetails.price} orderId={'temp'} prefills={"none"} />
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>Cart</h1>
        <p>Cart is empty</p>
      </div>
    )
  }
}
