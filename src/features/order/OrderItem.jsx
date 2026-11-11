import { formatCurrency } from "../../utils/helpers";
import PropTypes from "prop-types";
function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-3" key={item.pizzaId}>
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <p className="text-sm capitalize italic text-stone-500">
  {isLoadingIngredients
    ? "Loading..."
    : ingredients?.join(", ") ?? "No ingredients available"}
</p>
      </div>
    </li>
  );
}

export default OrderItem;

OrderItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.arrayOf(PropTypes.string),
};