import React, { useEffect } from 'react';
import ProductCard from '../../Components/ProductCard';
import axios from 'axios';

export default function Index() {
  const [info, setInfo] = React.useState([]);
  const productList = [
      {
        id: 1,
        name: "Neotec I.V. Cannula with injection port with Wings",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/4lscPkw.png",
      },
      {
        id: 2,
        name: "Neotec I.V. Cannula with injection port without Wings",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/JaL1gmy.png",
      },
      {
        id: 3,
        name: "Neotec I.V. Cannula without Port without Wings",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/g8yqTp6.png",
      },
      {
        id: 4,
        name: "Safety I.V Cannula (Slider Type)",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/NMgOmTh.png",
      },
      {
        id: 5,
        name: "3 Way Stop cock",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/y9jmPw6.png",
      },
      {
        id: 6,
        name: "Extension Tube with Needle-Free Valve",
        brand: "Neotec",
        gauge: "14 - 24G",
        length: "32 & 45mm",
        fits: "All Luer slips and lock syringes",
        catheter: "PTFE & PUR",
        sterile: "Yes",
        image: "https://i.imgur.com/fNNHymI.png",
      },
  ];

  useEffect(() => {
    console.log('useEffect');
    const url = window.location.href;
    const pharmacyId = url.split('?')[1].split('=')[1];
    const getOn =  "http://localhost:8000/authentication/organisation/" + pharmacyId;
    axios.get(getOn, {headers:{"Authorization": localStorage.getItem("token")}}).then((res) => {
      console.log(res);
      setInfo(res.data);
    });
  }, []);


  console.log(info, " qwertys");


  return (
    <div>
      {/* <div id="pharmacy-details-section">
        <div className="font-nunitoBold text-4xl pt-64 pl-10">
          {pharmacy.first_name} {pharmacy.last_name}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 text-gray-600">
          {pharmacy.location}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 text-gray-600">
          {pharmacy.email}
        </div>
        <div className="font-nunitoSemiBold text-lg pl-10 pb-10 text-gray-600">
          {pharmacy.description}
        </div>
      </div> */}
      <div className="grid grid-cols-12 bg-[#F8F8F8]">
        <div className="col-span-12 sm:col-span-10 pb-4">
          <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 gap-4 px-2">
            {productList.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}