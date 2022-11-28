// @ts-nocheck
import React, { useEffect } from "react";
import axios from "axios";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { useState } from "react";
import { usePasswordValidation } from "./usePasswordValidation";
export default function Form(props) {
  function PromptUser() {
    alert(
      "Your account has been created succesfully! You will receive HOTP secret on email. You can login after admin approves your account."
    );
  }
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFile2, setSelectedFile2] = useState();
  const [passwordError, setPasswordError] = useState("");

  const individualOption = [
    { value: "1", label: "Patient" },
    { value: "2", label: "Professional" },
  ];
  const organisationOption = [
    { value: "1", label: "Hospital" },
    { value: "2", label: "Pharmacy" },
    { value: "3", label: "Insurance Firm" },
  ];
  const [individualData, setIndividualData] = React.useState({
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    last_name: "",
    address: "",
    date_of_birth: "",
    category: "",
    // inshallahboysplayedwell
    // proof_of_identity: undefined,
    // proof_of_address: undefined,
    //   username: "",
    //   password1: "",
    //   password2: "",
    //   email: "",
  });
  const [organisationData, setOrganisationData] = React.useState({
    email: "",
    password1: "",
    password2: "",
    first_name: "",
    address: "",
    last_name: "",
    category: "",
    licenses: "",
    permits: "",
    images: "",
    location: "",
    description: "",
  });
  const [
    validLength1,
    hasNumber1,
    upperCase1,
    lowerCase1,
    match1,
    specialChar1,
  ] = usePasswordValidation({
    firstPassword: individualData.password1,
    secondPassword: individualData.password2,
    requiredLength: 8,
  });
  console.log(selectedFile, "is selected file");
  const [
    validLength2,
    hasNumber2,
    upperCase2,
    lowerCase2,
    match2,
    specialChar2,
  ] = usePasswordValidation({
    firstPassword: organisationData.password1,
    secondPassword: organisationData.password2,
    requiredLength: 8,
  });
  const changeHandler = (event) => {
    console.log(event.target.files[0], "is event target files");
    setSelectedFile(event.target.files[0]);
  };
  const changeHandler2 = (event) => {
    console.log(event.target.files[0], "is selected file2");
    setSelectedFile2(event.target.files[0]);
  };

  function OnSubmitIndividual() {
    if (
      validLength1 &&
      hasNumber1 &&
      upperCase1 &&
      lowerCase1 &&
      match1 &&
      specialChar1 &&
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(individualData.email)
    ) {
      console.log(specialChar1);
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            "/unauth/register-as-personal-user/",
          {
            username: individualData.email,
            password1: individualData.password1,
            password2: individualData.password2,
            email: individualData.email,
            first_name: individualData.first_name,
            last_name: individualData.last_name,
            address: individualData.address,
            date_of_birth: individualData.date_of_birth,
            category: individualData.category,
            proof_of_identity: selectedFile,
            proof_of_address: selectedFile2,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(function (response) {
          if (response.status === 201) {
            PromptUser();
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
        individualData.email
      ) === false
    ) {
      alert("Please enter valid email address");
    } else {
      alert("Please enter valid password");
    }
    console.log(individualData);
  }

  function OnSubmitOrganisation() {
    if (
      validLength2 &&
      hasNumber2 &&
      upperCase2 &&
      lowerCase2 &&
      match2 &&
      specialChar2 &&
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(organisationData.email)
    ) {
      axios
        .post(
          process.env.REACT_APP_BACKEND_URL +
            "/unauth/register-as-organization/",
          {
            username: organisationData.email,
            password1: organisationData.password1,
            password2: organisationData.password2,
            email: organisationData.email,
            first_name: organisationData.first_name,
            last_name: organisationData.last_name,
            category: organisationData.category,
            licenses: organisationData.licenses,
            permits: organisationData.permits,
            images: organisationData.images,
            location: organisationData.location,
            description: organisationData.description,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(function (response) {
          if (response.status === 201) {
            PromptUser();
          }
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (
      /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(
        organisationData.email
      ) === false
    ) {
      alert("Please enter valid email address");
    } else {
      alert("Please enter valid password");
    }
  }
  const formType = props.formType;
  if (formType === "Individual") {
    return (
      <form
        className="flex flex-col items-center justify-center w-[300px]"
        onSubmit={(e) => {
          e.preventDefault();
          OnSubmitIndividual();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={individualData.email}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => {
            e.preventDefault();
            setIndividualData({ ...individualData, email: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={individualData.password1}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => {
            e.preventDefault();

            setIndividualData({
              ...individualData,
              password1: e.target.value,
            });
          }}
        />
        <ul>
          <li>
            Valid Length:{" "}
            {validLength1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Has a Number: {hasNumber1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            upperCase: {upperCase1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            lowerCase: {lowerCase1 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Special Character:{" "}
            {specialChar1 ? <span>True</span> : <span>False</span>}
          </li>
        </ul>
        <input
          type="password"
          placeholder="Confirm Password"
          value={individualData.password2}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) => {
            e.preventDefault();

            setIndividualData({
              ...individualData,
              password2: e.target.value,
            });
          }}
        />
        <ul>
          <li>match: {match1 ? <span>True</span> : <span>False</span>}</li>
        </ul>
        <input
          type="text"
          placeholder="First Name"
          value={individualData.first_name}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setIndividualData({
              ...individualData,
              first_name: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={individualData.last_name}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setIndividualData({
              ...individualData,
              last_name: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Address"
          value={individualData.address}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setIndividualData({ ...individualData, address: e.target.value })
          }
        />
        <br/>
          Date of Birth
        <input
          type="date"
          placeholder="Date of Birth"
          value={individualData.date_of_birth}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setIndividualData({
              ...individualData,
              date_of_birth: e.target.value,
            })
          }
        />
        <br/>
          Type of Individual
        <Dropdown
          options={individualOption}
          onChange={(e) =>
            setIndividualData({ ...individualData, category: e.value })
          }
          value={individualData.type}
          placeholder="Select an option"
        />
        <div className=" text-left flex justify-start font-nunitoSemiBold pt-4">
          Proof of Identity
        </div>
        <input
          type="file"
          name="identityProof"
          placeholder="Proof of Identity"
          onChange={(e) => {
            changeHandler(e);
          }}
          className="p-2 ml-[0.5vw] w-full"
        />

        <div className=" text-left flex justify-start font-nunitoSemiBold pt-4">
          Proof of Address
        </div>
        <input
          type="file"
          name="addressProof"
          placeholder="Proof of Address"
          onChange={(e) => {
            changeHandler2(e);
          }}
          className="p-2 ml-[0.5vw] w-full"
        />
        <button
          className="bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 mt-2 mb- w-1/2 font-nunitoSemiBold"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  } else if (formType === "Organisation") {
    return (
      <form
        className="flex flex-col items-center justify-center w-[300px]"
        onSubmit={(e) => {
          e.preventDefault();
          OnSubmitOrganisation();
        }}
      >
        <input
          type="text"
          placeholder="First Name"
          value={organisationData.first_name}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              first_name: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Last Name"
          value={organisationData.last_name}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              last_name: e.target.value,
            })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={organisationData.description}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              description: e.target.value,
            })
          }
        />
        <input
          type="email"
          placeholder="Email"
          value={organisationData.email}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({ ...organisationData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={organisationData.password1}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              password1: e.target.value,
            })
          }
        />
        <ul>
          <li>
            Valid Length:{" "}
            {validLength2 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Has a Number: {hasNumber2 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            upperCase: {upperCase2 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            lowerCase: {lowerCase2 ? <span>True</span> : <span>False</span>}
          </li>
          <li>
            Special Character:{" "}
            {specialChar2 ? <span>True</span> : <span>False</span>}
          </li>
        </ul>
        <input
          type="password"
          placeholder="Confirm Password"
          value={organisationData.password2}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              password2: e.target.value,
            })
          }
        />
        <ul>
          <li>match: {match2 ? <span>True</span> : <span>False</span>}</li>
        </ul>
        <input
          type="text"
          placeholder="Images"
          value={organisationData.images}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({ ...organisationData, images: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={organisationData.location}
          className="border-2 border-gray-300 rounded-md p-2 my-2 w-full"
          onChange={(e) =>
            setOrganisationData({
              ...organisationData,
              location: e.target.value,
            })
          }
        />
        Type of organization:
        <Dropdown
          options={organisationOption}
          onChange={(e) =>
            setOrganisationData({ ...organisationData, category: e.value })
          }
          value={organisationData.type}
          placeholder="Select an option"
        />
        <div className=" text-left flex justify-start font-nunitoSemiBold pt-4">
          License
        </div>
        <input
          type="file"
          name="licenses"
          placeholder="Licenses"
          onChange={(e) => {
            changeHandler(e);
          }}
          className="p-2 ml-[0.5vw] w-full"
        />
        <div className=" text-left flex justify-start font-nunitoSemiBold pt-4">
          Permits
        </div>
        <input
          type="file"
          name="permits"
          placeholder="Permits"
          onChange={(e) => {
            changeHandler2(e);
          }}
          className="p-2 ml-[0.5vw] w-full"
        />
        <button
          className="bg-googleBlue bg-opacity-100 hover:bg-opacity-95 focus:opacity-75 text-white rounded-md p-2 mt-2 mb- w-1/2 font-nunitoSemiBold"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }
}
