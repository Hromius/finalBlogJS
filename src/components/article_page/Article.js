/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Article.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactMarkdown from 'react-markdown';
import * as actions from '../../redux/action';
import * as route from '../routes';

function Article({
  getNeedArticles, articles, loadNeedArticles, userName, deleteArticle,
}) {
  const [flag, setFlag] = useState(false);
  const id = useParams();
  let idTag = 0;
  const navigate = useNavigate();

  useEffect(() => {
    getNeedArticles(id.slug);
  }, [getNeedArticles, id.slug]);

  const deleteMenu = () => {
    if (flag) {
      return (
        <div className="deleteMenu">
          <div>Вы уверены, что хотите удалить статью?</div>
          <div onClick={() => { deleteArticle(id.slug).then(() => navigate(route.Articles)); }}>Да</div>
          <div onClick={() => { setFlag(false); }}>Нет</div>
        </div>
      );
    }
  };

  const redactPanel = (nameUser, nameOwnerArticle) => {
    if (nameUser === nameOwnerArticle) {
      return (
        <div className="redact">
          <div className="deleteArticle" onClick={() => { setFlag(true); }}>Удалить</div>
          <Link className="redactArticle" to={`${route.Articles}/${id.slug}/edit`}>Изменить</Link>
          {deleteMenu()}
        </div>
      );
    }
  };

  const oneArticles = () => {
    if (loadNeedArticles) {
      const {
        title, author, description, body, tagList, createdAt,
      } = articles.article;
      return (
        <div className="page">
          <div>
            <div className="page_top">
              <div className="page_title">{title}</div>
              <div className="page_profile">
                <div className="content_nick">{author.username}</div>
                <img className="content_profile_avatar" src={author.image} alt="Avatar" />
                {redactPanel(userName, author.username)}
                <div className="content_data">{`${new Date(createdAt).getMonth() + 1}.${new Date(createdAt).getDate()}.${new Date(createdAt).getFullYear()}`}</div>
              </div>
            </div>
            <div className="page_tag">
              {tagList.map((item) => (
                <span className="content_tag" key={idTag++}>
                  {item}
                  {' '}
                </span>
              ))}

            </div>
          </div>
          <div className="page_description_controlPanel">
            <div className="page_description">
              {' '}
              {description}
            </div>

          </div>
          <div className="page_text">
            <ReactMarkdown>{body}</ReactMarkdown>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {oneArticles()}
    </>
  );
}

const mapStateToProps = (state) => ({
  articles: state.needArticles,
  loadNeedArticles: state.loadNeedArticles,
  userName: state.userName,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Article);
