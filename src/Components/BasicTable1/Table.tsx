 // @ts-nocheck 
// Table.js

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
    footerGroups,
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


    console.log(data,rows, " is the rows")

  return (
    <div className="flex w-full flex-col items-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="w-full relative shadow-md sm:rounded-lg">
        <table
          className="divide-y w-full  divide-gray-200 text-gray-500 dark:text-gray-400"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-900 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="bg-green-100 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render("Header")}
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
                    if(cell.column.Header!=="Verify"){
                      return (
                        <td
                          className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    }else{
                      return(
                        <td class="py-4 px-6">
                          <a href={`/validityCheck?sha=${data[i].sha_256}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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