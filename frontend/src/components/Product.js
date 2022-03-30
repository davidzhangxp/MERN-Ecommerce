import { Link } from "react-router-dom";

export const Product = (props) => {
  const { product } = props;
  return (
    <div key={product.slug} className="card">
      <Link to={`/product/${product.slug}`}>
        <img className="media" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <div>
          <strong>${product.price}</strong>
        </div>
        <button type="button">Add To Cart</button>
      </div>
    </div>
  );
};
