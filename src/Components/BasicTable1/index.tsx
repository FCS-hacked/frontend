 // @ts-nocheck 
 import React, { useState, useEffect, useMemo } from "react";
 import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
 import { GlobalFilter } from '../GlobalFilter'
 import {format} from 'date-fns'
 import { ColumnFilter } from '../ColumnFilter'
 import axios from 'axios'
 import Table from "./Table";
 export default function BasicTable1( {url} ) {
  const [data, setData] = useState([]);  
  useEffect(() => {
    (async () => {
      const result = await axios(url, {headers:{"Authorization": localStorage.getItem("token")}});
      setData(result.data);
    })();
  }, []); 
  const columns = useMemo(
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
          }
        ]
      }
    ],
    []
  );

  return (
    <div className="w-full">
      <Table columns={columns} data={data} />
    </div>
  );
 }
 