
import { get, post, getWithParam, postLogin, getWithXls, postUpload, getWithPdf } from "./api_helper"

//combo
export const getCombo = req => post("/app001/get-dtlsetting-combo", req)

//app001
export const getData = req => post("/app001/get-all", req)

export const getDataImage = req => getWithXls("/app001/get-file-image", req)

export const getDataPdf = req => getWithPdf("/app001/get-file-image", req)

export const login = req => postLogin("/app001/login", req)

export const cekToken = () => post("/app001/validate-token", {})

export const getUser = req => post("/app001/get-user", req)

export const getReportJasper = req => post("/app001/generate-report-jasper", req)

//app002
export const getMenu = () => post("/rest/app002/get-menu")

export const getMenuAll = req => post("/rest/app002/get-menu-all", req)

export const editMenu = req => post("/rest/app002/edit", req)

export const deleteMenu = req => post("/rest/app002/delete", req)

export const saveMenu = req => post("/rest/app002/save", req)

export const getMenuParent = req => post("/rest/app002/get-menu-parent", req)

//app003
export const getRole = req => post("/rest/app003/get-all", req)

export const editRole = req => post("/rest/app003/edit", req)

export const saveRole = req => post("/rest/app003/save", req)

export const deleteRole = req => post("/rest/app003/delete", req)

export const getRoleMenu = req => post("/rest/app003/get-all-role-menu", req)

export const saveRoleMenu = req => post("/rest/app003/saveRoleMenu", req)

export const deleteRoleMenu = req => post("/rest/app003/deleteRoleMenu", req)

export const getLovMenu = req => post("/rest/app003/get-lov-menu", req)

export const getRoleUser = req => post("/rest/app003/get-all-role-user", req)

export const saveRoleUser = req => post("/rest/app003/saveRoleUser", req)

export const deleteRoleUser = req => post("/rest/app003/deleteRoleUser", req)

//app004
export const getRoAkses = req => post("/rest/app004/get-all", req)

export const editRoAkses = req => post("/rest/app004/edit", req)

export const deleteRoAkses = req => post("/rest/app004/delete", req)

export const saveRoAkses = req => post("/rest/app004/save", req)

export const getRoAksesUser = req => post("/rest/app004/get-all-user-akses", req)

export const saveRoAksesUser = req => post("/rest/app004/saveAksesUsr", req)

export const deleteRoAksesUser = req => post("/rest/app004/deleteAksesUsr", req)

export const getRoAksesPlant = req => post("/rest/app004/get-all-plant-akses", req)

export const saveRoAksesPlant = req => post("/rest/app004/saveAksesPlant", req)

export const deleteRoAksesPlant = req => post("/rest/app004/deleteAksesPlant", req)

export const getDiv = req => post("/rest/app004/get-div", req)

//app005
export const getCompany = req => post("/rest/app005/get-company", req)

export const editCompany = req => post("/rest/app005/edit", req)

export const saveCompany = req => post("/rest/app005/save", req)

export const deleteCompany = req => post("/rest/app005/delete", req)


//app006
export const getMasterPlant = req => post("/rest/app006/get-plant", req)

export const editPlant = req => post("/rest/app006/edit", req)

export const savePlant = req => post("/rest/app006/save", req)

export const deletePlant = req => post("/rest/app006/delete", req)

export const getLovCompany = req => post("/rest/app006/get-lov-company", req)

//app007
export const editUser = req => post("/rest/app007/edit", req)

export const getLovPosition = req => post("/rest/app007/get-lov-position", req)

//app008
export const getMuser = req => post("/rest/app008/get-all", req)

export const editMuser = req => post("/rest/app008/edit", req)

export const saveMuser = req => post("/rest/app008/save", req)

export const deleteMuser = req => post("/rest/app008/delete", req)

export const getLovPlant = req => post("/rest/app008/get-lov-plant", req)

export const getLovWilayah = req => post("/rest/app008/get-lov-wilayah", req)

export const getLovWilayah2 = req => post("/rest/app008/get-lov-wilayah2", req)

export const getRoleCombo = req => post("/rest/app008//get-role-combo", req)

export const getRoleAksesWilayahCombo = req => post("/rest/app008/get-role-akses-wilayah-combo", req)

