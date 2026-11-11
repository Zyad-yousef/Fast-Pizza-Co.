// Test ID: IIDSAT

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "./OrderItem";    
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

function Order() {
  const order = useLoaderData();
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const fetcher=useFetcher();
  useEffect(function(){
    if(!fetcher.data&&fetcher.state==="idle")
    fetcher.load('/menu')
  },[fetcher])
  console.log(fetcher.data);
  return (
    <div className="py-6 px-4 space-y-8">
      <div className="flex items-center justify-between flex-wrap ">
        

        <h2 className="text-xl font-semibold">Order # {order.id} status</h2>

        <div className="space-x-2">
          {priority && <span className="bg-red-500 text-red-50 px-3 py-1 rounded-full text-sm font-bold">Priority</span>}
          <span  className="bg-green-500 text-green-50 px-3 py-1 rounded-full text-sm font-bold">{status} order</span>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 bg-stone-200 p-6">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
            <ul className="space-y-1 dive-stone-200">
              {order.cart.map((item) => (
                <OrderItem key={item.pizzaId} item={item} ingredients={fetcher?.data?.find(
        (el) => el.id === item.pizzaId
      )?.ingredients}/>
              ))}
            </ul>
      <div className=" bg-stone-200 p-6">
        <p className="text-sm font-medium text-stone-800">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-sm font-medium text-stone-800">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + (priorityPrice ?? 0))}</p>
        {!priority && <UpdateOrder />}
      </div>
    </div>
  );
}

export async function Loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;

}
export default Order;
