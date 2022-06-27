import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";

import { OrderContext } from "../App";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data, setData } = useContext(OrderContext);
  let navigate = useNavigate();

  const [order, setOrder] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data === null) {
      let _data = [
        {
          order: order,
          menu: [
            {
              name: name,
              price: price,
            },
          ],
        },
      ];
      setData(_data);
    } else {
      let found = data.find((e) => e.order === order);
      if (found) {
        let _data = {
          name: name,
          price: price,
        };

        data.map((item) => ({
          ...item,
          order:
            item.order === order
              ? (item.menu = [...item.menu, _data])
              : item.menu,
        }));
      } else {
        let _data = {
          order: order,
          menu: [
            {
              name: name,
              price: price,
            },
          ],
        };
        setData((item) => [...item, _data]);
      }
    }
    
    setOrder("");
    setName("");
    setPrice("");

    input_order.focus()
    
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const onChangePrice = (event) => {

    let Num = event.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    Num += '';
    Num = Num.replace(',', '');
    let x = Num.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
    Num = x1 + x2

    setPrice(Num);
  }

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  if (!localStorage.getItem("username")) {
    return <>{location.replace("/")}</>;
  }

  return !localStorage.getItem("username") ? (
    location.replace("/")
  ) : (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "gray",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "30rem",
          height: "auto",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          border: "1px solid gray",
          backgroundColor: "white",
        }}
      >
        <div>
          <Typography variant="h4" sx={{ margin: "1rem" }}>
            สั่งอาหาร
          </Typography>
          <Collapse in={open}>
            <Alert severity="success">
              This is a success alert — check it out!
            </Alert>
          </Collapse>
        </div>
        <TextField
          sx={{ marginBottom: "1rem" }}
          required
          InputLabelProps={{ required: false }}
          type="text"
          id="input_order"
          inputProps={{
            autoComplete: "off",
          }}
          label="โต๊ะที่"
          variant="outlined"
          value={order}
          onChange={(even) => setOrder(even.target.value)}
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          required
          InputLabelProps={{ required: false }}
          type="text"
          inputProps={{
            autoComplete: "off",
          }}
          label="เมนู"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          sx={{ marginBottom: "1rem" }}
          required
          InputLabelProps={{ required: false }}
          type="text"
          inputProps={{
            autoComplete: "off",
          }}
          label="ราคา"
          variant="outlined"
          value={price}
          onChange={onChangePrice}
        />
        <Button type="submit" variant="contained">
          สั่ง
        </Button>
        <Button
          variant="outlined"
          onClick={() => navigate("/order")}
          sx={{ marginTop: "3rem" }}
        >
          to go your orders
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleLogout}
          sx={{ marginTop: "3rem" }}
        >
          Logout
        </Button>
      </Box>
    </form>
  );
}

export default Home;