export const getRoleAksesPlantCombo = req => post("/rest/app008/get-role-akses-plant-combo", req)


//app009
export const getMasterPosition = req => post("/rest/app009/get-position", req)

export const editPosition = req => post("/rest/app009/edit", req)

export const savePosition = req => post("/rest/app009/save", req)

export const deletePosition = req => post("/rest/app009/delete", req)

//app010
export const getSetting = req => post("/rest/app010/get-settings", req)

export const editSetting = req => post("/rest/app010/edit", req)

export const saveSetting = req => post("/rest/app010/save", req)

//app011
export const getDivisi = req => post("/rest/app011/get-divisi", req)

export const editDivisi = req => post("/rest/app011/edit", req)

export const saveDivisi = req => post("/rest/app011/save", req)

export const deleteDivisi = req => post("/rest/app011/delete", req)


//app013
export const getTeam = req => post("/rest/app013/get-all", req)

export const getTeamChild = req => post("/rest/app013/get-all-child", req)

//app015
export const getVendor = req => post("/rest/app015/get-all", req)

export const editVendor = req => post("/rest/app015/edit", req)

export const saveVendor = req => post("/rest/app015/save", req)

export const deleteVendor = req => post("/rest/app015/delete", req)

//app016
export const getWilayah = req => post("/rest/app016/get-all", req)

export const saveWilayah = req => post("/rest/app016/save", req)

export const editWilayah = req => post("/rest/app016/edit", req)

export const deleteWilayah = req => post("/rest/app016/delete", req)

//app017
export const getUnitcamp = req => post("/rest/app017/get-all", req)

export const saveUnitcamp = req => post("/rest/app017/save", req)

export const editUnitcamp = req => post("/rest/app017/edit", req)

export const deleteUnitcamp = req => post("/rest/app017/delete", req)

//app018
export const getKabupaten = req => post("/rest/app018/get-all", req)

export const saveKabupaten = req => post("/rest/app018/save", req)

export const editKabupaten = req => post("/rest/app018/edit", req)

export const deleteKabupaten = req => post("/rest/app018/delete", req)

//app019
export const getSilviculture = req => post("/rest/app019/get-all", req)

export const editSilviculture = req => post("/rest/app019/edit", req)

export const saveSilviculture = req => post("/rest/app019/save", req)

export const deleteSilviculture = req => post("/rest/app019/delete", req)

//app020
export const getJenisPohon = req => post("/rest/app020/get-all", req)

export const saveJenisPohon = req => post("/rest/app020/save", req)

export const editJenisPohon = req => post("/rest/app020/edit", req)

export const deleteJenisPohon = req => post("/rest/app020/delete", req)

/* app020 clone */
export const getClone = req => post("/rest/app041/get-clone-master", req)

export const saveClone = req => post("/rest/app041/save-clone", req)

export const deleteClone = req => post("/rest/app041/delete-clone", req)

//app021
export const getPekerjaan = req => post("/rest/app021/get-all", req)

//app022
export const getHarga = req => post("/rest/app022/get-all", req)

export const saveHarga = req => post("/rest/app022/save", req)

export const editHarga = req => post("/rest/app022/edit", req)

export const deleteHarga = req => post("/rest/app022/delete", req)

export const getLovPekerjaan = req => post("/rest/app021/get-lov-kegiatan", req)

//app023
export const getAspekPekerjaan = req => post("/rest/app023/get-all", req)

//app024
export const getRumusMaterial = req => post("/rest/app024/get-all", req)

export const saveRumusMaterial = req => post("/rest/app024/save", req)

export const editRumusMaterial = req => post("/rest/app024/edit", req)

export const deleteRumusMaterial = req => post("/rest/app024/delete", req)

//app025
export const getKriteria = req => post("/rest/app025/get-all", req)

export const saveKriteria = req => post("/rest/app025/save", req)

export const editKriteria = req => post("/rest/app025/edit", req)

export const deleteKriteria = req => post("/rest/app025/delete", req)

export const getLovKriteria = req => post("/rest/app025/get-lov-kriteria", req)

//app026
export const getPetak = req => post("/rest/app026/get-all", req)

export const uploadFilePetak = req => postUpload("/rest/app026/upload", req)

