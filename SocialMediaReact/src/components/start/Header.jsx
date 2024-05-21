import React from "react";
import { Link } from "react-router-dom";
import "../../App.css";
const Header = React.memo(() => {
  return (
    <>
      <div className="container-fluid">
        <div className="heading row mt-2">
          <div className="col-sm-6">
            <Link to="/" className="HomePageHeading">
              Social Media
            </Link>
          </div>
          <div className="col-sm-6 d-flex py-1 justify-content-end">
            <Link to={"/login"} className="btn btn-primary mx-2 px-3">
              Login
            </Link>
            <Link to={"/register"} className="btn btn-primary px-3">
              Register
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
});

export default Header;
