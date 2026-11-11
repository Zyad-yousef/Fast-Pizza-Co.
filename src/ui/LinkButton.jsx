import PropTypes from "prop-types";
import { Link,useNavigate } from "react-router-dom";

function LinkButton({children,to}) {
    const className="text-sm text-blue-500 hover:text-blue-900 hover:underline"
     const navigate = useNavigate();
    if(to === "-1") return <button onClick={() => navigate(-1)} className={className}>
        {children}
    </button>
    return (
             <Link to={to} className={className}>
                 {children}
             </Link>
    )
}

export default LinkButton;
LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};