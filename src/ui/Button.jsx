
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Button({ children, disabled, to, type,onClick }) {
  const styles = {
    primary:
      "focus:ring-yellow-300 inline-block rounded-full bg-yellow-500 px-3 py-4 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-300 disabled:text-stone-500 sm:px-6 sm:py-4",

    small:
      "focus:ring-yellow-300 inline-block rounded-full bg-yellow-500 px-3 py-2 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-yellow-300 disabled:text-stone-500 sm:px-4 sm:py-2",

    secondary:
      "focus:ring-yellow-300 inline-block rounded-full bg-stone-800 px-3 py-2 font-semibold uppercase tracking-wide text-stone-200 transition-colors duration-300 hover:bg-stone-700 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-stone-700 disabled:text-stone-500 sm:px-4 sm:py-2",
    round:"rounded-full bg-stone-200 px-1 ml-2"  
  };

  const className = styles[type] || styles.primary;

  if (to)
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
    if(onClick) return (
    <button disabled={disabled} className={className} onClick={onClick}>
      {children}
    </button>
  );
  return (
    <button disabled={disabled} className={className} >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  to: PropTypes.string,
  type: PropTypes.oneOf(["primary", "small", "secondary", "round"]),
  onClick:PropTypes.func,
};

export default Button;