export const getRumus = req => post("/rest/app026/get-all-dtl", req)

export const getRumusAll = req => post("/rest/app058/get-all", req)

export const getDownloadTemplate = req => getWithXls("/rest/app026/donwload-template", req)

export const getUploadTemplate = req => postUpload("/rest/app026/upload-gis-excel", req)

// save mapping petak
export const saveMappingPetakRumusTegakan2 = req => post("/rest/app053/save-mapping-rumus-petak", req)

//app027
export const getSpk = req => post("/rest/app027/get-all", req)

export const saveSpk = req => post("/rest/app027/save", req)

export const editSpk = req => post("/rest/app027/edit", req)

export const deleteSpk = req => post("/rest/app027/delete", req)

export const getLovVendor = req => post("/rest/app015/get-all-lov-vendor", req)

export const getLovPetak = req => post("/rest/app026/get-all-lov-petak", req)

export const getLovPetak2 = req => post("/rest/app026/get-all-lov-petak2", req)

export const getLovKegiatanHeader = req => post("/rest/app027/get-all-lov-kegiatan-header", req)

export const getSpkDetailPekerjaan = req => post("/rest/app027/get-all-spkdtl", req)

export const getMicro = req => post("/rest/app027/get-microplan", req)


//app028
export const getKonfirmSpk = req => post("/rest/app028/get-all", req)

export const getKonfirmasi = req => post("/rest/app028/konfirmasi", req)

export const getActionSpk = req => post("/rest/app028/get-all-action", req)

export const saveKonfirmasiRequest = req => post("/rest/app028/konfirmasi-request", req)

export const saveKonfirmasiReject = req => post("/rest/app028/konfirmasi-reject", req)

export const editStatus = req => post("/rest/app028/edit-status", req)

export const getPersetujuanSpk = req => post("/rest/app028/get-all-persetujuan", req)

//app030
export const downloadExcelTargetPanen = req => getWithXls("/rest/app031/downloadexcel-target-panen", req)

//app031
export const downloadFile = req => getWithXls("/rest/app031/donwload-template", req)

export const uploadFile = req => postUpload("/rest/app031/upload", req)

export const getUploadT = req => post("/rest/app031/get-upload-all", req)

// export const saveUploadT = req => post("/rest/app031/save", req)

// export const editUploadT = req => post("/rest/app031/edit", req)

// export const deleteUploadT = req => post("/rest/app031/delete", req)

export const downloadExcel = req => getWithXls("/rest/app031/downloadexcel", req)

//dashboard
export const getDashboard = req => post("/rest/app031//get-all-data-target-panen", req)

export const getDetailPetak = req => post("/rest/app031/detail", req)

export const getDataProductionPerformance = req => post("/rest/app057/get-production-performance", req)

export const getDataPlantingPerformance = req => post("/rest/app057/get-planting-performance", req)

export const getDataFullpaketProgress = req => post("/rest/app057/get-fullpaket-progress", req)

export const getDataUpkeepPerformance = req => post("/rest/app057/get-upkeep-performance", req)

// export const getDataContractors = req => post("/rest/app057/get-production-performance", req)

//app032
export const getRumusTegakan = req => post("/rest/app032/get-all", req)

export const getLovPohon = req => post("/rest/app020/get-all-lov-pohon", req)

export const saveRumusTegakan = req => post("/rest/app032/save", req)

export const editRumusTegakan = req => post("/rest/app032/edit", req)

export const deleteRumusTegakan = req => post("/rest/app032/delete", req)

export const getLovJarakTanam = req => post("/rest/app032/get-all-lov-jarak-tanam", req)

export const getRumusTegakanDtl = req => post("/rest/app032/get-all-dtl", req)

export const saveRumusTegakanDetail = req => post("/rest/app032/save-dtl", req)

export const deleteRumusTegakanDetail = req => post("/rest/app032/delete-dtl", req)

//app033
export const getTrcKegiatanPanen = req => post("/rest/app033/get-all", req)

export const getTrcKegiatanPanenDetail = req => post("/rest/app033/get-all-detail", req)

export const getTrcKegiatanPanenHistory = req => post("/rest/app033/get-all-history", req)

export const getTrcKegiatanPanenDetailHistory = req => post("/rest/app033/get-all-detail-history", req)


