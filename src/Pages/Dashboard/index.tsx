 import { useState, useEffect, useMemo } from "react";
import SignedIn_NavBar from '../../Components/SignedIn_NavBar'
import Table from '../../Components/BasicTable1/Table'
 import { ColumnFilter } from '../../Components/ColumnFilter'
 import * as jose from 'jose'
import axios from 'axios';
export default function Dashboard() {
    const [user, setUser] = useState(undefined);
    const [userType, setUserType] = useState('');
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [url, setUrl] = useState('');
  useEffect(() => 
  {
    console.log(url, " is defind");
    (async () => {
      const result = await axios(url, {headers:{"Authorization": localStorage.getItem("token")}});
      console.log(result.data[0].custom_user_detailed, " is defind");
      setData(result.data);
      setData2(result.data[0].custom_user_detailed);
    })();
  }, [url]); 
  const columns_prof = useMemo(
    () => [
      {
        // first group - TV Show
        // First group columns
        Header: "Professional",
        columns: [
          {
            Header: "id",
            accessor: "id",
            Filter: ColumnFilter,
          },
          {
            Header: "address",
            accessor: "address",
            Filter: ColumnFilter,
          },
          {
            Header: "First Name",
            accessor: "custom_user_detailed.first_name",
            Filter: ColumnFilter,
          },
          {
            Header: "Last Name",
            accessor: "custom_user_detailed.last_name",
            Filter: ColumnFilter,
          },
          {
            Header: "Email",
            accessor: "custom_user_detailed.email",
            Filter: ColumnFilter,
          },
          {
            Header: "Organisation First Name",
            accessor: "organization_detailed.custom_user_detailed.first_name",
            Filter: ColumnFilter,
          },
          {
            Header: "Organisation Last Name",
            accessor: "organization_detailed.custom_user_detailed.last_name",
            Filter: ColumnFilter,
          },
        ],
        // Header: "Orgainzation Details",
        // columns: [
        //     {
        //         Header: "id",
        //         accessor: "organization_detailed.id",
        //         Filter: ColumnFilter
        //     },
        //     {
        //         Header: "description",
        //         accessor: "organization_detailed.description",
        //         Filter: ColumnFilter
        //     },
        //     {
        //         Header: "images",
        //         accessor: "organization_detailed.images",
        //         Filter: ColumnFilter
        //     },
        //     {
        //         Header:"location",
        //         accessor: "organization_detailed.location",
        //         Filter: ColumnFilter
        //     },
        //     {
        //         Header: "first name",
        //         accessor: "organization_detailed.custom_user_detailed.first_name",
        //         Filter: ColumnFilter
        //     },
        //     {
        //         Header: "last name",
        //         accessor: "organization_detailed.custom_user_detailed.last_name",
        //         Filter: ColumnFilter
        //     },
        // ]
      },
    ],
    []
  );
  const columns_orgs = useMemo(
    () => [
      {
        // first group - TV Show
        // First group columns
        Header: "Organization",
        columns: [
          {
            Header: "id",
            accessor: "id",
            Filter: ColumnFilter,
          },
          {
            Header: "description",
            accessor: "description",
            Filter: ColumnFilter,
          },
          {
            Header: "images",
            accessor: "images",
            Filter: ColumnFilter,
          },
          {
            Header: "location",
            accessor: "location",
            Filter: ColumnFilter,
          },
          {
            Header: "email",
            accessor: "custom_user_detailed.email",
            Filter: ColumnFilter,
          },
          {
            Header: "first name",
            accessor: "custom_user_detailed.first_name",
            Filter: ColumnFilter,
          },
          {
            Header: "last name",
            accessor: "custom_user_detailed.last_name",
            Filter: ColumnFilter,
          },
        ],
      },
    ],
    []
  );

    const handleChange = (
      event: React.ChangeEvent<{ value: string }>
      
      ) => {
        console.log(event.target.value);
        if(event.target.value === 'Professional'){
            setUrl(process.env.REACT_APP_BACKEND_URL + '/authentication/professionals/');
        }
        else if(event.target.value === 'Organization'){
            setUrl(process.env.REACT_APP_BACKEND_URL + '/authentication/organizations/');
        }
        setUserType(event.target.value);
    };
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

  return (
    ((user !== undefined) && (user['type']=='1') &&(user['category']==='1')) ?
    (
        <div>
            <SignedIn_NavBar/>
            <div className='flex flex-col items-center justify-center w-full'>
                <div className='flex flex-row items-center justify-center text-sm font-nunitoExtraBold pt-2'>
                    <div className='flex flex-row items-center justify-center w-1/2'>
                        <input type="radio" id="Individual" name = "user_type" value="Professional"
                        onChange={handleChange}
                        checked={userType === 'Professional'}
                        />
                        <label htmlFor="Individual" className='pl-1'>Professional</label>
                    </div>
                    <div className='flex flex-row items-center justify-center w-1/2'>
                        <input type="radio" id="Organization" name = "user_type" value="Organization" className='ml-5'
                        onChange={handleChange}
                        checked={userType === 'Organization'}
                        />
                        <label htmlFor="Organization" className='pl-1'>Organization</label>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <Table columns={(userType==='Professional') ? columns_prof : columns_orgs} data={data} />
            </div>
        </div>
  ) : null)
}
