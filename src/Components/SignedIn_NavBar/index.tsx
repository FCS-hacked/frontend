import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import * as jose from "jose";
import { Avatar } from "flowbite-react/lib/esm/components";
import { useNavigate } from "react-router-dom";

export default function SignedIn_NavBar() {
  const [navbar, setNavbar] = useState(false);
  let navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    (async () => {
      const jwt = localStorage.getItem("token");
      // console.log(jwt);
      // const jwt = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MzA5NTU4fQ.yi4lBOJXn5VbxJ71lg9-uvPqxYwHUA_2CMr4k73a2QC1Nd5T2BZMb0EZBqldSFI4NQagfheW-7ZhelLOAdGANKtTWdsh-2__3ukUi3sTsENvgIhHPhCXQ0e5spDD1dsCGAgqD8h40vjyoZ7Pk-h0OZ_1M_WFA6wSMo6Ruxxpedv7WEM_yoZwSVwSk4fkKFCo87RfvwvkP0UqIPEjXtliNJ_yg2NgWt6KkcXDhpO1iJDc_FSqiRhvfIMWRnp0wrlLRi7asMxI-nOKWbmTcdEiKqIE5fVzYDFpjdiOTPGyOqrKRFvvpQ93qLqZzx9md_OXczKb2VoeZ8ufVDigkZoVmH0emrr36xjylWwQWx8AHdJeT7GVhYsoSKMxAdIHCa4TehkZGWVADYMynHbVdG-t9ZmvB9ZFwI16j1rF7yn1-3qdAlFcQsydOtKPJb_zW8h19BxVDc-Z7hf34ciQhlSoOJNvgHaXkjppvy4UqzkS6GdUMiIMLIPDSbpsbabDL0Wz"
      const algorithm = "RS256";
      const spki = `-----BEGIN PUBLIC KEY-----
            MIIBojANBgkqhkiG9w0BAQEFAAOCAY8AMIIBigKCAYEA0P2/AuXsa6Hk+XmVRNn2056bGub44ODuaQgkgs4VCedqZMY8kFHVf1uV8s4leGHKzDiykGcyuvFf5IaUd30wVbT+FFY6aao4spfbCF6kUcAF/xGTPRDycOjHuQxXbon3M3Dyc463Jw57NzYu6blJDe0uYwlRSIMp+pq1yeZtRGHwixx/OnobB0NtXxONyBUMD3X4NYrZbFv6yyVWYSbOuuvi+dIPIr/oQtq+ktXhLKprXixA0ksc+W+fkjFDipnZc8YEVwISu8To3c9G60aCG/ElpOwbu2SytPdV1Xa1xY9IqLSe+6K84aXEHzX5QhkX4zEb0io1toIjiS5RocP68grTnCi+1FM6WkPRr0XgHXyubm02QRY0xRe0MJmW5erOlGZXlDatDInxqpRNeN+BvA2H6fZD0rot8fEP+DlCc2BdgzS1c8GmKLn7ZQcEoQlhj+JzVtsiAEcuaAKkyHxszfsQlRipQkCj6yG7HRyKHneNQrArWLpFAn9fWvExbY8BAgMBAAE=
            -----END PUBLIC KEY-----`;
      const ecPublicKey = await jose.importSPKI(spki, algorithm);
      // console.log(ecPublicKey);
      if (jwt != null) {
        const { payload, protectedHeader } = await jose.compactVerify(
          jwt,
          ecPublicKey
        );
        setUser(JSON.parse(new TextDecoder().decode(payload)));
        console.log(new TextDecoder().decode(payload), " payload");
      }else{
        navigate("/login")
      }
    })();
  }, [setUser]);
  // const [userDetails, setUserDetails] = useState<AxiosResponse | null | void>(
  //   null
  // );
  // useEffect(() => {
  //   (async () => {
  //     if (user !== undefined) {
  //       console.log(user["type"], "type");
  //     }
  //     if (user !== undefined && user["type"] === "1") {
  //       console.log(user["type"]);
  //       const response = await axios.get(
  //         "http://localhost:8000/authentication/self/personal-user/",
  //         { headers: { Authorization: localStorage.getItem("token") } }
  //       );
  //       console.log(response);
  //       if (response !== undefined) {
  //         setUserDetails(response);
  //       }
  //     } else if (user !== undefined && user["type"] === "2") {
  //       console.log(user["type"]);
  //       const response = await axios.get(
  //         "http://localhost:8000/authentication/self/organization/",
  //         { headers: { Authorization: localStorage.getItem("token") } }
  //       );
  //       console.log(response);
  //       if (response !== undefined) {
  //         setUserDetails(response);
  //       }
  //     }
  //   })();
  // }, [user]);
  const location = useLocation();
  return user !== undefined ? (
    <>
      <nav className="w-full bg-[white] shadow large:hidden z-40 fixed">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8 z-50">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="md:hidden z-50">
                <button
                  className="p-2 z-50 text-gray-700 rounded-md outline-none "
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <Link className=" font-nunitoBold" to={"/"}>
                Project Name
              </Link>
            </div>
          </div>
          <div className="z-50 absolute bg-[white] w-full">
            <div
              className={`flex-1 justify-self-center pb-3 mt-[2vmax] md:block md:pb-0 md:mt-0 ${
                navbar ? "block" : "hidden"
              }`}
            >
              <ul className="flex flex-col w-full items-center opacity-100 z-[100] text-textSecondary bg-white justify-center space-y-5">
                <a
                  href="/"
                  className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-googleBlue bg-opacity-25 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-googleBlue hover:bg-opacity-20"
                >
                  Logout
                </a>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex w-full justify-between items-center top-0 bg-[white] z-50 shadow p-[1.4vmax] sticky small:hidden small:pt-[3vmax]">
        <div className="space-y-2 z-40 large:hidden small:hidden">
          <span className="block w-7 h-1 bg-textMain z-40"></span>
          <span className="block w-7 h-1 bg-textMain z-40"></span>
          <span className="block w-7 h-1 bg-textMain z-40"></span>
        </div>
        <Link
          to={"/"}
          className="font-nunitoBold w-1/3 ml-[2vmax] small:w-10/12 small:ml-[4vmax] small:hidden"
        >
          Project Name
        </Link>
        <ul className="flex justify-end small:hidden mr-[2.5vmax] text-[1.3vmax] font-google font-semibold">
          <div>
            <a
              href="/displayMyDocuments"
              className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-googleBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-googleBlue  mr-5"
            >
              My Documents
            </a>
          </div>
          <div>
            <a
              href="/displaySharedDocuments"
              className=" inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-googleBlue px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-googleBlue  mr-5"
            >
              Shared Documents
            </a>
          </div>
          <div className="flex items-center w-full justify-end md:flex lg:w-0">
            {/* //profile button here */}

            <Dropdown className="flex" label="Profile">
              <div className="flex flex-wrap pl-4">
                {/* <Avatar /> */}
                <Avatar rounded={true} />
              </div>
              <Dropdown.Header>
                <span className="block text-sm">
                  {user['first_name']}
                  {` `}
                  {user['last_name']}
                </span>
                <span className="block text-sm font-medium truncate">
                  {user['email']}
                </span>
              </Dropdown.Header>
              <Dropdown.Item
                onClick={() => {
                  // e.preventDefault();
                  if(user!==undefined){
                    navigate("/dashboard");
                  }
                }}
                
              >
                {(user!==undefined) ?  "Dashboard" : "User not found"}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  // e.preventDefault();
                  if(user!==undefined && (user['type'] === "1" && user['category'] === "1")){
                    navigate("/pharmacyListing");
                  }
                }}
              >
                {(user!==undefined) ? ((user['type'] === "1" && user['category'] === "1") ? "Pharmacy" : ""): "User not found"}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  // e.preventDefault();
                  if(user!==undefined && (user['type'] === "1" && user['category'] === "1")){
                    navigate("/userOrders");
                  }else if(user!==undefined && (user['type'] === "2" && user['category'] === "2")){
                    navigate("/pharmacyOrders");
                  }
                }}
              >
                {(user!==undefined && ((user['type'] === "2" && user['category'] === "2")||(user!==undefined && (user['type'] === "1" && user['category'] === "1")))) ? "Orders": ""}
              </Dropdown.Item>
              
              {/* <Dropdown.Item>Settings</Dropdown.Item> */}
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                  navigate("/");
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </ul>
      </div>
    </>
  ) : null;
}
