import { ReactSession } from 'react-client-session';
import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes";
import { apiError, loginSuccess, reloginSuccess } from "./actions";

import { getMenuBE, login } from "helpers/backend_helper";


function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user);
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      localStorage.setItem("user", JSON.stringify(response.data.memberName))
      localStorage.setItem("memberId", JSON.stringify(response.data.memberId))
      localStorage.setItem("profileUrl", JSON.stringify(response.data.profileUrl))
      const res = yield call(getMenuBE)

      if (res.status == 1) {
        
        const menuData = {
          menu: res.data.list,
          menuType: 'cpr'

        }

        localStorage.setItem("menu", JSON.stringify(menuData))

      }

      history.push("/home");
      yield put(loginSuccess(response));
    } else {
      yield put(apiError(response.message))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}

function* reloginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user);
    if (response.status == 1) {
      localStorage.setItem("authUser", response.data.KOR_TOKEN);
      localStorage.setItem("user", JSON.stringify(response.data.memberName));
      localStorage.setItem("memberId", JSON.stringify(response.data.memberId));
      localStorage.setItem("profileUrl", JSON.stringify(response.data.profileUrl));
      yield put(reloginSuccess(response));
      document.getElementById("reloginForm").style.display = "none";
      window.location.reload()
      yield put(apiError(''))
    } else {
      yield put(apiError("Username and password tidak sesuai"))
    }
  } catch (error) {
    yield put(apiError(error))
  }
}
function* logoutUser({ payload: { history } }) {
  try {

    localStorage.clear()
    sessionStorage.clear()

    history.push("/login")
    yield put(apiError(""))
  } catch (error) {
    yield put(apiError(error))
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser)
  yield takeEvery(LOGOUT_USER, logoutUser)
  yield takeEvery(RELOGIN_USER, reloginUser)
}

export default authSaga
