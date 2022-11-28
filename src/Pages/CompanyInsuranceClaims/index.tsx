//@ts-nocheck
import axios from "axios";
import { useEffect, useState } from "react";
import * as jose from "jose";
import SignedIn_NavBar from "../../Components/SignedIn_NavBar";

export default function CompanyInsuranceClaims() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    axios(
      process.env.REACT_APP_BACKEND_URL +
        "/products/patients/list-insurance-claims/",
      { headers: { Authorization: localStorage.getItem("token") } }
    )
      .then((response) => {
        console.log(response.data);
        setOrders(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      // console.log(jwt)
      // const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MzA5NTU4fQ.yi4lBOJXn5VbxJ71lg9-uvPqxYwHUA_2CMr4k73a2QC1Nd5T2BZMb0EZBqldSFI4NQagfheW-7ZhelLOAdGANKtTWdsh-2__3ukUi3sTsENvgIhHPhCXQ0e5spDD1dsCGAgqD8h40vjyoZ7Pk-h0OZ_1M_WFA6wSMo6Ruxxpedv7WEM_yoZwSVwSk4fkKFCo87RfvwvkP0UqIPEjXtliNJ_yg2NgWt6KkcXDhpO1iJDc_FSqiRhvfIMWRnp0wrlLRi7asMxI-nOKWbmTcdEiKqIE5fVzYDFpjdiOTPGyOqrKRFvvpQ93qLqZzx9md_OXczKb2VoeZ8ufVDigkZoVmH0emrr36xjylWwQWx8AHdJeT7GVhYsoSKMxAdIHCa4TehkZGWVADYMynHbVdG-t9ZmvB9ZFwI16j1rF7yn1-3qdAlFcQsydOtKPJb_zW8h19BxVDc-Z7hf34ciQhlSoOJNvgHaXkjppvy4UqzkS6GdUMiIMLIPDSbpsbabDL0Wz"
      const algorithm = "RS256";
      const spki = `-----BEGIN PUBLIC KEY-----
            MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
            -----END PUBLIC KEY-----`;
      const ecPublicKey = await jose.importSPKI(spki, algorithm);
      // console.log(ecPublicKey)
      if (jwt != null) {
        const { payload, protectedHeader } = await jose.compactVerify(
          jwt,
          ecPublicKey
        );
        setUser(JSON.parse(new TextDecoder().decode(payload)));
      } else {
        window.location.href = "/login";
      }
      // if(user.)
      // const decoded = await jose.jwtDecrypt(jwt, ecPublicKey)
      // console.log(protectedHeader)
      // console.log(payload)
    })();
  }, []);
  return user !== undefined &&
    user["type"] === "2" &&
    user["category"] === "3" ? (
    <div>
      {/* create a previous orders page */}
      <SignedIn_NavBar/>
      <div className="pl-10">
        <h1 className="pt-10 pb-5 text-4xl font-nunitoExtraBold">
          Insurance Claims Received
        </h1>
        <table>
          <thead
            className="
                bg-gray-50 border-b border-gray-200 text-left font-nunitoBold text-2xl text-gray-500  tracking-wider
                "
          >
            <tr>
              <th className="pr-10">Claim ID</th>
              <th className="pr-10">Status</th>
              <th className="pr-10">Invoice ID</th>
              <th className="pr-10">Insuree ID</th>
              <th className="pr-10">Price</th>
              <th className="pr-10">Prescription ID</th>
              {/* 1 pending 2 accepted 3 rejected */}
            </tr>
          </thead>
          <tbody className="text-xl font-nunitoSemiBold text-center">
            {orders &&
              orders.map((order: any) => (
                <tr>
                  <td className="pr-10">{order.id}</td>
                  <td className="pr-10">
                    {order.status === "1"
                      ? "Pending"
                      : order.status === "2"
                      ? "Accepted"
                      : "Rejected"}
                  </td>
                  <td className="pr-10">{order.order_detailed.invoice}</td>
                  <td className="pr-10">{order.order_detailed.buyer}</td>
                  <td className="pr-10">{order.order_detailed.price}</td>
                  <td className="pr-10">{order.order_detailed.prescription}</td>
                  {order.status === "1" && (
                    <td className="pr-10">
                      {
                        <a
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            axios
                              .patch(
                                process.env.REACT_APP_BACKEND_URL +
                                  "/products/patients/process-insurance-claim/",
                                {
                                  insurance_claim_id: order.id,
                                  accepted: true,
                                },
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              )
                              .then((response) => {
                                console.log(response.data);
                                window.location.reload();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Approve Claim{" "}
                        </a>
                      }
                    </td>
                  )}
                  {order.status === "1" && (
                    <td className="pr-10">
                      {
                        <a
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            axios
                              .patch(
                                process.env.REACT_APP_BACKEND_URL +
                                  "/products/patients/process-insurance-claim/",
                                {
                                  insurance_claim_id: order.id,
                                  accepted: false,
                                },
                                {
                                  headers: {
                                    Authorization:
                                      localStorage.getItem("token"),
                                  },
                                }
                              )
                              .then((response) => {
                                console.log(response.data);
                                window.location.reload();
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                        >
                          Deny Claim{" "}
                        </a>
                      }
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : null;
}