//app034
export const getSpkQc = req => post("/rest/app034/get-all", req)

export const getLovQc = req => post("/rest/app034/get-lov-QC", req)

export const saveAssign=  req => post("/rest/app034/save-assign", req)

export const getLovQcBap = req => post("/rest/app031/get-lov-QC-bap-login", req)

//app035
export const getWorkingOrder = req => post("/rest/app035/get-all", req)

export const getDetail = req => post("/rest/app035//get-all-Detail", req)

export const getSapWo = req => post("/rest/app035/get-wo", req)

/* BUAT GET SAP LAINNYA */

export const getSapAspek = req => post("/rest/app035/get-kegiatan", req)

export const getSapPetak = req => post("/rest/app035/get-petak", req)

export const getSapHasilPanen = req => post("/rest/app035/get-hasilpanen", req)

//app036
export const getLovQc2 = req => post("/rest/app031/get-lov-QC-login", req)

export const saveAssign2=  req => post("/rest/app031/save-assign-qc", req)

//export const donExcelApp036 = req => getWithXls("/rest/app031/downloadexcelApp036", req)

export const downloadExcel2 = req => getWithXls("/rest/app031/downloadexcel2", req)

// export const detail = req => getDetail("/rest/app031/detail", req)

//app038
export const getMPersetujuan = req => post("/rest/app038/get-all", req)

export const getMDtlPersetujuan = req => post("/rest/app038/get-all-detail", req)

export const getMUser = req => post("/rest/app038/get-user-approval", req)

export const getMUserPersetujuan = req => post("/rest/app038/get-user-approval-persetujuan", req)

export const saveMPersetujuan = req => post("/rest/app038/save", req)

export const editMPersetujuan = req => post("/rest/app038/save", req)

export const deleteMPersetujuan = req => post("/rest/app038/delete", req)

export const deleteMDtlPersetujuan = req => post("/rest/app038/delete-dtl", req)

//export const getLovPekerjaan = req => post("/rest/app021/get-lov-kegiatan", req)

export const saveViewPersetujuan = req => post("/rest/app038/save2", req)

//app039
export const getLaporanMonitoring = req => post("/rest/app027/get-microplanHistory", req)


//app040

export const getMasterKriteria = req => post("/rest/app040/get-all", req)

export const saveMasterKriteria = req => post("/rest/app040/save", req)

export const editMasterKriteria = req => post("/rest/app040/edit", req)

export const deleteMasterKriteria = req => post("/rest/app040/delete", req)


//app041

export const getReqBibit = req => post("/rest/app041/get-all", req)

export const saveReqBibit = req => post("rest/app041/setuju-tolak", req)

export const saveReady = req => post("rest/app041/siap-ambil", req)

export const getLovClone = req => post("/rest/app041/get-clone", req)

//app042
export const getHasilTanam= req => post("/rest/app042/get-all", req)

export const getHasilTanamDetail = req => post("/rest/app042/get-all-detail", req)

export const getHasilTanamDetail2 = req => post("/rest/app042/get-all-detail-kriteria", req)


//app043
export const getHasilPemeliharaan = req => post("/rest/app043/get-all", req)

export const getHasilPemeliharaanDetail = req => post("/rest/app043/get-all-detail", req)

//app044

export const getLaporanPerVendor = req => post("/rest/app044//get-targetpanen-byvendor", req)

export const downloadExcelLaporanPerVendor = req => getWithXls("/rest/app044/downloadexcel-targetpanen-byvendor", req)


//app045
export const getBap = req => post("/rest/app045/get-all-BAP", req)

export const getLovkegiatan = req => post("/rest/app045/get-lov-kegiatan", req)

export const getBapDetail = req => post("/rest/app045/get-all-detail1", req)

export const getBapDetail2 = req => post("/rest/app045/get-all-detail2", req)

export const getBapDetailMaterial = req => post("/rest/app045/get-all-material", req)

export const getBapDtlAspek = req => post("/rest/app045/get-all-detail-aspek", req)

export const saveKonfirmasiRequest2 = req => post("/rest/app046/konfirmasi", req)

export const saveKonfirmasiReject2 = req => post("/rest/app046/konfirmasi-reject", req)

