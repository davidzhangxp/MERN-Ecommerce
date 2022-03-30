import React from "react";
import { useParams } from "react-router-dom";

export const ProductScreen = () => {
  const params = useParams();
  const { slug } = params;

  return (
    <div className="row top">
      <h1>Product Details</h1>
      <div className="col-2"></div>
      <div className="col-1"></div>
      <div className="col-1"></div>
    </div>
  );
};
