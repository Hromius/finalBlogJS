/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';
import * as route from '../routes';

function SignUp({ userRegister, errorRegister, userName }) {
  const {
    register, handleSubmit, getValues, formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    userRegister(data.username, data.email, data.password);
  };

  const signUpClass = (error) => { if (error) return 'error_red'; };
  const navigate = useNavigate();
  if (localStorage.getItem('userKey') && userName) navigate(route.Articles);
  const errorReg = () => {
    if (errorRegister.username && errorRegister.email) {
      return (
        <div className="errorRegisterTwo">
          <div>Данный никнейм уже занят</div>
          <div>Почтовый ящик уже используется</div>
        </div>
      );
    }

    if (errorRegister.username) return (<div className="errorRegister">Данный никнейм уже занят!</div>);
    if (errorRegister.email) {
      return (<div className="errorRegister">Почтовый ящик уже используется!</div>);
    }
  };

  return (
    <>
      <form className="signUp" onSubmit={handleSubmit(onSubmit)}>
        <div className="signUp_text">   Create new account  </div>
        <label className="signUp_form">
          <div>Username</div>
          <input
            type="text"
            className={`signUp_input ${signUpClass(errors.username)}`}
            placeholder="Username"
            {...register(
              'username',
              {
                required: 'Поле обязательно к заполнению',
                minLength: { value: 3, message: 'Минимум 3 символа' },
                maxLength: { value: 20, message: 'Максимум 20 символов' },

              },
            )}
          />
          <div>
            {' '}
            {errors?.username && (
            <p className="signUpError">
              {' '}
              {errors?.username?.message}
              {' '}
            </p>
            )}
            {' '}
          </div>
        </label>

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
                minLength: { value: 5, message: 'Минимум 5 символов' },
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

        <label className="signUp_form">
          <div>Repeat password</div>
          <input
            type="password"
            className={`signUp_input ${signUpClass(errors.passwordRepeat)}`}
            placeholder="Password"
            {...register(
              'passwordRepeat',
              {
                required: 'Поле обязательно к заполнению',
                minLength: { value: 5, message: 'Минимум 5 символов' },
                maxLength: { value: 40, message: 'Максимум 40 символов' },
                validate: () => getValues('password') === getValues('passwordRepeat') || 'Пароли не совпадают!',
              },
            )}
          />
          <div>
            {' '}
            {errors?.passwordRepeat && (
            <p className="signUpError">
              {' '}
              {errors?.passwordRepeat?.message}
              {' '}
            </p>
            )}
            {' '}
          </div>

        </label>

        <div className="signUp_line" />
        <label className="signUp_checkbox">

          <input type="checkbox" {...register('Agree ', { required: { value: true, message: 'Необходимо дать согласие на обработку данных' } })} />
          <div>I agree to the processing of my personal information</div>
        </label>

        <input className="signUp_create" type="submit" disabled={!isValid} />

        <div className="signUp_signIn">
          Already have an account?
          <Link to={route.Signin}> Sign In. </Link>
        </div>

      </form>
      {errorReg()}
    </>
  );
}

const mapStateToProps = (state) => ({
  errorRegister: state.errorRegister,
  userName: state.userName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
