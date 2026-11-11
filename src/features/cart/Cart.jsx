import { Link } from 'react-router-dom';
import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';
function Cart() {
  const username=useSelector(store=>store.user.username)
  const cart=useSelector(getCart);
  const dispatch=useDispatch();
  if(cart.length==0)return <EmptyCart/>
  return (
    <div className="py-3 px-4">
      <LinkButton to="/menu">Back to menu</LinkButton>

      <h2 className="text-2xl font-semibold text-stone-800 mt-10">Your cart, {username}</h2>
      <ul className="my-8">
        {cart.map((item) => (
          <CartItem key={item.pizzaId} item={item} />
        ))}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button to="/order/new" type="primary">Order pizzas</Button>
 
        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
