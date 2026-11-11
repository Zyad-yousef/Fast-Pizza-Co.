import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity,getTotalCartPtice } from "./cartSlice";
function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPtice = useSelector(getTotalCartPtice);
  return (
    <div className="flex items-center justify-between bg-stone-800 text-sm uppercase text-stone-200 p-4 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalCartQuantity} pizzas</span>
        <span>{totalCartPtice}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
