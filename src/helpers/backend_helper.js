
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf, postWithParam } from "./api_helper"

//combo
export const getCombo = req => post("/app001/get-dtlsetting-combo", req)

//app001
export const getData = req => post("/app001/get-all", req)

export const getDataImage = req => getWithXls("/app001/get-file-image", req)

export const getDataPdf = req => getWithPdf("/app001/get-file-image", req)


export const cekToken = () => post("/app001/validate-token", {})

export const getUser = req => post("/app001/get-user", req)

// BE helper

export const getDeptBE = req => postWithParam("rest/SettingRest/getDept", req)

export const getDetailDeptBE = req => postWithParam("rest/SettingRest/getDeptDetail", req)

export const getMemberListBE = req => post("rest/SettingRest/getMemberList", req)

export const getMemberDetailBE = req => postWithParam("rest/SettingRest/getMemberDetail", req)

export const getSearchBE = req => post("rest/SettingRest/searchMember", req)

export const getServiceDeptBE = req => postWithParam("rest/SettingRest/getDeptRole", req)

export const getServiceMemberBE  = req => postWithParam("rest/SettingRest/getMemberRole", req)

export const editServiceDeptBE  = req => postWithParam("rest/SettingRest/editDeptRole", req)

export const editServiceMemberBE  = req => postWithParam("rest/SettingRest/editMemberRole", req)



export const login = req => postLogin("/MemberRest/login", req)