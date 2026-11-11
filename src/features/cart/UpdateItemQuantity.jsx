import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { decreaseItem, increaseItem } from "./cartSlice";

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  return (
    <div>
      <Button
        type="round"
        onClick={() => dispatch(decreaseItem(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-semibold ml-1">{currentQuantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

UpdateItemQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  currentQuantity: PropTypes.number.isRequired,
};