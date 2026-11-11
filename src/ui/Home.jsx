import CreateUser from "../features/user/CreateUser";
import { useSelector } from "react-redux";
import Button from "./Button";
function Home() {
  const username = useSelector((store) => store.user.username);
  return (
    <div className="my-10 text-center sm:my-16 md:text-3xl">
      <h1 className="mb-8 text-center text-xl font-bold md:text-3xl sm:my-16">
        The best pizza.
        <br />
        <span className="text-yellow-500">Straight out of the oven, straight to you.</span>
      </h1>
      {!username ? <CreateUser />:<Button to='/menu' type='primary'>Continue Ordering, {username}</Button>}
    </div>
  );
}

export default Home;
