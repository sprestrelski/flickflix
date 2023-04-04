import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="notFound">
            404 Page Not Found. 
            <br></br>
            <br></br>
            <Link to="/">Go home?</Link>
        </div>
    );
  };
  
export default NotFound;