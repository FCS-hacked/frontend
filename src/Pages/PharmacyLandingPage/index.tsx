//  @ts-nocheck 
import React, { useEffect } from 'react';
import ProductCard from '../../Components/ProductCard';
import axios from 'axios';
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';

export default function Index() {
  const [info, setInfo] = React.useState<any>();
  const [ state, setState ] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any>();
  // const productList = [
  //     {
  //       id: 1,
  //       name: "Neotec I.V. Cannula with injection port with Wings",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/4lscPkw.png",
  //     },
  //     {
  //       id: 2,
  //       name: "Neotec I.V. Cannula with injection port without Wings",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/JaL1gmy.png",
  //     },
  //     {
  //       id: 3,
  //       name: "Neotec I.V. Cannula without Port without Wings",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/g8yqTp6.png",
  //     },
  //     {
  //       id: 4,
  //       name: "Safety I.V Cannula (Slider Type)",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/NMgOmTh.png",
  //     },
  //     {
  //       id: 5,
  //       name: "3 Way Stop cock",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/y9jmPw6.png",
  //     },
  //     {
  //       id: 6,
  //       name: "Extension Tube with Needle-Free Valve",
  //       brand: "Neotec",
  //       gauge: "14 - 24G",
  //       length: "32 & 45mm",
  //       fits: "All Luer slips and lock syringes",
  //       catheter: "PTFE & PUR",
  //       sterile: "Yes",
  //       image: "https://i.imgur.com/fNNHymI.png",
  //     },
  // ];
  const [id, setId] = React.useState<any>('0');

  const [orderDetails, setOrderDetails] = React.useState<any>([]);

  useEffect(() => {
    console.log('useEffect');
    const url = window.location.href;
    const pharmacyId = url.split('?')[1].split('=')[1];
    setId(pharmacyId);
    const getOn =  "http://localhost:8000/authentication/organizations/" + pharmacyId + "/";
    const getProductsOn = "http://localhost:8000/products/products/" + pharmacyId;
    axios.get(getOn, {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res);
      setInfo(res.data);
    }).catch((err) => {
      console.log(err);
    });
    axios.get(getProductsOn, {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res.data, " products");
      setProducts(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);


  const detailsHandler = (e: any) => {
    console.log(e);
    // add to  order details array from prev state to new state
    setOrderDetails((prev: any) => [...prev, e]);
  };

  const onOrderHandler = () => {
    console.log(orderDetails);
    const postOn = "http://localhost:8000/products/patients/create_order/";
    axios.post(postOn, {product_quantities : orderDetails, pharmacy_id : id, prescription_id: prescriptionId}, {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res, " is the thing");
      if(res.status === 201){
        alert("Order Placed Successfully, Let's pay now!");
        window.location.href = "/cart?orderId=" + res.data.id;
      }
    });
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("onSubmitHandler");
    const postOn = "http://localhost:8000/documents/self/documents/" + prescriptionId + "/";
    axios.get(postOn, {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res, " is the thing");
      if(res.status === 200){
        if(res.data.signed_by_professional === true || res.data.signed_by_professional === "true"){
          setState(true);
        }
      }

    });
  };



  const[prescriptionId, setPrescriptionId] = React.useState<any>(0);

  console.log(orderDetails, " orderDetails");




  return (
    <div>
      <SignedIn_NavBar/>
      <div id="pharmacy-details-section">
        <div className="font-nunitoBold text-4xl pt-64 pl-10">
          {info?.custom_user_detailed?.first_name} {info?.custom_user_detailed?.last_name}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 text-gray-600">
          {info?.custom_user_detailed?.location}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 text-gray-600">
          {info?.custom_user_detailed?.email}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 pb-10 text-gray-600">
          {info?.custom_user_detailed?.description}
        </div>
      </div>
      <div className="grid grid-cols-12 bg-[#F8F8F8]">
        <div className="col-span-12 sm:col-span-10 pb-4">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 px-2">
            {products && products.map((product) => (
              <ProductCard key={product.id} product={product} setDetails={detailsHandler} />
            ))}
          </div>
        </div>
      </div>
      {/* make order button */}
      <div className="fixed bottom-0 right-0 mr-4 mb-4">
        {orderDetails.length > 0 && (
          <>
          <input type="text" placeholder="Enter Prescription Id" value={prescriptionId} onChange={(e)=>{setPrescriptionId(e.target.value)}} />

          <button
            className="bg-[#FFC700] text-white font-nunitoSemiBold text-lg px-4 py-2 rounded-lg"
            onClick={(e) => {
              e.preventDefault();
              console.log(orderDetails);
              onSubmitHandler(e);
              }
            }
          >
            Validate Prescriptions
          </button>
        </>
        )}

      {state === true && (
        <button
          className="bg-[#FFC700] text-white font-nunitoSemiBold text-lg px-4 py-2 rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            console.log(orderDetails);
            onOrderHandler();
            }
          }
        >
          Make Order
        </button>
        )}
      </div>
    </div>
  );
}