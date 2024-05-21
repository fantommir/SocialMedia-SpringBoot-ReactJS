import React from "react";
import { Link } from "react-router-dom";
const SidebarPaths = React.memo(({ item }) => {
  return (
    <>
      {item.path != null ? (
        <div className="sidebarAllItems">
          <Link to={item.path} className="nav-link text-light">
            <span>
              <i className={`${item.icon} SideIcons`}></i>
            </span>
            <span className="SideIconsText">{item.title}</span>
          </Link>
        </div>
      ) : (
        <>
          <div className="sidebarAllItems">
            <button
              className="nav-link text-light"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdropNotification"
            >
              <span>
                <i className={`${item.icon} SideIcons`}></i>
              </span>
              <span className="SideIconsText">{item.title}</span>
            </button>
          </div>
        </>
      )}
      <hr />
    </>
  );
});

export default SidebarPaths;

{
  /* <div
              className="offcanvas offcanvas-start text-white"
              tabIndex="-1"
              id="offcanvasNavbarLight"
              aria-labelledby="offcanvasNavbarLightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLightLabel">
                  Search
                </h5>
                <button
                  type="button"
                  className="btn-close text-white"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <RxCross1 />
                </button>
              </div>
              <div className="offcanvas-body ">
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <AllUsersCanvas />
            </div> */
}
