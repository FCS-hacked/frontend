
 import React, { useState} from 'react'
 
 export default function Index(props:{product :any, setDetails  :any}) {

  // make a quantity counter 
  const [quantity, setQuantity] = useState<number>(1);

  const onClickHandler = () => {
    console.log((props.product.id,quantity), " order");
    props.setDetails([props.product.id, quantity]);
    console.log("clicked")
  }     

  console.log(props.product, "product")
   return (
    <div className="bg-white col-span-4 shadow-md px-3 py-3">
    <img src={props.product.image} alt="Product Image" height={200} width={200} className="mx-auto mb-3 h-[200px] w-auto" />
    <div>
      <h4 className="text-lg font-bold mb-7 min-h-[4rem]">{props.product.name}</h4>
      <div className="grid grid-cols-12 gap-3 text-sm my-2">
        <div className="col-span-6">
          <span className="font-bold">Brand:</span> {props.product.brand}
        </div>
        <div className="col-span-6">
          <span className="font-bold">Fits:</span> {props.product.fits}
        </div>
        <div className="col-span-6">
          <span className="font-bold">Gauge:</span> {props.product.gauge}
        </div>
        <div className="col-span-6">
          <span className="font-bold">Catheter:</span> {props.product.catheter}
        </div>
        <div className="col-span-6">
          <span className="font-bold">Length:</span> {props.product.length}
        </div>
        <div className="col-span-6">
          <span className="font-bold">Sterile:</span> {props.product.sterile}
        </div>  
      </div>
      <button className="block text-center btn-outline w-full my-4" onClick={(e)=> {
        e.preventDefault();
        onClickHandler();
      }} >Add to cart</button>
       {/* add a quantity counter here */}
      <div className="flex justify-between">
        <div className="flex items-center">
          <button className="btn-outline" onClick={
            () =>
            setQuantity((prev) => prev - 1)
            
            }>-</button>
          <span className="mx-2">{quantity}</span>
          <button className="btn-outline" onClick={() =>    setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <div className="font-bold text-lg">${props.product.price}</div>
      </div>
     
    </div>
  </div>
   )
 }
