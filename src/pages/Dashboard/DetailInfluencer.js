import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {
    Card,
    CardBody,
    CardHeader,
    Container,
    Spinner,
    UncontrolledTooltip
} from "reactstrap";
import '../../assets/scss/custom.scss';
import '../../config';
import TableCustom from "common/TableCustom";
import { getDetailInfluencerData } from "store/actions";

const DetailInfluencer = (props) => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const appDetailInfluencerData = useSelector((state) => state.dashboardReducer.respGetDetailInfluencer);

    const [appDetailInfluencerTabelSearch, setAppDetailInfluencerTabelSearch] = useState({
        page: 1,
        limit: 10,
        offset: 0,
        sort: "write_time",
        order: "asc",
        search:
        {
            member_id: "",
        }
    });

    const appDetailInfluencerColumn = [
        {
            dataField: "id",
            text: "ID",
            hidden: true,
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "dept_name",
            text: "Departemen",
            sort: true,
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "name",
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
            dataField: "sticker",
            text: "Compliments",
            sort: true,
            headerStyle: { textAlign: 'center' },
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

    useEffect(() => {
        if (props.appDetailRecommendationData) {
            setAppDetailInfluencerTabelSearch(prevState => ({
                ...prevState,
                search: {
                    ...prevState.search,
                    member_id: props.appDetailRecommendationData.id,
                }
            }));
        }
    }, [props.appDetailRecommendationData])

    useEffect(() => {
        if (props.appDetailRecommendationData) {
            dispatch(getDetailInfluencerData(appDetailInfluencerTabelSearch))
        }
    }, [appDetailInfluencerTabelSearch])

    return (

        <Container style={{ display: props.appDetailRecommendationPage ? "block" : "none" }} fluid>
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

            <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
            </div>
        </Container>
    );
};

DetailInfluencer.propTypes = {
    appDetailRecommendationPage: PropTypes.any,
    setAppDetailRecommendationPage: PropTypes.any,
    appDetailRecommendationData: PropTypes.any,
};

export default DetailInfluencer;
