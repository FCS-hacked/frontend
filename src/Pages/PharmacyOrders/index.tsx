import axios from 'axios'
import * as jose from 'jose'
import {useEffect, useState} from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
export default function PharmacyOrders() {
    const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null);
    const [fileNumber, setFileNumber] = useState<number>(-1);
    useEffect(() => {
        (async () => {
            const jwt = localStorage.getItem("token")
            const algorithm = 'RS256'
            const spki = `-----BEGIN PUBLIC KEY-----
            MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
            -----END PUBLIC KEY-----`
            const ecPublicKey = await jose.importSPKI(spki, algorithm)
            // console.log(ecPublicKey)
            if(jwt!=null){
                const { payload, protectedHeader } = await jose.compactVerify(jwt, ecPublicKey)
                setUser(JSON.parse(new TextDecoder().decode(payload)));
            }else{
                window.location.href = "/login";
            }
            // if(user.)
            // const decoded = await jose.jwtDecrypt(jwt, ecPublicKey)
            // console.log(protectedHeader)
            // console.log(payload)
        })();
    }, [setUser]);
    useEffect(() => {
      axios(process.env.REACT_APP_BACKEND_URL + "/products/self/orders/", {headers:{"Authorization": localStorage.getItem("token")}}).then((response) => {
        console.log(response.data, " is the response");
        setOrders(response.data);
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    console.log(user, " is the user")


    const updateOrderStatus = (order_id:  number) => {
        console.log(order_id, fileNumber);
        axios.patch(process.env.REACT_APP_BACKEND_URL + '/products/pharmacies/mark-order-as-fulfilled/',{ "order_id": order_id, "invoice_id": fileNumber }, {headers:{"Authorization": localStorage.getItem("token")}})
          .then(function (response) {
            console.log(response)
            if(response.status === 201){
                console.log("yay")
                alert("updated invoice for order : " + order_id +  " as  " + fileNumber )
                window.location.reload();
              }
          })
          .catch(function (error) {
            console.log(error);
          });


    }
    
  return (
    ((user!==null) && (user['type']==='2')) ? 
    (<div>
        {/* eslint-disable-next-line react/jsx-pascal-case */}
        <SignedIn_NavBar/>
        <div  className='pl-10'>
            <h1 className='pt-10 pb-5 text-4xl font-nunitoExtraBold'>Received Orders</h1>
            <table>
                <thead className='
                bg-gray-50 border-b border-gray-200 text-left font-nunitoBold text-2xl text-gray-500  tracking-wider'>
                    <tr>
                        <th className='pr-22'>Order ID</th>
                        <th className='pr-22'>Product Name</th>
                        <th className='pr-22'>Quantity</th>
                        <th className='pr-22'>Price</th>
                        <th className='pr-22'>Order Status</th>
                        <th className='pr-22'>Add Invoice ID</th>
                        <th className='pr-22'>Document</th>
                        
                    </tr>
                </thead>
                <tbody className='text-xl font-nunitoSemiBold text-center'>
                    {orders.length > 0 && orders.map((order:any) => (
                        <tr>
                            <td className='pr-52'>{order.id}</td>
                            <td className='pr-52'>
                                {
                                    order.items_detailed.map((item:any) => (
                                        <div>{  
                                            item.product_detailed.name
                                        }<br/></div>
                                    ))
                                }
                            </td>
                            <td className='pr-52'>{
                                    order.items_detailed.map((item:any) => (
                                        <div>{item.quantity}<br/></div>
                                    ))
                                }
                            </td>
                            <td className='pr-52'>{order.price}</td>
                            
                            <td className='pr-52'>{
                                (order.status==='2')?"Paid":((order.status==='1')?"Pending":"Fulfilled")
                            }</td>
                            <td>
                                {!order.invoice && order.status >=2 ? 
                                <>
                                <input 
                                type="number"
                                onChange={(e) => {
                                    if(e.target.value.length !== 0){
                                        setFileNumber(parseInt(e.target.value))
                                    }
                                    else {
                                        alert("input empty")
                                    }
                                }} value={fileNumber}></input>
                                <button onClick={(e) =>{
                                    e.preventDefault()
                                    updateOrderStatus(order.id )
                                }} > 
                                    mark fullfilled
                                </button>  
                                </>  :  order.invoice ?  <>Already Paid</>:
                                
                                <div>order not paid yet </div> 
                                 } 

                            </td>
                            <td>
                                {order.invoice}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>) : null
  )
}
