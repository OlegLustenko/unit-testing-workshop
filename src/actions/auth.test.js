import sinon from 'sinon';
import { signinUserCreator } from './auth';

let signInStatusMessageFixtures =
  'SECRET !';

let apiMock = {
  signin: sinon.stub().returns({
    message: signInStatusMessageFixtures
  })
};

let AuthenticationTokenMock;
let EncryptTokenMock;
let UserProfileMock;

let AUTH_USER_Mock;
let USER_INFO_Mock;
let SERVERNOTRESPOND_Mock;
let authError_Stub = sinon.stub().returns(signInStatusMessageFixtures);

let userFixtures = {
  user: 'some user',
  password: '1234'
};

let redirectSpy;

let dispatch = sinon.spy();

describe('signin module', () => {
  beforeEach(() => {
    apiMock.signin.resetHistory();
  });
  it('smoke: it runs', done => {
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );
    done();
  });
  it('should call signin method from api', () => {
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );

    expect(apiMock.signin.called).toBe(
      true
    );
  });
  it('should call signin method from api one times', () => {
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );

    expect(
      apiMock.signin.callCount
    ).toBe(1);
  });
  it('should call dispatch', () => {
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );

    expect(dispatch.called).toBe(true);
  });
  it('should call dispatch once', () => {
    dispatch.reset();
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );
    expect(dispatch.callCount).toBe(1);
  });
  it('dispatch should call with equal data', () => {
    dispatch.reset();
    signinUserCreator(
      apiMock,
      AuthenticationTokenMock,
      EncryptTokenMock,
      UserProfileMock
    )(
      AUTH_USER_Mock,
      USER_INFO_Mock,
      SERVERNOTRESPOND_Mock,
      authError_Stub
    )(userFixtures, redirectSpy)(
      dispatch
    );
    expect(dispatch.args[0][0]).toEqual('NOT SECRET');
  });
});
