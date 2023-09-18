import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { getUrlInSearch } from "../utils/utils";

const Navbar = (): React.ReactElement => {
  const [formData, setFormData] = useState({
    requestUrl: "",
    isSearch: false,
  });
  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      requestType: { value: string };
    };
    const request = getUrlInSearch(target.requestType.value);
    const formData = { requestUrl: request ?? "/", isSearch: true };
    setFormData(formData);
  };

  if (formData.isSearch === true) {
    return <Navigate to={formData.requestUrl} />;
  }

  return (
    <nav className="navbar navbar-inverse navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <span className="icon-bar"></span>
          <Link to="/" className="navbar-brand">
            Ether Block Explorer
          </Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            <form className="navbar-form navbar-right" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tx Hash, Address or Block number"
                  name="requestType"
                  required
                  className="form-control"
                />
                <br />
              </div>
              <button type="submit" className="btn btn-success">
                Search
              </button>
            </form>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
