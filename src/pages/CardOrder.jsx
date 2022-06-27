import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

import { OrderContext } from "../App";
import { useNavigate } from "react-router-dom";

function CardOrder() {
  const { data, setData } = useContext(OrderContext);
  let navigate = useNavigate();

  function sum(menu) {
    let sum = 0;
    menu.forEach((item, index) => {
      sum += parseInt(item.price.replace(',', ''));
    });
    sum += '';
    sum = sum.replace(',', '');
    let x = sum.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1))
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    sum = x1 + x2;
    return sum;
  }

  if(!localStorage.getItem('username')){
    return <>{location.replace('/')}</>
  }

  return (
    <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {data !== null ? (
            data.map((item, index) => {
              let result = sum(item.menu);

              return (
                <Card key={index} sx={{ maxWidth: 345, margin: "1rem" }}>
                  <CardActionArea>
                    <CardContent>
                      <div>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{ textDecoration: "underline" }}
                        >
                          โต๊ะที่ {item.order}
                        </Typography>
                      </div>
                      <div>
                        <List
                          sx={{
                            width: "100%",
                            maxWidth: 360,
                            bgcolor: "background.paper",
                          }}
                        >
                          {item.menu.map((value, index) => (
                            <ListItem
                              key={index}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <div style={{ paddingRight: "2rem" }}>
                                <ListItemText primary={value.name} />
                              </div>
                              <div>
                                <ListItemText primary={`${value.price} บาท`} />
                              </div>
                            </ListItem>
                          ))}
                        </List>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography sx={{ fontWeight: "bold" }}>
                            รวม {result} บาท
                          </Typography>
                        </div>
                      </div>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          ) : (
            <h1>Not found your orders</h1>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            onClick={() => navigate("/home")}
            sx={{ marginTop: "3rem" }}
          >
            ไปสั่งอาหาร
          </Button>
        </div>
    </>
  );
}

export default CardOrder;
