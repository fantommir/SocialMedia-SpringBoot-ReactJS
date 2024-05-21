import { Link } from "react-router-dom";
import { sideBarItems } from "../../store/sidebarItems";
import InstagramSidebarLogo from "./InstagramSidebarLogo";
import React, { useEffect } from "react";
import SidebarPaths from "./SidebarPaths";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../../store/TokenUserSlice";
const SideBar = React.memo(() => {
  const user = useSelector((store) => store.tokenUser.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  const handleTokenReset = () => {
    localStorage.removeItem("token");
  };
  return (
    <div className="col-md-2 col-sm-3">
      <div className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark">
        <InstagramSidebarLogo />
        <hr />
        <div className="mb-auto hrSidebar">
          {sideBarItems.map((item, index) => (
            <SidebarPaths key={index} item={item} />
          ))}
        </div>
        <hr />
        <div className="dropdown">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {user && (
              <img
                src={`data:image/jpeg;base64,${user?.profile}`}
                alt=""
                width="32"
                height="32"
                className="rounded-circle me-2 profilePic"
              />
            )}
            <strong>{user?.name}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li>
              <Link to="/profile" className="dropdown-item">
                Profile
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                to="/login"
                className="dropdown-item"
                onClick={handleTokenReset}
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
});
export default SideBar;
