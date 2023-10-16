import { useNavigate } from "react-router-dom";
import "../App.css";
import "../assets/css/index.css";
import { authTokenState } from "../recoil/recoilAtoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
const handleLogin = (data, setAuthToken) => {
  const token = data.data.token;
  setAuthToken(token); // Save the token to Recoil state
};

function Home() {
  const navigate = useNavigate();
  const setAuthToken = useSetRecoilState(authTokenState);
  const formData = new URLSearchParams();
  formData.append("id", "0869017747");
  formData.append("name", "Phát");
  formData.append("company_id", "9");
  return (
    <div className="container-home">
      <div>
        <a href="https://digibird.io" target="_blank">
          <img
            src="/public/logo-350x125.png"
            className="logo"
            alt="DigiBird logo"
          />
        </a>
      </div>
      <h1>DigiBird Test Exercise</h1>
      <div className="card" style={{ flexDirection: "row" }}>
        <button
          className="button-home"
          style={{ marginLeft: 10 }}
          onClick={() => {
            const login =
              "https://test-pos.digibird.io/api/v1/front/sign-up-zalo";
            fetch(login, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: formData.toString(),
            })
              .then((response) => response.json())
              .then((data) => {
                // Call the function to handle login and save token to Recoil state
                handleLogin(data, setAuthToken);
              })
              .catch((err) => {
                console.log(err);
              });
            navigate("/address");
          }}
        >
          Start
        </button>
      </div>

      <p className="read-the-docs">Click on the button view details exercise</p>
    </div>
  );
}

export default Home;
