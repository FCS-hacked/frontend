//  @ts-nocheck
// Table.js

import axios from "axios";
import React from "react";
import { useTable } from "react-table";
import { useSortBy, useGlobalFilter, useFilters } from "react-table";
import { GlobalFilter } from "../GlobalFilter";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useRef, useState } from "react";
import { useContext } from "react";
import { SignFile, GetFileSigners } from "../context/blockchain";
import { BlockchainContext } from "../context/BlockchainContext";
export default function Table({ columns, data, linking }) {

  const [neededArray, setNeededArray] = useState([]);
  const { getProvider, connectedAccount } = useContext(BlockchainContext);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );
  
  const [layout, setLayout] = useState("default");
  const [shareEmail, setShareEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [transferEmail, setTransferEmail] = React.useState("");
  const keyboard = useRef();
  const { globalFilter } = state;
  function shareDocument(cellValue) {
    console.log(cellValue);
    axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/documents/self/documents/${cellValue}/`,
      { shared_with: [shareEmail] },
      { headers: { Authorization: localStorage.getItem("token"), hotp: otp } }
    );
  }
  function deleteDocument(cellValue) {
    console.log(cellValue);
    axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/documents/self/documents/${cellValue}/`,
      { headers: { Authorization: localStorage.getItem("token"), hotp: otp } }
    ).then (res => {
      console.log(res);
      window.location.reload();
    }).catch(err => {
      console.log(err);
    });
  }

  const button1handler = async (mySha, docId) => {
    let m = BigInt("0x" + mySha).toString();

    console.log( "xqwe m : ", m)

    const x = await GetFileSigners(getProvider, m);
    console.log("xqwe", x);
    if (!x.includes(connectedAccount)) {
      let txn = await SignFile(getProvider, m);
      
      console.log(txn , " txn for sign")


      axios.post(process.env.REACT_APP_BACKEND_URL + '/documents/self/check-signature/' +  docId, + "/", {
      }, {headers:{"Authorization": localStorage.getItem("token")}})
      .then(function (response) {
        if(response.status === 201){
            console.log("hello ho gya")
          }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });



      
      
    } else {
      alert("You have already signed this file");
      // axios.post(process.env.REACT_APP_BACKEND_URL + '/documents/self/check-signature/' +  docId + '/', {
      // }, {headers:{"Authorization": localStorage.getItem("token")}})
      // .then(function (response) {
      //   if(response.status === 201){
      //       console.log("hello ho gya")
      //     }
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
    }
  };
  const button2Handler = async (mySha) => {
    let m = BigInt("0x" + mySha).toString();
    const x = await GetFileSigners(getProvider, m);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/authentication/get-details-from-metamask/`,
        { metamask_ids: x },
        { headers: { Authorization: localStorage.getItem("token") } }
      )
      .then(function (response) {
        console.log(response, " response");
        // take email from object of arrays and put it in an array
        let emailArray = [];
        for (let i = 0; i < response.data.length; i++) {
          emailArray.push(response.data[i].email);
        }
        setNeededArray(emailArray);
        alert(JSON.stringify(emailArray));
      });
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };
  const onKeyPress = (button: any) => {
    console.log("Button pressed", button);
    if (button === "{shift}" || button === "{lock}") handleShift();
    else if (button === "{bksp}") {
      setOtp((prevOtp) => prevOtp.slice(0, -1));
    } else {
      setOtp((prevOtp) => prevOtp + button);
    }
  };
  function shareDocument(cellValue) {
    console.log(cellValue);
    // const url = "
    axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/documents/self/documents/${cellValue}/`,
      { shared_with: [shareEmail] },
      { headers: { Authorization: localStorage.getItem("token"), hotp: otp } }
    );
  }
  function deleteDocument(cellValue) {
    console.log(cellValue);
    // const url = "
    axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/documents/self/documents/${cellValue}/`,
      { headers: { Authorization: localStorage.getItem("token"), hotp: otp } }
    );
  }
  function transferOwnership(cellValue) {
    console.log(cellValue);
    // const url = "
    axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/documents/self/transfer-ownership/${cellValue}/`,
      { document_id: cellValue, custom_user: transferEmail },
      { headers: { Authorization: localStorage.getItem("token") } }
    );
  }

  return (
    <div className="flex w-full flex-col items-center">
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className="w-full relative shadow-md sm:rounded-lg">
        <input
          type="text"
          placeholder="Share Email"
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => setShareEmail(e.target.value)}
        />
        <input
          type="text"
          disabled={true}
          value={otp}
          placeholder="OTP"
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => setOtp((prevOtp) => prevOtp + e.target.value)}
        />
        {
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layoutName={layout}
            // onChange={(e:any) => }
            onKeyPress={onKeyPress}
          />
        }

        <table
          className="divide-y w-full  divide-gray-200 text-gray-500 dark:text-gray-400"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-900 uppercase bg-green-100 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(
                  (column) => (
                    console.log(column, "is the column"),
                    (
                      <th
                        className="bg-green-100 py-3 text-xs font-bold text-center text-gray-800 uppercase "
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.Header !== "Verify" &&
                        column.Header !== "Delete" &&
                        column.Header !== "Share" &&
                        column.Header !== "Signed By" &&
                        column.Header !== "Transfer Ownership"
                          ? column.render("Header")
                          : ""}
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
                    )
                  )
                )}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200" {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 even:bg-gray-100"
                  onClick={() => {
                    if (linking) {
                      window.location.href = `/pharmacy?id=${row.values.id}`;
                    }
                  }}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    console.log(cell.column.Header);
                    console.log(row, " is the row");
                    if (
                      cell.column.Header !== "Verify" &&
                      cell.column.Header !== "Shared with" &&
                      cell.column.Header !== "Delete" &&
                      cell.column.Header !== "Share" &&
                      cell.column.Header !== "Signed By" &&
                      cell.column.Header !== "Transfer Ownership"
                    ) {
                      return (
                        <td
                          className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    } else if (cell.column.Header === "Shared with") {
                      return (
                        <td
                          className="px-6 py-4 text-sm text-center text-gray-800 whitespace-nowrap"
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    } else if (cell.column.Header === "Verify") {
                      return (
                        <td class="py-4 px-6">
                          {/* <a href={`/validityCheck?sha=${data[i].sha_256}`} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Verify</a> */}
                          {connectedAccount ? (
                            <button
                              onClick={() => {
                                button1handler(row.original.sha_256,row.values.id);
                              }}
                              className="cta-button mint-nft-button"
                            >
                              Sign File
                            </button>
                          ) : null}
                        </td>
                      );
                    } else if (cell.column.Header === "Delete") {
                      return (
                        <td className="py-4 px-6">
                          <a
                            onClick={() => deleteDocument(row.values.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Delete
                          </a>
                        </td>
                      );
                    } else if (cell.column.Header === "Share") {
                      return (
                        <td className="py-4 px-6">
                          <a
                            onClick={() => shareDocument(row.values.id)}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Share
                          </a>
                        </td>
                      );
                    } else if (cell.column.Header === "Signed By") {
                      return (
                        <td class="py-4 px-6">
                          <button
                            onClick={() => {
                              button2Handler(row.original.sha_256);
                            }}
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            {" "}
                            See Signers
                          </button>
                        </td>
                      );
                    } else if (cell.column.Header === "Transfer Ownership") {
                      return (
                        <td className="py-4 px-6">
                          <a
                            onClick={() => {
                              const email = window.prompt(
                                "Enter transfer user's email"
                              );
                              setTransferEmail(email);
                              transferOwnership(row.values.id);
                            }}
                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Transfer Ownership
                          </a>
                        </td>
                      );
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
