
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf, postWithParam } from "./api_helper"

export const login = req => postLogin("/MemberRest/login", req)

export const getMenuBE = req => post("rest/MainRest/getMenuList", req)

export const getListMainRestBE = req => post("rest/MainRest/getList", req)

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

export const editRecommendBE = req => postWithParam("rest/RecommendRest/modifyRecommend", req)

export const deleteRecommendBE = req => postWithParam("rest/RecommendRest/deleteRecommend", req)

export const getListEmployeeOfMonthYearBE = req => post("rest/BestEmployeeMasterRest/getList", req)

export const getYearListBE = req => post("rest/BestEmployeeMasterRest/getYearList", req)