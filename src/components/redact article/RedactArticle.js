/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
/* eslint-disable prefer-const */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';
import '../create article/CreateArticle.css';
import { dataFilter } from '../helper';
import * as route from '../routes';

function RedactArticle({
  getNeedArticles, articles, loadNeedArticles, updateArticle,
}) {
  let [number, setNumber] = useState(1);
  let [tags, setTags] = useState([
    { id: number },
  ]);
  const navigate = useNavigate();
  const id = useParams();
  useEffect(() => {
    getNeedArticles(id.slug);
  }, [getNeedArticles, id.slug]);
  useEffect(() => {
    if (articles.length !== 0) {
      const { length } = articles.article.tagList;

      for (let i = 0; i < length; i++) {
        setNumber(number += 1);
        setTags(tags = [...tags, { id: number }]);
      }
    }
  }, []);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
  const onSubmit = (data) => {
    const article = (dataFilter(data, tags));
    updateArticle(article, id.slug).then(() => navigate(route.Articles));
  };

  const deliteTag = (id) => {
    const newTags = tags.filter((item) => {
      if (item.id === id) return false;
      return true;
    });
    setTags(newTags);
  };

  const tagInput = tags.map((item) => {
    if (articles.article === undefined) return (<></>);
    return (
      <div className="tagBlock" key={item.id}>
        <input
          type="text"
          className="CA_tagsInput"
          defaultValue={articles.article.tagList[item.id - 1]}
          placeholder="tag"
          {...register(`${item.id}`)}
        />
        <div className="deliteTag" onClick={() => { deliteTag(item.id); }}> Удалить Тег</div>
      </div>
    );
  });

  const redactPage = () => {
    if (loadNeedArticles) {
      return (
        <form className="createPage" onSubmit={handleSubmit(onSubmit)}>

          <div className="CA_name">Edit article</div>
          <div className="CA_form">
            <div className="CA_title">Title</div>
            <label>
              <input
                type="text"
                className="CA_title_input"
                defaultValue={articles.article.title}
                placeholder="title"
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
            </label>

            <div className="CA_shortDescription">Short description</div>
            <label>
              <input
                type="text"
                className="CA_title_input"
                placeholder="Short description"
                defaultValue={articles.article.description}
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
            </label>

            <div className="CA_text">Text</div>
            <label>
              <textarea
                type="text"
                className="CA_textInput"
                placeholder="body"
                defaultValue={articles.article.body}
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
            </label>

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
  };

  return (
    <>
      {redactPage()}
    </>
  );
}
const mapStateToProps = (state) => ({
  articles: state.needArticles,
  loadNeedArticles: state.loadNeedArticles,
  userName: state.userName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RedactArticle);
