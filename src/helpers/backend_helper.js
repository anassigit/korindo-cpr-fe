
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf, postWithParam } from "./api_helper"

export const login = req => postLogin("/MemberRest/login", req)

export const getDeptBE = req => postWithParam("rest/RecommendRest/getDept", req)

export const getMemberListBE = req => post("rest/RecommendRest/getMemberList", req)

export const getSearchBE = req => post("rest/RecommendRest/searchMember", req)

export const getRecommendListBE = req => post("rest/RecommendRest/getRecommendList", req)