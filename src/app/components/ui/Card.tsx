"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "@/generated/prisma";
import { useState } from "react";
import { useEffect } from "react";

export default function MediaCard(item: Product) {
  const { id, name, description, imageUrl, price, stock } = item;
  const [tokenString, setTokenString] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenString = token || "";
    setTokenString(tokenString);
  }, []);

  function buyItemHandler(
    productId: string,
    productName: string,
    productPrice: number
  ) {
    fetch("/api/products/buy", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        productName: productName,
        productPrice: productPrice,
        ammount: 1,
        clientId: tokenString,
      }),
    });
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        src={imageUrl || undefined}
        component="img"
        alt={name}
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Price per unit: {price}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Stock: {stock}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="large"
          color="success"
          variant="contained"
          onClick={() => buyItemHandler(id, name, price)}
        >
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
