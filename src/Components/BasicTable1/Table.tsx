//  @ts-nocheck 
// Table.js

import axios from "axios";
import React from "react";
import { useTable } from "react-table";
import {useSortBy, useGlobalFilter, useFilters} from 'react-table'
import { GlobalFilter } from '../GlobalFilter'

export default function Table({  columns, data }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data
},
    useFilters, useGlobalFilter, useSortBy);
    const {globalFilter} = state
  function shareDocument(cellValue){
    console.log(cellValue)
    // const url = "
    axios.patch(`http://localhost:8000/documents/self/documents/${cellValue}/`,{"shared_with": [shareEmail]} ,{headers:{"Authorization": localStorage.getItem("token"), "hotp":otp}})

  }
  function deleteDocument(cellValue){
    console.log(cellValue)
    // const url = "
    axios.delete(`http://localhost:8000/documents/self/documents/${cellValue}/`,{headers:{"Authorization": localStorage.getItem("token"), "hotp":otp}})
  }
  const [shareEmail, setShareEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  return (
    <div className="flex w-full flex-col items-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="w-full relative shadow-md sm:rounded-lg">
      <input type='text' placeholder='Share Email' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
          onChange={(e) => setShareEmail(e.target.value)}
      />
      <input type='text' placeholder='OTP' className='border-2 border-gray-300 rounded-md p-2 my-2 w-full'
          onChange={(e) => setOtp(e.target.value)}
      />
        <table
          className="divide-y w-full  divide-gray-200 text-gray-500 dark:text-gray-400"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-900 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  console.log(column, "is the column"),
                  <th
                    className="bg-green-100 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {(column.Header!=="Verify" && column.Header!=="Delete" && column.Header!=="Share") ? column.render("Header") : ""}
                    <div className=" lowercase flex justify-center ">
                      {column.canFilter ? column.render("Filter") : null}
                    </div>
                    <div>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </div>
                    
                  </th>
                  
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 even:bg-gray-100"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    console.log(cell.column.Header);
                    console.log((row), " is the row");
                    if(cell.column.Header!=="Verify" && cell.column.Header!=="Shared with" && cell.column.Header!=="Delete" && cell.column.Header!=="Share"){
                      return (
                        <td
                          className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    }else if(cell.column.Header==="Shared with"){
                      return(
                        <td
                          className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                          
                        </td>
                      )
                    }else if(cell.column.Header==="Verify"){
                      return(
                        <td class="py-4 px-6">
                          <a href={`/validityCheck?sha=${data[i].sha_256}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                      )
                    }else if(cell.column.Header==="Delete"){
                      return(
                        <td class="py-4 px-6">
                          <a onClick={()=>deleteDocument(row.values.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                        </td>
                      )
                    }else if(cell.column.Header==="Share"){
                      return(
                        <td class="py-4 px-6">
                          
                          <a onClick={()=>shareDocument(row.values.id)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Share</a>
                        </td>
                      )
                    }
                  })}
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}