export const downloadExcelListBap = req => getWithXls("/rest/app045/download-excel-bap", req)

// untuk user persetujuan
export const editBap = req => post("/rest/app045/edit", req)

//app046
export const getAllBap = req => post("/rest/app046/get-all", req)

export const saveKonfirmasiRequest3 = req => post("/rest/app046/konfirmasi-request", req)

export const getActionRequestBap = req => post("/rest/app046/get-all-action", req)


//app047

export const getStockBibit = req => post("/rest/app047/get-all", req)

export const getLovClone2 = req => post("/rest/app047/get-lov-clone", req)

export const getStockBibitDetail = req => post("/rest/app047/get-all-detail-Stock", req)

export const getSavetockBibit = req => post("/rest/app047/save", req)

export const downloadExcelStock = req => getWithXls("/rest/app047/downloadexcel-detail-stock", req)

export const saveStorage = req => post("/rest/app047/save-mapping-store", req)

export const deleteStockBibit = req => post("/rest/app047/delete", req)

export const getLaporanStockBibit = req => post("/rest/app047/get-all-laporan-Stock", req)

export const downloadExcelLapStock = req => getWithXls("/rest/app047/downloadexcel-laporan-stock", req)

//app50

export const getStorage = req => post("/rest/app050/get-all", req)

export const saveMstStorage = req => post("/rest/app050/save", req)

export const deleteMstStorage = req => post("/rest/app050/delete", req)

export const editMstStorage = req => post("/rest/app050/edit", req)

export const getLovStore = req => post("/rest/app050/get-all-lov-store", req)

//app051


export const getProduct = req => post("/rest/app051/get-all", req)

export const saveMstProduct = req => post("/rest/app051/save", req)

export const deleteMstProduct = req => post("/rest/app051/delete", req)

export const editMstProduct = req => post("/rest/app051/edit", req)

export const getLovProduct = req => post("/rest/app051/get-all-lov-product", req)

// 052

export const getJarakTanam = req => post("/rest/app052/get-all", req)

export const saveJarakTanam = req => post("/rest/app052/save", req)

export const editJarakTanam = req => post("/rest/app052/edit", req)

export const deleteJarakTanam = req => post("/rest/app052/delete", req)


//app053

export const getMappingPetakRumusTegakan = req => post("/rest/app053/get-all", req)

export const saveMappingPetakRumusTegakan = req => post("/rest/app053/save", req)

export const deleteMappingPetakRumusTegakan = req => post("/rest/app053/delete", req)

export const getLovRumusTegakan = req => post("/rest/app053/get-all-lov-rumus-tegakan", req)

//app054
export const getUploadTanam = req => post("/rest/app054/get-upload-all-tanam", req)

export const downloadExcelTanam = req => getWithXls("/rest/app054/download-excel-tanam", req)

export const downloadTemplateTanam = req => getWithXls("/rest/app054/donwload-template-tanam", req)

export const uploadTanam = req => postUpload("/rest/app054/upload-tanam", req)

// app055
export const uploadFilePemeliharaan = req => postUpload("/rest/app055/upload", req)

export const getUploadPemeliharaan = req => post("/rest/app055/get-upload-all", req)

export const downloadExcelPemeliharaan = req => getWithXls("/rest/app055/downloadexcel", req)

export const downloadFilePemeliharaan = req => getWithXls("/rest/app055/donwload-template", req)

//app056
export const getPeriod = req => post("/rest/app056/get-all", req)

export const savePeriod = req => post("/rest/app056/save", req)

export const editPeriod = req => post("/rest/app056/edit", req)

export const deletePeriod = req => post("/rest/app056/delete", req)

//app059
export const getLaporanStatusPekerjaan = req => post("/rest/app059/get-all", req)

//app060
export const getUploadApk = req => post("/rest/app060/get-all", req)

export const uploadApk = req =>  postUpload("/rest/app060/upload", req)

export const deleteApk = req => post("/rest/app060/delete", req)

//app061
export const getDataStatusPekerjaan= req => post("/rest/app061/get-all", req)

//app062
export const getSendEmail = req => post("/rest/app062/get-all", req)

export const saveSendEmail = req => post("/rest/app062/save", req)

export const deleteSendEmail = req => post("/rest/app062/delete", req)


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