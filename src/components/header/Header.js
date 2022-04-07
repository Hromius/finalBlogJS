/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Header.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';
import * as route from '../routes';

function Header({
  userName, currentUser, logOut, userImage,
}) {
  useEffect(() => {
    currentUser();
  }, [currentUser, userName]);

  if (localStorage.getItem('userKey') && userName) {
    return (
      <>
        <header>
          <div className="header">
            <Link className="Realworld" to={route.Articles}>Realworld Blog</Link>

            <Link to={route.Profile} className="profile_user">
              <img className="headerAvatar" src={userImage} alt="Avatar" />
              <div className="profile_Username">
                {userName}
                {' '}
              </div>
              <Link to={route.CreateArticle} className="createArticle">Create Article</Link>
            </Link>
            <Link
              to={route.Signin}
              className="log-Out"
              onClick={() => {
                logOut();
                localStorage.setItem('userKey', false);
              }}
            >
              Log Out
            </Link>
          </div>
        </header>
        <Outlet />
      </>
    );
  }
  return (
    <>
      <header>
        <div className="header">

          <Link to={route.Articles} className="Realworld">Realworld Blog</Link>
          <Link to={route.Signin} className="Sign-In">Sign In</Link>
          <Link to={route.SignUp} className="Sign-Up">Sign Up</Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  userImage: state.userImage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
