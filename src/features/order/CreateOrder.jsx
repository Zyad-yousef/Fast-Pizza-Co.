/* eslint-disable react-refresh/only-export-components */
import { Form, redirect, useNavigation } from "react-router-dom";
import { createOrder } from "./../../services/apiRestaurant";
import { useActionData } from "react-router-dom";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { getCart,clearCart } from "../cart/cartSlice";
import EmptyCart from "./../cart/EmptyCart"
import store from "../../store"
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitted = navigation.state === "submitting";
  const formErrors = useActionData();
  const dispatch=useDispatch()
  const {username,
    status:addressStatus,
    position,
    address,
    errors:addressError,
  }=useSelector(store=>store.user)
  const isLoadingAddress=addressStatus==="loading"
  if(!cart)return <EmptyCart/>
  return (
    <div className="py-4 px-6">
      <h2 className="text-2xl font-bold text-stone-800">
        {"Ready to order? Let's go!"}
      </h2>
      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">First Name</label>
          <input type="text" name="customer" required className="input" defaultValue={username} />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />
          {formErrors?.phone && <p className="text-red-500 text-sm mt-4 bg-red-100">{formErrors.phone}</p>}
          </div>
        </div>

        <div className=" relative mb-5 flex gap-2 flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input"
              defaultValue={address}
              disabled={isLoadingAddress}
            />
            {addressStatus === "error" && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                Could not get your position: {addressError}
              </p>
            )}
          </div>
         {(position.latitude == null || position.longitude == null) && <span className="absolute right-[3px] top-[20px]"> 
      <Button type="small"disabled={isLoadingAddress} onClick={(e)=>{e.preventDefault();dispatch(fetchAddress())}}>Get Position </Button>
</span>}
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button
            disabled={isSubmitted}
            type="primary"
          >
            {isSubmitted ? "Placing your order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on" ? true : false,
  };
  const errors = {};
  if (isValidPhone(order.phone) === false) {
    errors.phone =
      "Please give a valid phone number, we might need to reach you for delivery!";
  }
  console.log(order);
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart())
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
