 // @ts-nocheck
import React, {useEffect} from "react";
 import axios from "axios";
 import * as jose from "jose";

function App(props: {amount:number, orderId:string, prefills:any}) {
    const [user, setUser] = React.useState<any>(null);
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

    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("token")
            // console.log(jwt)
            // const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MzA5NTU4fQ.yi4lBOJXn5VbxJ71lg9-uvPqxYwHUA_2CMr4k73a2QC1Nd5T2BZMb0EZBqldSFI4NQagfheW-7ZhelLOAdGANKtTWdsh-2__3ukUi3sTsENvgIhHPhCXQ0e5spDD1dsCGAgqD8h40vjyoZ7Pk-h0OZ_1M_WFA6wSMo6Ruxxpedv7WEM_yoZwSVwSk4fkKFCo87RfvwvkP0UqIPEjXtliNJ_yg2NgWt6KkcXDhpO1iJDc_FSqiRhvfIMWRnp0wrlLRi7asMxI-nOKWbmTcdEiKqIE5fVzYDFpjdiOTPGyOqrKRFvvpQ93qLqZzx9md_OXczKb2VoeZ8ufVDigkZoVmH0emrr36xjylWwQWx8AHdJeT7GVhYsoSKMxAdIHCa4TehkZGWVADYMynHbVdG-t9ZmvB9ZFwI16j1rF7yn1-3qdAlFcQsydOtKPJb_zW8h19BxVDc-Z7hf34ciQhlSoOJNvgHaXkjppvy4UqzkS6GdUMiIMLIPDSbpsbabDL0Wz"
            const algorithm = 'RS256'
            const spki = `-----BEGIN PUBLIC KEY-----
            MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
            -----END PUBLIC KEY-----`
            const ecPublicKey = await jose.importSPKI(spki, algorithm)
            if(jwt!=null){
                const { payload } = await jose.compactVerify(jwt, ecPublicKey)
                setUser(JSON.parse(new TextDecoder().decode(payload)));
            }else{
                window.location.href = "/login";
            }
        })();
    }
    , [])

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
                    const res = await axios.patch(process.env.REACT_APP_BACKEND_URL+"/products/patients/update_order_payment_id/", params, {headers:{"Authorization": localStorage.getItem("token")}});
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
                email: user.email,
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
