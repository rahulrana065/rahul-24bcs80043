import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, removeItem } from "../features/cartSlice";

export default function Cart() {
  const cart = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> :
        cart.map(i => (
          <div key={i.id} className="cart-item">
            <span>{i.name} (${i.price})</span>
            <div>
              <button onClick={() => dispatch(decrease(i.id))}>-</button>
              <span>{i.qty}</span>
              <button onClick={() => dispatch(increase(i.id))}>+</button>
              <button onClick={() => dispatch(removeItem(i.id))}>x</button>
            </div>
          </div>
        ))
      }
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
}
