 // @ts-nocheck 
 import React, { useState, useEffect, useMemo } from "react";
 import {format} from 'date-fns'
 import { ColumnFilter } from '../ColumnFilter'
 import axios from 'axios'
 import Table from "./Table";
 export default function BasicTable1( {url, shared} ) {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      const result = await axios(url, {headers:{"Authorization": localStorage.getItem("token")}});
      setData(result.data);
    })();
  }, []); 
  const columns_1 = useMemo(
    () => [
      {
        // first group - TV Show
        // First group columns
        Header: "My Documents",
        columns: [
          {
            Header: "id",
            accessor: "id",            
            Filter: ColumnFilter
          },
          {
            Header: "custom_user",
            accessor: "custom_user",
            Filter: ColumnFilter
          },
          {
            Header: "document",
            accessor: "document",
            Filter: ColumnFilter
          },
          {
            Header: "Uploaded on",
            accessor: "uploaded_at",
            Filter: ColumnFilter,
            Cell: ({value}) => {
              return format(new Date(value), 'dd/MM/yyyy')
            }
          },
          {
            Header: "Shared with",
            accessor: "shared_with",
            Filter: ''
          },
          {
            Header: "Verified by",
            accessor: "verified_by",
            Filter: ''
          },
          {
            Header: "Verify",
          },          
          {
            Header:"Signed By",
          }
        ]
      }
    ],
    []
  );

  const columns_2 = useMemo(
    () => [
      {
        // first group - TV Show
        // First group columns
        Header: "My Documents",
        columns: [
          {
            Header: "id",
            accessor: "id",            
            Filter: ColumnFilter
          },
          {
            Header: "custom_user",
            accessor: "custom_user",
            Filter: ColumnFilter
          },
          {
            Header: "document",
            accessor: "document",
            Filter: ColumnFilter
          },
          {
            Header: "Uploaded on",
            accessor: "uploaded_at",
            Filter: ColumnFilter,
            Cell: ({value}) => {
              return format(new Date(value), 'dd/MM/yyyy')
            }
          },
          {
            Header: "Shared with",
            accessor: "shared_with",
            Filter: ''
          },
          {
            Header: "Verified by",
            accessor: "verified_by",
            Filter: ''
          },
          {
            Header: "Verify",
          },
          {
            Header: "Delete",
          },
          {
            Header: "Share",
          },
          {
            Header:"Signed By",
          },
          {
            Header:"Transfer Ownership",
          }
        ]
      }
    ],
    []
  );
  return (
    <div className="w-full">
      <Table columns={(shared===true) ? columns_1 : columns_2}  data={data} linking={false} isOtp={!shared} />
    </div>
  );
 }
 