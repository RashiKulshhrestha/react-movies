import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import "./auth.css";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  //const { name, email, password, password2 } = formData;
  const onChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert("Password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  const { name, email, password, password2 } = formData;
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="container">
      <h1 className="heading-h1">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
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
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateProps, { register })(Register);