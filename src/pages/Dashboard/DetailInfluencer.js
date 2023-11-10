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
import { getDetailInfluencerData, resetMessage } from "store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RootPageCustom from "common/RootPageCustom";
import { ReactSession } from 'react-client-session';
import DetailReportModal from "./DetailReportModal";

const DetailInfluencer = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [detailModal, setDetailModal] = useState(false)

    const [msgAddState, setMsgAddState] = useState()

    const [recommendId, setRecommendId] = useState(null)
    const [appDetailRecommendationData, setAppDetailRecommendationData] = useState(ReactSession.get('appDetailRecommendationData'))

    const msgAdd = useSelector((state) => state.dashboardReducer.msgAdd);
    const appDetailInfluencerData = useSelector((state) => state.dashboardReducer.respGetDetailInfluencer);

    useEffect(() => {
        setAppDetailRecommendationData(ReactSession.get('appDetailRecommendationData'))
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    const [appDetailInfluencerTabelSearch, setAppDetailInfluencerTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "write_time",
        order: "desc",
        search:
        {
            member_id: appDetailRecommendationData,
        }
    });

    const appDetailInfluencerColumn = [
        {
            dataField: "id",
            text: "ID",
            hidden: true,
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "write_time",
            text: "Tanggal",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "dept_name",
            text: "Departemen",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "name",
            text: "Nama",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "comment",
            text: "Komentar",
            sort: true,
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
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
            dataField: "sticker",
            text: "Compliments",
            headerStyle: { textAlign: 'center' },
            events: {
                onClick: (e, column, columnIndex, data, rowIndex) => {
                    toggleModal(data)
                },
            },
            formatter: (row, rowData, rowIndex) => {
                return (
                    <React.Fragment>
                        <span id={`viewtooltip-sticker-${rowIndex}`}>{row}</span>
                        <UncontrolledTooltip placement="bottom-start" target={`viewtooltip-sticker-${rowIndex}`}>
                            {row}
                        </UncontrolledTooltip>

                    </React.Fragment>
                )
            }
        },
    ]

    const toggleModal = (data) => {
        if (data?.id) {
            setRecommendId(data.id)
        }
        setDetailModal(!detailModal)
    }

    useEffect(() => {
        if (appDetailRecommendationData) {
            setAppDetailInfluencerTabelSearch(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    member_id: appDetailRecommendationData.id ? appDetailRecommendationData.id : appDetailRecommendationData,
                }
            }));
        }
    }, [appDetailRecommendationData])

    useEffect(() => {
        if (appDetailRecommendationData) {
            dispatch(getDetailInfluencerData(appDetailInfluencerTabelSearch))
        }
    }, [appDetailInfluencerTabelSearch])

    useEffect(() => {
        setMsgAddState(msgAdd)
    }, [msgAdd])

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                     {msgAddState !== "" ? <UncontrolledAlert toggle={() => { setMsgAddState("") }} color={msgAddState?.status == "1" ? "success" : "danger"}>
                        {typeof msgAddState == 'string' ? null : msgAddState?.message}</UncontrolledAlert> : null}
                                            <Container fluid>
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-star-circle"></span> History per Influencer
                            </CardHeader>
                            <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                                <TableCustom
                                    keyField={"id"}
                                    columns={appDetailInfluencerColumn}
                                    redukResponse={appDetailInfluencerData}
                                    appdata={appDetailInfluencerData.data != null && appDetailInfluencerData.data.list ? appDetailInfluencerData.data.list : []}
                                    appdataTotal={appDetailInfluencerData.data != null ? appDetailInfluencerData.data.count : 0}
                                    searchSet={setAppDetailInfluencerTabelSearch}
                                    searchGet={appDetailInfluencerTabelSearch}
                                    redukCall={getDetailInfluencerData}
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
                        <DetailReportModal
                            modal={detailModal}
                            toggle={toggleModal}
                            recommendId={recommendId}
                        />
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default DetailInfluencer;
