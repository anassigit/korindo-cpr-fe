import { call, put, takeEvery } from "redux-saga/effects"

import { GET_COMBO } from "./actionTypes"
import { msgComboGysAreaType, msgComboRoleAksesType, msgComboSatuan, msgComboSatMaterial, msgComboType, msgComboJenisApproval, msgComboFrem, msgComboJenisFrem, 
          msgComboJenisPackingan, msgComboPackingan, msgComboAdjustBibit, msgComboKategoriRumusTegakan, msgComboJenisEmail } from "./actions"

import { getCombo } from "helpers/backend_helper"


function* fetchGetComboData({ payload: req }) {
  try {
    const response = yield call(getCombo, req)
    if (req.name == "combo-gis-area-type") {
      yield put(msgComboGysAreaType(response))
    } else if (req.name == "combo-akse-apps") {
      yield put(msgComboRoleAksesType(response))
    } else if (req.name == "combo-satuan") {
      yield put(msgComboSatuan(response))
    } else if (req.name == "combo-sat-material") {
      yield put(msgComboSatMaterial(response))
    } else if (req.name == "combo-type") {
      yield put(msgComboType(response))
    }else if (req.name == "combo-jenis-approval") {
      yield put(msgComboJenisApproval(response))
    }else if (req.name == "frem") {
      yield put(msgComboJenisFrem(response))
    }else if (req.name == "packingan") {
      yield put(msgComboJenisPackingan(response))
    }else if (req.name == "adjust-bibit") {
      yield put(msgComboAdjustBibit(response))
    }else if (req.name == "kategori-rumus-tegakan") {
      yield put(msgComboKategoriRumusTegakan(response))
    }else if (req.name == "combo-jenis-email") {
      yield put(msgComboJenisEmail(response))
    }
  } catch (error) {
    console.log(error);
    if (req.name == "combo-gis-area-type") {
      yield put(msgComboGysAreaType({ "status": 0, "message": "Error Get Data" }))
    } else if (req.name == "combo-akse-apps") {
      yield put(msgComboRoleAksesType({ "status": 0, "message": "Error Get Data" }))
    } else if (req.name == "combo-satuan") {
      yield put(msgComboSatuan({ "status": 0, "message": "Error Get Data" }))
    } else if (req.name == "combo-sat-material") {
      yield put(msgComboSatMaterial({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "combo-type") {
      yield put(msgComboType({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "combo-jenis-approval") {
      yield put(msgComboType({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "frem") {
      yield put(msgComboFrem({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "packingan") {
      yield put(msgComboPackingan({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "adjust-bibit") {
      yield put(msgComboAdjustBibit({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "kategori-rumus-tegakan") {
      yield put(msgComboKategoriRumusTegakan({ "status": 0, "message": "Error Get Data" }))
    }else if (req.name == "combo-jenis-email") {
      yield put(msgComboJenisEmail({ "status": 0, "message": "Error Get Data" }))
    }
  }
}

function* comboSaga() {

  yield takeEvery(GET_COMBO, fetchGetComboData)
}

export default comboSaga
