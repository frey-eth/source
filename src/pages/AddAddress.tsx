import React, { useEffect, useState } from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import { useRecoilValue } from "recoil";
import { authTokenState } from "../recoil/recoilAtoms";
import { useNavigate } from "react-router-dom";

interface City {
  code: number;
  name: string;
  districts: District[];
}

interface District {
  code: number;
  name: string;
}
function AddAddress() {
  const authToken = useRecoilValue(authTokenState);
  const navigate = useNavigate();
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [districts, setDistricts] = useState<District[]>([]);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    country: "VN",
    email: "",
    name: "",
    phone: "",
    shipping_address: "Landmark",
    state: "",
    zipcode: 1,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    // Fetch danh sách thành phố và quận/huyện từ API
    fetch("https://provinces.open-api.vn/api/?depth=2")
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCityChange = (event) => {
    const selectedCityCode = parseInt(event.target.value);

    if (!isNaN(selectedCityCode)) {
      const selectedCity = cities.find(
        (city) => city.code === selectedCityCode
      );
      if (selectedCity) {
        setSelectedCity(selectedCity);
        setFormData({
          ...formData,
          city: selectedCity.name, // Update city in the form data
        });
      }

      const districtsOfSelectedCity = selectedCity
        ? selectedCity.districts
        : [];
      setDistricts(districtsOfSelectedCity);
    }
  };

  const handleDistrictChange = (event) => {
    const selectedDistrictCode = parseInt(event.target.value);

    if (!isNaN(selectedDistrictCode)) {
      const selectedDistrict = districts.find(
        (district) => district.code === selectedDistrictCode
      );
      if (selectedDistrict) {
        setFormData({
          ...formData,
          state: selectedDistrict.name, // Update district in the form data
        });
      }
    }
  };

  const convertToFormUrlEncoded = (data) => {
    const urlEncoded = new URLSearchParams();
    for (let key in data) {
      urlEncoded.append(key.toString(), data[key]);
    }
    return urlEncoded.toString();
  };

  const handleSaveInformation = () => {
    // Make a POST request to your API endpoint
    fetch("https://test-pos.digibird.io/api/v1/front/self/address", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/x-www-form-urlencoded", // Thêm token vào header
      },
      body: convertToFormUrlEncoded(formData), // Send the formData as the request body
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Successful", data);
        // Handle any success actions you want to take
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        // Handle any error actions you want to take
      });

    navigate("/address");
  };

  return (
    <div className="add-address-wrapper my-3">
      <form action="" className="d-flex flex-column">
        <div className="form-header p-2">
          <h3>Thêm mới địa chỉ</h3>
        </div>
        <div className="form-information p-3 gap-15">
          <div>
            <label className="mb-1">
              <PersonOutlineIcon /> Họ và tên
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Nguyễn Văn A"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-1">
              <CallOutlinedIcon /> Số điện thoại
            </label>
            <input
              type="tel"
              name="phone"
              className="form-control"
              placeholder="0 xxx xxx xxx"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-1">
              <EmailOutlinedIcon /> Địa chỉ email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="example@example"
              onChange={handleInputChange}
            />
          </div>

          <div className="d-flex flex-column mb-2">
            <label htmlFor="cityDropdown" className="mb-1">
              <FmdGoodOutlinedIcon /> Tỉnh, thành phố
            </label>
            <select
              id="cityDropdown"
              onChange={handleCityChange}
              value={selectedCity ? selectedCity.code : ""}
              className="form-control"
            >
              <option value="">Chọn tỉnh/ thành phố</option>
              {cities.map((city) => (
                <option key={city.code} value={city.code}>
                  {city.name}
                </option>
              ))}
            </select>

            {selectedCity && (
              <div className="d-flex flex-column mb-2">
                <label htmlFor="districtDropdown " className="mb-1">
                  <FmdGoodOutlinedIcon /> Quận, huyện
                </label>
                <select
                  id="districtDropdown"
                  className="form-control"
                  onChange={handleDistrictChange}
                >
                  <option value="">Chọn quận/ huyện</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1">
              <FmdGoodOutlinedIcon /> Địa chỉ cụ thể
            </label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="23 đường số 8, phường Linh Trung,..."
              onChange={handleInputChange}
            />
          </div>

          <div>
            <button
              className="buttonSave"
              type="button"
              onClick={handleSaveInformation}
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
