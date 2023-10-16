import React, { useState, useEffect } from "react";
import AddressCard from "../components/AddressCard";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/recoilAtoms";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link } from "react-router-dom";

function Address() {
  const [userData, setUserData] = useState([]);
  const authToken = useRecoilValue(authTokenState);
  useEffect(() => {
    if (!authToken) {
      console.error("Authentication token not available.");
      return;
    }
    // Fetch dữ liệu từ API với token được thêm vào header
    const apiUrl =
      "https://test-pos.digibird.io/api/v1/front/self/address?fields=id,xid,name,email,phone,address,shipping_address,city,state,country";
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authToken}`, // Thêm token vào header
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data.data);
        // Update userData with fetched data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [authToken]);

  return (
    <div className="address-wrapper">
      <div className="container-xxl">
        <div className="add-address">
          <Link to="/add-address">
            <button className="addButton">
              <AddOutlinedIcon className="addIcon" />
              <p>Thêm mới</p>
            </button>
          </Link>
        </div>
        {userData.map((data, index) => (
          <AddressCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Address;
