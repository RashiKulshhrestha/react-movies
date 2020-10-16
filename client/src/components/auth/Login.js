import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "./auth.css";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  const { email, password } = formData;
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container">
      <h1 className="heading-h1">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign Into Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/Register">Sign Up</Link>
      </p>
    </div>
  );
};
Login.prototype = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateProps, { login })(Login);