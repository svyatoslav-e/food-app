import { currencyFormatter } from "../util/formatting";

export default function CartItem({ item, onDecrease, onIncrease}) {

    
    return (
        <li className="cart-item ">
            <p>{item.name} - {item.quantity} x {currencyFormatter(item.price)}</p>
            <p className="cart-item-actions ">
                <button onClick={onDecrease}>-</button>
                <span>QTY: {item.quantity}</span>
                <button onClick={onIncrease}>+</button>
            </p>
        </li>
    );
}