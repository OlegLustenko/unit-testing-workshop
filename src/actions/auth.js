// @flow

// import api from 'services/api';
// import {
//   AuthenticationToken,
//   EncryptToken,
//   UserProfile
// } from '../models/tokens';

// import {
//   AUTH_USER,
//   USER_INFO
// } from './types';
// import { SERVERNOTRESPOND } from '../server_error_statuses';

export const signinUserCreator = (
  api: any,
  AuthenticationToken: any,
  EncryptToken: any,
  UserProfile: any
) => (
  AUTH_USER: string,
  USER_INFO: string,
  SERVERNOTRESPOND: {},
  authError: Function
) => (
  { user, password }: { user: string, password: string },
  redirect: Function
) => {
  return (dispatch: Function) => {
    // Submit user/password to server

    const signInStatus = api.signin({
      user,
      password
    });

    if (signInStatus.status === 'success') {
      // if request is good...
      const { user: userInfo, token: accessToken } = signInStatus.message;
      // -- Update State to indicate is authenticated
      dispatch({
        type: AUTH_USER,
        payload: { accessToken }
      });
      dispatch({
        type: USER_INFO,
        payload: { userInfo }
      });
      // -- Save the JWT token
      const encryptedToken = new EncryptToken(accessToken);
      const parsedUser = new UserProfile(userInfo);
      AuthenticationToken.setToken('token', encryptedToken);
      AuthenticationToken.setToken('user', parsedUser);
      // -- redirect to the  router '/feature'
      redirect();
    } else if (signInStatus.message === SERVERNOTRESPOND) {
      // if server is down ..
      dispatch(authError("Can't connect to server, try later"));
    } else {
      // if request is bad ..
      // - Show an error to the user
    }
  };
};
dispatch(authError(signInStatus.message));

export const signInUser = signinUserCreator({});
