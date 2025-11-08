import { useDispatch } from "react-redux";
import { addItem } from "../features/cartSlice";

const products = [
  { id: 1, name: "MacBook Air M3", price: 1099 },
  { id: 2, name: "HP Spectre x360", price: 1249 },
  { id: 3, name: "Dell XPS 13", price: 999 },
  { id: 4, name: "ASUS Zenbook 14", price: 1095 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div className="product-container">
      <h2>Available Products</h2>
      <div className="product-list">
        {products.map(p => (
          <div key={p.id} className="card">
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <button onClick={() => dispatch(addItem(p))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
