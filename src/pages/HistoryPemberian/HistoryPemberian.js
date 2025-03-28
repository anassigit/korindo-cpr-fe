import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Spinner,
    UncontrolledAlert,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import TableCustom from "common/TableCustom";
import { getHistoryPemberianData, resetMessage } from "store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RootPageCustom from "common/RootPageCustom";
import { ReactSession } from 'react-client-session';
import DetailReportModal from "../Dashboard/DetailReportModal";
import DetailContentInfluencer from "./DetailContentInfluencer";

const HistoryPemberian = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const menu = JSON.parse(localStorage.getItem("menu") || '[]');
    const [linkRekomendasi, setLinkRekomendasi] = useState();

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    
    const [detailModal, setDetailModal] = useState(false)
    const [detailContentModal, setDetailContentModal] = useState(false)

    const [recommendId, setRecommendId] = useState(null)
    const [recommendData, setRecommendData] = useState({})
    const [appDetailRecommendationData, setAppDetailRecommendationData] = useState(ReactSession.get('appDetailRecommendationData'))

    const appHistoryPemberianData = useSelector((state) => state.historyPemberianReducer.respGetHistoryPemberian);

    useEffect(() => {
        setAppDetailRecommendationData(ReactSession.get('appDetailRecommendationData'))
        
        const foundRow = menu.menu && Array.isArray(menu.menu) ? menu.menu.find((row) => row.menuId === 'KORTRN001') : null;

        const temp = foundRow ? foundRow.path : null;

        setLinkRekomendasi(temp);
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const [appHistoryPemberianTabelSearch, setAppHistoryPemberianTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "write_time",
        order: "desc",
        search:
        {
            memberId: appDetailRecommendationData,
        }
    });

    const appHistoryPemberianColumn = [
        {
            dataField: "recommendId",
            text: "ID",
            hidden: true,
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "write_time",
            text: "Tanggal",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "deptName",
            text: "Departemen",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "memberName",
            text: "Nama",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "comment",
            text: "Komentar",
            sort: true,
            headerStyle: { textAlign: 'center' },
            style: { minWidth: "30vw", maxWidth: "25vw", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <React.Fragment>
                        <span id={`viewtooltip-${rowIndex}`}>{row}</span>
                        <UncontrolledTooltip placement="bottom-start" target={`viewtooltip-${rowIndex}`}>
                            {row}
                        </UncontrolledTooltip>

                    </React.Fragment>
                )
            }
        },
        {
            dataField: "stickerName",
            text: "Compliments",
            headerStyle: { textAlign: 'center' },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <React.Fragment>
                        <span id={`viewtooltip-stickerName-${rowIndex}`}>{row}</span>
                        <UncontrolledTooltip placement="bottom-start" target={`viewtooltip-stickerName-${rowIndex}`}>
                            {row}
                        </UncontrolledTooltip>

                    </React.Fragment>
                )
            }
        },
        {
            dataField: "action",
            text: "Action",
            headerStyle: { textAlign: 'center' },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', fontSize: '16px', gap: '12px', margin: '0 25px 0 25px' }}>
                        <span
                            onClick={() => toggleModalContent(rowData)}
                            id={`viewtooltip-action-${rowIndex}`}
                            className="mdi mdi-text-box-outline text-primary"
                        />
                        <UncontrolledTooltip placement="top" target={`viewtooltip-action-${rowIndex}`}>
                            Detail
                        </UncontrolledTooltip>
                    </div>
                )
            }
        },
    ]

    const toggleModal = (data) => {
        if (data?.recommendId) {
            setRecommendId(data.recommendId)
        }
        setDetailModal(!detailModal)
    }

    const toggleModalContent = (data) => {
        if (data?.recommendId) {
            setRecommendData(data)
        }
        setDetailContentModal(!detailContentModal)
    }

    useEffect(() => {
        if (appDetailRecommendationData) {
            setAppHistoryPemberianTabelSearch(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    memberId: appDetailRecommendationData.memberId ? appDetailRecommendationData.memberId : appDetailRecommendationData,
                }
            }));
        }
    }, [appDetailRecommendationData])

    useEffect(() => {
        if (appDetailRecommendationData) {
            dispatch(getHistoryPemberianData(appHistoryPemberianTabelSearch))
        }
    }, [appHistoryPemberianTabelSearch])


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {/* {msgAddState !== "" ? <UncontrolledAlert toggle={() => { setMsgAddState("") }} color={msgAddState?.status == "1" ? "success" : "danger"}>
                        {typeof msgAddState == 'string' ? null : msgAddState?.message}</UncontrolledAlert> : null} */}
                    <Container fluid>
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-star-circle"></span> Riwayat Bintang Yang Diberikan
                            </CardHeader>
                            <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                                <TableCustom
                                    keyField={"recommendId"}
                                    columns={appHistoryPemberianColumn}
                                    redukResponse={appHistoryPemberianData}
                                    appdata={appHistoryPemberianData.data != null && appHistoryPemberianData.data.list ? appHistoryPemberianData.data.list : []}
                                    appdataTotal={appHistoryPemberianData.data != null ? appHistoryPemberianData.data.count : 0}
                                    searchSet={setAppHistoryPemberianTabelSearch}
                                    searchGet={appHistoryPemberianTabelSearch}
                                    redukCall={getHistoryPemberianData}
                                />
                            </CardBody>
                        </Card>
                        <Button
                            className="btn btn-danger my-3"
                            onClick={() => {
                                ReactSession.set('appDetailRecommendationData', "");
                                history.go(-1)
                            }}
                        >
                            <span className="mdi mdi-arrow-left" />
                            &nbsp;Kembali
                        </Button>
                        <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                        </div>
                        <DetailContentInfluencer
                            modal={detailContentModal}
                            toggle={toggleModalContent}
                            recommendData={recommendData}
                        />
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default HistoryPemberian;
