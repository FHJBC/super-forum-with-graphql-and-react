import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { gql, useQuery } from '@apollo/client';
import { ThreadCategoriesType } from './store/categories/Reducer';
import './App.css';
import Home from "./components/routes/Home";
import Thread from './components/routes/thread/Thread';
import UserProfile from './components/routes/userProfile/UserProfile';
import useRefreshReduxMe from './hooks/useRefreshReduxMe';

const GetAllCategories = gql`
  query getAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

function App() {
  const { data: categoriesData } = useQuery(GetAllCategories);
  const { execMe, updateMe } = useRefreshReduxMe();
  const dispatch = useDispatch();

  useEffect(() => {
    execMe();
  }, [execMe]);

  useEffect(() => {
    updateMe();
  }, [updateMe]);

  useEffect(() => {
    if (categoriesData && categoriesData.getAllCategories) {
      dispatch({
        type: ThreadCategoriesType,
        payload: categoriesData.getAllCategories,
      });
    }
  }, [dispatch, categoriesData]);

  // const renderHome = (props: any) => <Home {...props} />;
  // const renderThread = (props: any) => <Thread {...props} />;
  // const renderUserProfile = (props: any) => <UserProfile {...props} />;

  return (
    <Routes>
      {/* <Route exact={true} path="/" render={renderHome} /> */}
      <Route path="/" element={<Home />} />

      {/* <Route path="/categorythreads/:categoryId" render={renderHome} /> */}
      <Route
        path="/categorythreads/:categoryId"
        element={<Home />}
      />

      {/* <Route path="/thread/:id?" render={renderThread} /> */}
      <Route
        path="/thread/:id?"
        element={<Thread />}
      />


      {/* <Route path="/userprofile/:id" render={renderUserProfile} /> */}
      <Route
        path="/userprofile/:id"
        element={<UserProfile />}
      />

    </Routes>
  );
}

export default App;
