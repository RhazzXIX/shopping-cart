import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { product } = props;
  return (
    <div className="card">
      <img src={product.images[0]} alt={product.title} />
      <h4>{product.title}</h4>
      <p>$ {product.price}.00</p>
      <button className="viewDetails">View Details</button>
    </div>
  );
};

export default ProductCard;
