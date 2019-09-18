import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/loginActions';

class Header extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }
  render() {
    const { isAuthenticated } = this.state;

    return (
      <nav
        className="navbar navbar-transparent navbar-color-on-scroll fixed-top navbar-expand-lg"
        color-on-scroll={100}
        id="sectionsNav"
      >
        <div className="container">
          <div className="navbar-translate">
            <Link to="/">
              <a href="" className="navbar-brand" style={{ color: '#ffff' }}>
                Exam Paper Online{' '}
              </a>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="sr-only">Toggle navigation</span>
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
              <span className="navbar-toggler-icon" />
            </button>
          </div>
          <div className="collapse navbar-collapse">
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/dashboard">
                    <div className="nav-link" style={{ cursor: 'pointer' }}>
                      <i className="material-icons">layers</i> Dashboard
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user">
                    <div className="nav-link" style={{ cursor: 'pointer' }}>
                      <i className="material-icons">layers</i> Profile
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link"
                    onClick={this.props.logoutUser}
                    style={{ cursor: 'pointer' }}
                  >
                    <i className="material-icons">layers</i> Log Out
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login">
                    <div className="nav-link" style={{ cursor: 'pointer' }}>
                      <i className="material-icons">layers</i> Log In
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">
                    <div className="nav-link" style={{ cursor: 'pointer' }}>
                      <i className="material-icons">layers</i> Sign Up
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link" style={{ cursor: 'pointer' }}>
                    <a href="#about">
                      <i className="material-icons">layers</i> About Us
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" style={{ cursor: 'pointer' }}>
                    <a href="#contact">
                      <i className="material-icons">layers</i> Contact Us
                    </a>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.login.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);
