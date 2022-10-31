 // @ts-nocheck 
 import {format} from 'date-fns'
 import { ColumnFilter } from '../ColumnFilter'
export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter
    },
    {
        Header: "Document",
        Footer: "Document",
        accessor: 'document',
    },
    {
        Header: "Uploaded On",
        Footer: "Uploaded On",
        accessor: 'uploaded_at',
        Cell: ({value}) => {
            return format(new Date(value), 'dd/MM/yyyy')
        }

    },
    // {
    //     Header: "Shared with",
    //     Footer: "Shared with",
    //     accessor: 'shared_with',
    //     Cell: ({value}) => {
    //         return value.map((item) => {
    //             return item.name
    //         }).join(", ")
    //     }

    // },
    // {
        
    // }
    // {
    //     Header: "First Name",
    //     Footer: "First Name",
    //     accessor: "first_name",
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: "Last Name",
    //     Footer: "Last Name",
    //     accessor: "last_name",
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: "Date of Birth",
    //     Footer: "Date of Birth",
    //     accessor: "date_of_birth",
    //     Cell: ({value}) => {
    //         return format(new Date(value), 'dd/MM/yyyy')
    //     },
    //     Filter: ColumnFilter
        
    // },
    // {
    //     Header: "Country",
    //     Footer: "Country",
    //     accessor: "country",
    //     Filter: ColumnFilter
    // },
    // {
    //     Header: "Phone",
    //     Footer: "Phone",
    //     accessor: "phone",
    //     Filter: ColumnFilter
    // }
    // if we want to add more columns, we can do so here and we have intensionally left out the email column and age column
]

