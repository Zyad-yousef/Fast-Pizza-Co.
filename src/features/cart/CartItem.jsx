import Button from "../../ui/Button";
import {formatCurrency} from "../../utils/helpers"
import PropTypes from "prop-types";
import DeleteItem from "./DeleteItem";
import UpdateItemQuantity from "./UpdateItemQuantity";
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  return (
    <li className="py-3" key={pizzaId}>
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={quantity} />
       <DeleteItem pizzaId={pizzaId}>delete</DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
};