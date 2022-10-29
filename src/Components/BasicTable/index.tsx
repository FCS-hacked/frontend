 // @ts-nocheck 
import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import {COLUMNS} from './columns'
import sortingLogos from '../../common/sortingLogos.svg'
import { GlobalFilter } from '../GlobalFilter'
export default function BasicTable() {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA, [])
    
    const tableInstance = useTable({
        columns,
        data
    },
    useFilters, useGlobalFilter, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        rows,
        prepareRow,
        state,
        setGlobalFilter,
    } = tableInstance
    
    const {globalFilter} = state
  return (
    <div className="flex flex-col items-center">
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <div className="w-full relative shadow-md sm:rounded-lg">
        <table className=" divide-y divide-gray-200 text-gray-500 dark:text-gray-400" {...getTableProps()}>
            <thead className="text-xs text-gray-900 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
                {
                    headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {
                                headerGroup.headers.map((column) => (
                                    <th scope="col"
                                    className="px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase " 
                                    {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        
                                        <div className=' lowercase'>
                                            {column.canFilter ? column.render('Filter') : null}
                                        </div>
                                    <div>
                                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                    </div>
                                    </th>
                                ))
                            }
                        </tr>
                ))}
                <tr>
                    <th></th>
                </tr>
            </thead>
            <tbody  className="divide-y divide-gray-200" {...getTableBodyProps()}>
                {
                    rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 even:bg-gray-100" {...row.getRowProps()}>
                                {
                                    row.cells.map((cell) => {
                                        return <td className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
            <tfoot >
                {
                    footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map((column) => (
                                    <td scope="col" className=" bg-green-100 px-6 py-3 text-xs font-bold text-center text-gray-800 uppercase " {...column.getFooterProps()}>
                                        {
                                            column.render('Footer')
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
    </div>
    </div>
  )
}
