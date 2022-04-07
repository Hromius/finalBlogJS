/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.css';
import { dataFilter } from '../helper';
import * as actions from '../../redux/action';
import * as route from '../routes';

function PageArticle({ createArticle, send }) {
  let [number, setNumber] = useState(1);
  let [tags, setTags] = useState([
    { id: number },
  ]);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    const article = (dataFilter(data, tags));
    createArticle(article)
      .then(() => send())
      .then(() => navigate(route.Articles));
  };

  const deliteTag = (id) => {
    const newTags = tags.filter((item) => {
      if (item.id === id) return false;
      return true;
    });
    setTags(newTags);
  };

  const tagInput = tags.map((item) => (

    <div className="tagBlock" key={item.id}>
      <input
        type="text"
        className="CA_tagsInput"
        placeholder="  Tag"
        {...register(`${item.id}`)}
      />
      <div className="deliteTag" onClick={() => { deliteTag(item.id); }}> Удалить Тег</div>
    </div>
  ));

  return (
    <form className="createPage" onSubmit={handleSubmit(onSubmit)}>

      <div className="CA_name">Create new article</div>
      <div className="CA_form">
        <div className="CA_title">Title</div>

        <input
          type="text"
          className="CA_title_input"
          placeholder="  Title"
          {...register(
            'title',
            { required: 'Поле обязательно к заполнению' },
          )}
        />
        <div>
          {' '}
          {errors?.title && (
          <p className="signUpError">
            {' '}
            {errors?.title?.message}
            {' '}
          </p>
          )}
          {' '}
        </div>

        <div className="CA_shortDescription">Short description</div>

        <input
          type="text"
          className="CA_title_input"
          placeholder="  Short description"
          {...register(
            'description',
            { required: 'Поле обязательно к заполнению' },
          )}
        />
        <div>
          {' '}
          {errors?.description && (
          <p className="signUpError">
            {' '}
            {errors?.description?.message}
            {' '}
          </p>
          )}
          {' '}
        </div>

        <div className="CA_text">Text</div>

        <textarea
          type="text"
          className="CA_textInput"
          placeholder="  Body"
          {...register(
            'body',
            { required: 'Поле обязательно к заполнению' },
          )}
        />
        <div>
          {' '}
          {errors?.body && (
          <p className="signUpError">
            {' '}
            {errors?.body?.message}
            {' '}
          </p>
          )}
          {' '}
        </div>

        <div className="CA_tags">
          Tags
          <div
            className="addTag"
            onClick={() => {
              setNumber(number += 1);
              setTags(tags = [...tags, { id: number }]);
            }}
          >
            {' '}
            Добавить Тег

          </div>
        </div>
        {tagInput}

      </div>
      <input className="send" type="submit" disabled={!isValid} />
    </form>
  );
}
const mapStateToProps = (state) => ({
  userToken: state.userToken,
  userName: state.userName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageArticle);
