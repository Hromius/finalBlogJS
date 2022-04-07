/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';
import './profile.css';

function Profile({ updateUser, updateError }) {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    updateUser(data);
  };
  const errorPanel = () => {
    if (!updateError) return;
    if (updateError.errors.username && updateError.errors.email) {
      return (
        <div className="errorRegisterTwo">
          <div>Данный никнейм уже занят</div>
          <div>Почтовый ящик уже используется</div>
        </div>
      );
    }
    if (updateError.errors.username) return (<div className="errorRegister">Данный никнейм уже занят!</div>);
    if (updateError.errors.email) {
      return (<div className="errorRegister">Почтовый ящик уже используется!</div>);
    }
  };

  return (

    <div className="profilePage">
      {errorPanel()}
      <div className="profilePage_redact">Редактирование профиля</div>

      <form className="login" onSubmit={handleSubmit(onSubmit)}>

        <label className="signUp_form">
          <div>Имя пользователя</div>
          <input
            type="text"
            className=""
            placeholder="username"
            {...register(
              'username',
              {
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
            className=""
            placeholder="Email address"
            {...register(
              'email',
              {
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
            className=""
            placeholder="Password"
            {...register(
              'password',
              {
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
          <div>URL Image</div>
          <input
            type="text"
            className=""
            placeholder="URL Image"
            {...register(
              'image',
              {
                pattern: { value: /^https?:\S+(?:jpg|jpeg|png)$/, message: 'Некорректный URL' },
              },
            )}
          />
          <div>
            {' '}
            {errors?.image && (
            <p className="signUpError">
              {' '}
              {errors?.image?.message}
              {' '}
            </p>
            )}
            {' '}
          </div>
        </label>

        <input className="signUp_create" type="submit" disabled={!isValid} />

      </form>

    </div>
  );
}

const mapStateToProps = (state) => ({
  userToken: state.userToken,
  userName: state.userName,
  updateError: state.updateError,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
