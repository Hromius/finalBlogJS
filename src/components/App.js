/* eslint-disable react/react-in-jsx-scope */

import { Route, Routes } from 'react-router-dom';
import SignUp from './sign-up/SignUp';
import Signin from './sign-in/sign-in';
import Articles from './articles/Articles';
import CreateArticle from './create article/CreateArticle';
import Article from './article_page/Article';
import Profile from './profile/Profile';
import Header from './header/Header';
import RedactArticle from './redact article/RedactArticle';
import * as route from './routes';

export default function App() {
  return (
    <Routes>
      <Route path={route.Header} element={<Header />}>
        <Route path={route.Articles} element={<Articles />} />
        <Route path={route.SignUp} element={<SignUp />} />
        <Route path={route.Profile} element={<Profile />} />
        <Route path={route.Signin} element={<Signin />} />
        <Route path={route.Article} element={<Article />} />
        <Route path={route.CreateArticle} element={<CreateArticle />} />
        <Route path={route.RedactArticle} element={<RedactArticle />} />
      </Route>
    </Routes>
  );
}
