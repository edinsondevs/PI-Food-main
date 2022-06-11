import "../../Styles/LeadingPage.css";
import { Link } from "react-router-dom";


const Init = () => {
  return (
    <div className="init ">
      <Link to="/home" className="init-link slide-in-elliptic-top-fwd">Home</Link>
    </div>
  );
};

export default Init;
