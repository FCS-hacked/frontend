 // @ts-nocheck 
import React from "react";
 import axios from "axios";

function App(props: {amount:number, orderId:string, prefills:any}) {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if(res){
            console.log(res, " woahh");

        }

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // const result = await axios.post("http://localhost:3000/payment/orders");

        // if (!result) {
        //     alert("Server error. Are you online?");
        //     return;
        // }

        // const { amount, id: order_id, currency } = result.data;
        const { amount, currency } =  {
            amount: props.amount,
            // id: props.orderId,
            currency: "INR",
        };


        const options = {
            key: "rzp_test_lIBdvX0gfiR05C", // Enter the Key ID generated from the Dashboard
            amount: amount.toString() + "00",
            currency: currency,
            name: "FCS_Hacked",
            description: "Test Transaction",
            // order_id: id,
            handler: async function (response : any) {
                const data = {
                    // orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                console.log(data, "data");

                const params = 
                    { "payment_id": data.razorpayPaymentId, "order_id": props.orderId  }
                

                if(data !== undefined && data.razorpayPaymentId !== undefined){
                    const res = await axios.patch("http://localhost:8000/products/patients/update_order_payment_id/", params, {headers:{"Authorization": localStorage.getItem("token")}});
                    console.log(res.data, "res");
                    if(res.status === 201){
                        alert("Payment Successful");
                        window.location.href = "/";
                    }
                    else {
                        alert("Payment Failed");
                    }
                }


                // const result = await axios.post("http://localhost:3000/", data);

                // alert(result.data.msg);
            },
            prefill: {
                name: "Heemank Verma",
                email: "hv.dexter@gmail.com",
                contact: "0000000000",
            },
            notes: {
                address: "Test org",
            },
            theme: {
                color: "#528FF0",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div >
                <button  onClick={displayRazorpay}>
                    Test Pay
                </button>
        </div>
    );
}

export default App;