
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf, postWithParam } from "./api_helper"

export const login = req => postLogin("/MemberRest/login", req)

export const getInfoProfileBE = req => post("/MemberRest/getInfo", req)

export const getMenuBE = req => post("rest/MainRest/getMenuList", req)

export const getListMainRestBE = req => post("rest/MainRest/getList", req)

export const getInfoMainRestBE = req => post("rest/MainRest/getInfo", req)

export const getBestListBE = req => post("rest/MainRest/getBestList", req)

export const getBestOfMonthListBE = req => post("rest/MainRest/getBestOfMonth", req)

export const getBestOfYearListBE = req => post("rest/MainRest/getBestOfYear", req)

export const getDetailInfluencerBE = req => post("rest/MainRest/getDetail", req)

export const getReportListBE = req => post("rest/MainRest/getReportList", req)

export const addReportBE = req => postWithParam("rest/MainRest/addReport", req)

export const getDeptBE = req => postWithParam("rest/RecommendRest/getDept", req)

export const getMemberListBE = req => post("rest/RecommendRest/getMemberList", req)

export const getSearchBE = req => post("rest/RecommendRest/searchMember", req)

export const getRecommendListBE = req => post("rest/RecommendRest/getRecommendList", req)

export const getRecommendBE = req => postWithParam("rest/RecommendRest/getRecommend", req)

export const getStickerListBE = req => post("rest/RecommendRest/getStickerList", req)

export const addRecommendBE = req => postWithParam("rest/RecommendRest/addRecommend", req)

export const submitRecommendBE = req => post("rest/RecommendRest/submit", req)

export const editRecommendBE = req => postWithParam("rest/RecommendRest/modifyRecommend", req)

export const deleteRecommendBE = req => postWithParam("rest/RecommendRest/deleteRecommend", req)

export const getListEmployeeOfMonthYearBE = req => post("rest/BestEmployeeMasterRest/getList", req)

export const getYearListBE = req => post("rest/BestEmployeeMasterRest/getYearList", req)

export const getCandidateListBE = req => post("rest/BestEmployeeMasterRest/getCandidateList", req)

export const getCandidateBE = req => postWithParam("rest/BestEmployeeMasterRest/select", req)

export const getDeptListBE = req => post("/rest/DeptMasterRest/getList", req)

export const getDeptBE2 = req => postWithParam("/rest/DeptMasterRest/select", req)

export const saveDeptBE = req => postWithParam("/rest/DeptMasterRest/insert", req)

export const editDeptBE = req => postWithParam("/rest/DeptMasterRest/update", req)

export const deleteDeptBE = req => postWithParam("/rest/DeptMasterRest/delete", req)

export const getLocationListBE = req => post("rest/BestEmployeeMasterRest/getLocationList", req)

export const getKeywordListBE = req => post("rest/BestEmployeeMasterRest/getKeywordList", req)

export const addEmployeeOfBE = req => postWithParam("rest/BestEmployeeMasterRest/insert", req)

export const editEmployeeOfBE = req => postWithParam("rest/BestEmployeeMasterRest/update", req)

export const deleteEmployeeOfBE = req => postWithParam("rest/BestEmployeeMasterRest/delete", req)

export const getLovCandidateBE = req => post("rest/BestEmployeeMasterRest/getCandidateList", req)

export const getLovLevelBE = req => post("rest/PositionMasterRest/getLevelList", req)

export const getLocationListBE2 = req => post("/rest/LocationMasterRest/getList", req)

export const getLocationBE = req => postWithParam("/rest/LocationMasterRest/select", req)

export const saveLocationBE = req => postWithParam("/rest/LocationMasterRest/insert", req)

export const editLocationBE = req => postWithParam("/rest/LocationMasterRest/update", req)

export const deleteLocationBE = req => postWithParam("/rest/LocationMasterRest/delete", req)

export const getLocationListBE3 = req => post("rest/LevelMasterRest/getLocationList", req)

export const getLevelListBE = req => post("/rest/LevelMasterRest/getList", req)

export const getLevelBE2 = req => postWithParam("/rest/LevelMasterRest/select", req)

export const saveLevelBE = req => postWithParam("/rest/LevelMasterRest/insert", req)

export const editLevelBE = req => postWithParam("/rest/LevelMasterRest/update", req)

export const deleteLevelBE = req => postWithParam("/rest/LevelMasterRest/delete", req)

export const getLocationListBE4 = req => post("rest/PositionMasterRest/getLocationList", req)

export const getPositionListBE = req => post("/rest/PositionMasterRest/getList", req)

export const getPositionBE2 = req => postWithParam("/rest/PositionMasterRest/select", req)

export const savePositionBE = req => postWithParam("/rest/PositionMasterRest/insert", req)

export const editPositionBE = req => postWithParam("/rest/PositionMasterRest/update", req)

export const deletePositionBE = req => postWithParam("/rest/PositionMasterRest/delete", req)

export const getSettingListBE = req => post("/rest/SettingMasterRest/getList", req)

export const getSettingBE2 = req => postWithParam("/rest/SettingMasterRest/select", req)

export const saveSettingBE = req => postWithParam("/rest/SettingMasterRest/insert", req)

export const editSettingBE = req => postWithParam("/rest/SettingMasterRest/update", req)

export const deleteSettingBE = req => postWithParam("/rest/SettingMasterRest/delete", req)

export const getManualVideoBE = req => post("/rest/ManualRest/getManualVideo", req)

export const getManualPDFBE = req => post("/rest/ManualRest/getManualPDF", req)