 // @ts-nocheck 
 import React, { useState, useEffect, useMemo } from "react";
 import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
 import { GlobalFilter } from '../GlobalFilter'
 import {format} from 'date-fns'
 import { ColumnFilter } from '../ColumnFilter'
 import axios from 'axios'
 import Table from "./Table";
 export default function BasicTable( {url} ) {
  const [data, setData] = useState([]);  
  useEffect(() => {
    (async () => {
      const result = await axios("http://localhost:8000/documents/self/documents/", {headers:{"Authorization": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhbmlzbWlzaHJhMjAwMUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoic2pjbmRzY2QiLCJsYXN0X25hbWUiOiJzY2RrZHNjbiIsInR5cGUiOiIxIiwiY2F0ZWdvcnkiOiIxIiwiZXhwIjoxNjY3MjY1OTU3fQ.eSmX4Ge_WZQAJkwCqo1YnWrFkkoHP9tO_5omLR9TQpm0aySKH_ucaGvrD5pd9xy495eoTXwaUMCYYH4R5Zq7XmKsIJ3BqAJPPn0rH6-aOzKEWHFLPhV2ASbX3vgI2VVhMqy9G7BjQerm7UNAWD_UTSGxxR-LhksCDqmpvNAizyTJ3-l1Pw-WoWrEPCK5W8mzk6zyLHGxtq-VgAwJDG__gummRxfkJ7jDRXCZgpu5z02Utp6FGbMTlF3MY6hmsgJkISuf_qYyGRIoCwAyYlMBAd3PXNRsO-HFwYh2nQPQvAqo4SoyjlJKi9PLRazC1COhRjYzf3xYlK44jpu20ZYUIdOo0QImqYypCsgPlu3t31WieZVIF6HVia70xP-rqa5kLljsIZ1WMdMepwvKxRXJolTMkU8xYFRc4GwDrHL4vN8nbLUxcU60AZbzxVhSRGAdXHV-zvvcq8hC1DARiZYeKEmKJvlaNoiVmhH0QXcRhcKPF4R0q8Yhyfx1LNMv6Cn-"}});
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
 