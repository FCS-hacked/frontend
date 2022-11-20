import React from 'react'
import Orders from '../Orders';
export default function Cart(props: { cartItems: Array<any> }) {
  // const { cartItems } = props;
  const cartItems: any[] 
   = [{
    name : "Item34",
    price: 60000,
    id: "order_DBJOWzybf0sJbb",
    currency: "INR",
    qty: 1,
  },
  {
    name : "Item3",
    price: 50000,
    id: "order_DBJOWzybf0sJb3",
    currency: "INR",
    qty: 1,
  }]; 

  const [totalPrice, setTotalPrice] = React.useState<number>(0);

  // def function paymentHandler
  React.useEffect(() => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.qty;
    });
    setTotalPrice(total);
  }, [cartItems]);
  // if cartItems is not empty, render each item in the cart with basic detail and show total payment amount
  if (cartItems.length > 0) {
    // calculate the total price of all items in the cart
    

    return (
      <div>
        <h1>Cart</h1>
        <ul>
          {cartItems.map((item: any) => (
            <li key={item.id}>
              {item.name} - {item.qty} - {item.price} 
            </li>
          ))}
        </ul>
        <h3>Total: {totalPrice}</h3>
        {/* proceed to pay button */}
       <Orders amount={totalPrice} orderId={'temp'} prefills={"none"} />
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
