/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import '../sign-up/SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';
import * as route from '../routes';

function Signin({ userlogin, errorlogin, userName }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    userlogin(data.email, data.password);
  };

  const signUpClass = (error) => { if (error) return 'error_red'; };
  const loginFalse = () => {
    if (errorlogin) return (<div className="errorRegister">Неверный логин или пароль!</div>);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('userKey') && userName) navigate(route.Articles);
  }, [navigate, userName]);

  return (
    <>
      <form className="login" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUp_text">   Sign In  </div>

        <label className="signUp_form">
          <div>Email address</div>
          <input
            type="email"
            className={`signUp_input ${signUpClass(errors.email)}`}
            placeholder="Email address"
            {...register(
              'email',
              {
                required: 'Поле обязательно к заполнению',
                pattern: { value: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, message: 'Некорректный Email' },
              },
            )}
          />
          <div>
            {' '}
            {errors?.email && (
            <p className="signUpError">
              {' '}
              {errors?.email?.message}
              {' '}
            </p>
            )}
            {' '}
          </div>
        </label>

        <label className="signUp_form">
          <div>Password</div>
          <input
            type="password"
            className={`signUp_input ${signUpClass(errors.password)}`}
            placeholder="Password"
            {...register(
              'password',
              {
                required: 'Поле обязательно к заполнению',
                minLength: { value: 5, message: 'Минимум 5 символа' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
              },
            )}
          />
          <div>
            {' '}
            {errors?.password && (
            <p className="signUpError">
              {' '}
              {errors?.password?.message}
              {' '}
            </p>
            )}
            {' '}
          </div>
        </label>

        <input className="sign_In" type="submit" disabled={!isValid} />

        <div className="signUp_signIn">
          Don’t have an account?
          <Link to={route.SignUp}>Sign Up</Link>
        </div>

      </form>
      {loginFalse()}
    </>
  );
}

const mapStateToProps = (state) => ({
  errorlogin: state.errorlogin,
  userName: state.userName,

});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
