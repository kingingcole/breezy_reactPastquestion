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
        className="navbar fixed-top navbar-expand-lg"
        color-on-scroll={100}
        id="myNavbar"
      >
        <div className="container">
          <div className="navbar-translate">
            <Link to="/">
              <a href="" className="navbar-brand" style={{ color: '#fff' }}>
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
                    <div
                      className="nav-link"
                      style={{ cursor: 'pointer', color: '#fff' }}
                    >
                      <i className="fas fa-tachometer-alt"></i> Dashboard
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/user">
                    <div
                      className="nav-link"
                      style={{
                        cursor: 'pointer',
                        color: '#fff',
                        textDecoration: 'none'
                      }}
                    >
                      <i className="fas fa-user"></i> Profile
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <div
                    className="nav-link"
                    onClick={this.props.logoutUser}
                    style={{ cursor: 'pointer', color: '#fff' }}
                  >
                    <i className="fas fa-sign-out-alt"></i> Log Out
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login">
                    <div
                      className="nav-link"
                      style={{ cursor: 'pointer', color: '#fff' }}
                    >
                      <i className="fas fa-sign-in-alt"></i> Log In
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">
                    <div
                      className="nav-link"
                      style={{ cursor: 'pointer', color: '#fff' }}
                    >
                      <i className="fas fa-user-plus"></i> Sign Up
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <div className="nav-link" style={{ cursor: 'pointer' }}>
                    <a href="#about" style={{ color: '#fff' }}>
                      <i className="fas fa-file"></i> About Us
                    </a>
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" style={{ cursor: 'pointer' }}>
                    <a href="#contact" style={{ color: '#fff' }}>
                      <i className="fa fa-phone"></i> Contact Us
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
