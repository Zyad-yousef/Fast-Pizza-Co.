import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import PropTypes from "prop-types";
function DeleteItem({pizzaId,children}) {
    const dispatch=useDispatch();
    return (
        <Button type="secondary" onClick={()=>dispatch(deleteItem(pizzaId))}>{children}</Button>
    )
}

export default DeleteItem;

DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  children:PropTypes.node.isRequired,
};