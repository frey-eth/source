import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useNavigate } from "react-router-dom";

const AddressCard = ({ data }) => {
  const navigate = useNavigate();
  const {
    xid,
    name,
    email,
    phone,
    address,
    shipping_address,
    city,
    state,
    country,
  } = data;
  const handleEditClick = () => {
    // Navigate to the edit page when "Chỉnh sửa" (Edit) button is clicked
    navigate(`/address/${xid}`, { state: { data } });
  };
  return (
    <Card sx={{ minWidth: 275, margin: 2 }}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", fontSize: "18px" }}
          >
            Họ và tên: {name}
          </Typography>
          <Button size="small">Xóa</Button>
        </div>
        <Typography
          sx={{
            mb: 1.5,
            mt: 1.5,
            alignItems: "center",
            display: "flex",
            gap: 1,
            fontSize: "13px",
          }}
          color="text.secondary"
        >
          <HomeIcon /> Địa chỉ
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>
          {address + ", " + state + ", " + city + ", " + country}
        </Typography>
        <Typography
          sx={{
            mb: 1.5,
            mt: 1.5,
            alignItems: "center",
            display: "flex",
            gap: 1,
            fontSize: "13px",
          }}
          color="text.secondary"
        >
          <LocalPhoneOutlinedIcon /> Số điện thoại
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>{phone}</Typography>

        <Typography
          sx={{
            mb: 1.5,
            mt: 1.5,
            alignItems: "center",
            display: "flex",
            gap: 1,
            fontSize: "13px",
          }}
          color="text.secondary"
        >
          <EmailOutlinedIcon /> Địa chỉ email
        </Typography>
        <Typography sx={{ fontSize: "14px" }}>{email}</Typography>
      </CardContent>

      <CardActions>
        <Button size="small" onClick={handleEditClick}>
          Chỉnh sửa
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddressCard;
