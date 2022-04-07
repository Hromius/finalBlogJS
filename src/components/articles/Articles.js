/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */

import './Articles.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Pagination } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { lengthoverview } from '../helper';
import * as actions from '../../redux/action';
import * as route from '../routes';

function Articles({
  articles, loadArticles, send, articlesCount, userName, favoritesPost, favoritesDelete, page,
}) {
  let idTag = 0;

  useEffect(() => {
    send();
  }, [send]);

  const favorites = (count, slug, favorite) => {
    if (localStorage.getItem('userKey') && userName) {
      return (
        <label onClick={() => {
          favorite ? favoritesDelete(slug).then(() => send(page)) : favoritesPost(slug).then(() => send(page));
        }}
        >
          <HeartTwoTone className="content_like like" twoToneColor={favorite ? '#ff1818' : '#47cff8'} />
          <span>
            {' '}
            {count}
          </span>
        </label>
      );
    }
    return (
      <label>
        <HeartTwoTone className="content_like" twoToneColor="#838383" />
        <span>
          {' '}
          {count}
        </span>
      </label>
    );
  };

  const articlesBlock = () => {
    if (loadArticles) {
      return articles.map((item) => (
        <div className="content" key={item.slug}>
          <div className="title">
            <Link to={`${route.Articles}/${item.slug}`}>{lengthoverview(item.title, 15)}</Link>
            {favorites(item.favoritesCount, item.slug, item.favorited)}
          </div>
          <div className="content_profile">
            <div>
              <div className="content_nick">{item.author.username}</div>
              <img className="content_profile_avatar" src={item.author.image} alt="Avatar" />
            </div>
            <div className="content_data">
              {` ${new Date(item.createdAt).getMonth() + 1}.${new Date(item.createdAt).getDate()}.${new Date(item.createdAt).getFullYear()}`}
            </div>
          </div>
          <div className="content_containerTags">
            {item.tagList.map((item) => (
              <span className="content_tag" key={idTag++}>
                {item}
                {' '}
              </span>
            ))}
          </div>
          <div className="content_text">
            {lengthoverview(item.description, 50)}
          </div>
        </div>
      ));
    }
  };

  return (
    <div>
      {articlesBlock()}
      <Pagination className="pagination" defaultCurrent={1} total={articlesCount} pageSize={5} onChange={send} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  articles: state.articles.articles,
  articlesCount: state.articles.articlesCount,
  loadArticles: state.loadArticles,
  userName: state.userName,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
