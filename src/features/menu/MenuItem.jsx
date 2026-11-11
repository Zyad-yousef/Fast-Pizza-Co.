import PropTypes from "prop-types";
import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { addItem,getCurrentQuantityById } from "../cart/cartSlice";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";

function MenuItem({ pizza }) {
  const {id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch=useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  function handleAddItem(){
    const newItem={
        pizzaId:id,
        name,
        quantity:1,
        unitPrice,
        totalPrice:unitPrice*1,

    }
    dispatch(addItem(newItem))
  }
  return (
    <li className={`flex gap-4 border-b border-stone-200 py-4 ${soldOut ? "opacity-50" : ""}`}>
      <img src={imageUrl} alt={name} className="h-24 "/>
      <div className="flex flex-col grow">
        <p className="font-medium">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">{ingredients.join(", ")}</p>
        <div className="mt-auto flex items-center justify-between gap-4">
        
          {!soldOut ? <><p className='text-sm uppercase'>{formatCurrency(unitPrice)}</p> {currentQuantity>0&&<div className="flex justify-center items-center"><UpdateItemQuantity pizzaId={id} currentQuantity={currentQuantity}/><DeleteItem pizzaId={id}>delete from cart</DeleteItem> </div>}</>: <p>Sold out</p>}
          {!soldOut &&currentQuantity<=0&& <Button type="small" onClick={handleAddItem}>add to cart</Button>}
        </div>
      </div>
    </li>
  );
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuItem;
