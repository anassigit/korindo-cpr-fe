import { ReactSession } from 'react-client-session';
import { call, put, takeEvery } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER, RELOGIN_USER } from "./actionTypes";
import { apiError, loginSuccess, reloginSuccess } from "./actions";

import { getMenuBE, getProjectList, login } from "helpers/backend_helper";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(login, user);
    if (response.status == 1) {
      
      localStorage.setItem("authUser", response.data.KOR_TOKEN)
      localStorage.setItem("user_id", response.data.user_id)
      localStorage.setItem("role_id", response.data.role_id)
      localStorage.setItem("user_name", response.data.user_name)
      // localStorage.setItem("profileUrl", JSON.stringify(response.data.profileUrl))

      history.push("/");
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
<<<<<<< .mine
    localStorage.clear()
||||||| .r79763
    localStorage.removeItem("authUser");
    localStorage.removeItem("user");
    localStorage.removeItem("memberId");
    ReactSession.remove("menu");
    ReactSession.remove('profileData')

    ReactSession.remove("currentPage")

    ReactSession.remove('selectedMemberData')
    ReactSession.remove('selectedDeptData')
    ReactSession.remove('selectedDeptName')
    ReactSession.remove('collapser')
    ReactSession.remove('offset')
    ReactSession.remove('limit')

=======

    localStorage.clear()
    sessionStorage.clear()

>>>>>>> .r79829
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
