/* eslint-disable react-refresh/only-export-components */
import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary" disabled={fetcher.state !== "idle"}>
        {fetcher.state !== "idle" ? "Updating..." : "Make priority"}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}