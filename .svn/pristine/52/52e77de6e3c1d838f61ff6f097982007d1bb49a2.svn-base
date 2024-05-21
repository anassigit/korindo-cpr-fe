import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Container,
    Input,
    Row, Spinner, UncontrolledTooltip
} from "reactstrap";
import { getBestListData, getBestOfMonthListData, getBestOfYearListData, getListData1, getMenuData, getSearchData } from "store/actions";
import '../../assets/scss/custom.scss';
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';
import { ReactSession } from 'react-client-session';
import DetailInfluencer from "./DetailInfluencer";
import ProfileMenu from "components/CommonForBoth/TopbarDropdown/ProfileMenu";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import crown from "../../assets/images/crown.png"
import tiara from "../../assets/images/tiara.png"
import give from "../../assets/images/berikan bintang.png"
import star from "../../assets/images/star.png"

import satu from "../../assets/images/numbers/circle-1 2.png"
import dua from "../../assets/images/numbers/circle-2 2.png"
import tiga from "../../assets/images/numbers/circle-3 2.png"
import empat from "../../assets/images/numbers/circle-4 2.png"
import lima from "../../assets/images/numbers/circle-5 2.png"

const Rekomendasi = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const [linkRekomendasi, setLinkRekomendasi] = useState();
    const [loadingSpinner1, setLoadingSpinner1] = useState(false)
    const [loadingSpinner2, setLoadingSpinner2] = useState(false)

    const [appDashboardPage, setAppDashboardPage] = useState(true)

    const [appDetailRecommendationData, setAppDetailRecommendationData] = useState()

    // SPECIAL
    const menu = useSelector(state => (
        state.menuReducer.respGetMenu
    ));

    const [sliderMonth, setSliderMonth] = useState(4)
    const [sliderYear, setSliderYear] = useState(4)

    const appListData = useSelector((state) => state.dashboardReducer.respGetList1);
    const appBestlistData = useSelector((state) => state.dashboardReducer.respGetBestList);
    const appBestlistOfMonthData = useSelector((state) => state.dashboardReducer.respGetBestOfMonthList);
    const appBestlistOfYearData = useSelector((state) => state.dashboardReducer.respGetBestOfYearList);

    const itemsPerPage = 6;
    const [blinker, setBlinker] = useState(false);
    const [currentPage, setCurrentPage] = useState(ReactSession.get('currentPage') || 1);

    const totalItems = appListData?.data?.count;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        dispatch(getBestListData())
        dispatch(getBestOfMonthListData())
        dispatch(getBestOfYearListData())
        dispatch(getMenuData())
        setLoadingSpinner1(true)
        setLoadingSpinner2(true)
    }, [])

    useEffect(() => {
        if (appBestlistData.status === '1') {
            setLoadingSpinner2(false)
        } else if (appBestlistData.status === '0') {
            setLoadingSpinner2(false)
        }
    }, [appBestlistData])

    useEffect(() => {
        if (appListData.status === '1') {
            setLoadingSpinner1(false)
        } else if (appListData.status === '0') {
            setLoadingSpinner1(false)
        }
    }, [appListData])

    useEffect(() => {
        const foundRow = Array.isArray(menu?.data?.list) ? menu?.data?.list.find((row) => row.menuId === 'KORTRN001') : null
        const temp = foundRow ? foundRow.path : null;

        setLinkRekomendasi(temp);
    }, [menu])

    useEffect(() => {
        ReactSession.set("currentPage", currentPage)
        dispatch(getListData1({
            offset: (currentPage - 1) * itemsPerPage,
            limit: itemsPerPage,
        }));
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setBlinker(true);
    };

    useEffect(() => {
        if (blinker) {
            const timeout = setTimeout(() => {
                setBlinker(false);
            }, 200); // Adjust the delay as needed
            return () => clearTimeout(timeout);
        }
    }, [blinker]);

    let lengthArray = appBestlistOfMonthData?.data?.list?.length ? appBestlistOfMonthData?.data?.list?.length : ReactSession.get('lengthArray') ? ReactSession.get('lengthArray') : []

    useEffect(() => {
        if (appBestlistOfMonthData?.data?.list?.length) {
            ReactSession.set('lengthArray', appBestlistOfMonthData?.data?.list?.length)
        }
    }, [appListData])

    const handleSliderChange = (e) => {
        const step = 30;
        let newSliderMonth = sliderMonth;

        if (e === 'back') {
            if (lengthArray === 3) {
                newSliderMonth = sliderMonth >= 4 ? -56 : (sliderMonth + step);
            } else if (lengthArray === 2) {
                newSliderMonth = sliderMonth >= 4 ? -26 : (sliderMonth + step);
            } else {
                newSliderMonth = 4;
            }
        } else {
            if (lengthArray === 3) {
                newSliderMonth = sliderMonth <= -56 ? 4 : (sliderMonth - step);
            } else if (lengthArray === 2) {
                newSliderMonth = sliderMonth <= -26 ? 4 : (sliderMonth - step);
            } else {
                newSliderMonth = 4;
            }
        }

        setSliderMonth(newSliderMonth);
    };

    let lengthArray2 = appBestlistOfYearData?.data?.list?.length ? appBestlistOfYearData?.data?.list?.length : ReactSession.get('lengthArray2') ? ReactSession.get('lengthArray2') : []

    useEffect(() => {
        if (appBestlistOfYearData?.data?.list?.length) {
            ReactSession.set('lengthArray2', appBestlistOfYearData?.data?.list?.length)
        }
    }, [appBestlistOfYearData])

    const handleSliderChange2 = (e) => {
        const step = 30;
        let newSliderYear = sliderYear;

        if (e === 'back') {
            if (lengthArray2 === 3) {
                newSliderYear = sliderYear >= 4 ? -56 : (sliderYear + step);
            } else if (lengthArray2 === 2) {
                newSliderYear = sliderYear >= 4 ? -26 : (sliderYear + step);
            } else {
                newSliderYear = 4;
            }
        } else {
            if (lengthArray2 === 3) {
                newSliderYear = sliderYear <= -56 ? 4 : (sliderYear - step);
            } else if (lengthArray2 === 2) {
                newSliderYear = sliderYear <= -26 ? 4 : (sliderYear - step);
            } else {
                newSliderYear = 4;
            }
        }

        newSliderYear = parseFloat(newSliderYear.toFixed(1));

        setSliderYear(newSliderYear);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            handleSliderChange("next"); // Change the direction as needed
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [sliderMonth])

    useEffect(() => {
        const interval = setInterval(() => {
            handleSliderChange2("next"); // Change the direction as needed
        }, 4000);

        return () => {
            clearInterval(interval);
        };
    }, [sliderYear])


    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbers.push(1, 2, 3, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
            } else {
                pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return pageNumbers.map((page, index) => (
            <li
                key={index}
                className={`page-item ${currentPage === page ? 'active' : ''}`}
            >
                {page === '...' ? (
                    <span className="page-link">...</span>
                ) : (
                    <button
                        className="page-link"
                        onClick={() => {
                            setBlinker(true);
                            handlePageChange(page);
                        }}
                    >
                        {page}
                    </button>
                )}
            </li>
        ));
    };

    const appDetailHandler = (e) => {
        setAppDetailRecommendationData(e)
        ReactSession.set('appDetailRecommendationData', e);
    }

    const [isBreathing, setIsBreathing] = useState(false);

    useEffect(() => {
        const breathingInterval = setInterval(() => {
            setIsBreathing((prevIsBreathing) => !prevIsBreathing);
        }, 1000); // Adjust the interval duration as needed

        return () => {
            clearInterval(breathingInterval);
        };
    }, []);

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    <Container
                        hidden={!appDashboardPage}
                        fluid
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Card style={{ marginBottom: 0, width: "20%" }}>
                                <CardHeader style={{ fontSize: "16px" }}>
                                    <span className="mdi mdi-star-circle"></span> Peringkat 5 Calon Pemenang
                                </CardHeader>
                                <CardBody
                                    className="bg-light"
                                    style={{
                                        padding: "16px 0 16px 0",
                                        margin: 0,
                                        border: "1px solid #BBB",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "start",
                                        gap: "16px",
                                    }}
                                >
                                    <div className="spinner-wrapper" style={{ display: loadingSpinner2 ? "block" : "none", zIndex: "9999", position: "absolute", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <Spinner style={{ padding: "24px", display: "block", position: "flex", justifyContent: 'center', alignItems: 'center' }} color="primary" />
                                        </div>
                                    </div>
                                    {
                                        Array.isArray(appBestlistData?.data?.list) && appBestlistData?.data?.list.length > 0 ?
                                            appBestlistData?.data?.list.map((item, index) => {

                                                const imageUrls = [satu, dua, tiga, empat, lima];
                                                const colors = ['#F0A500', '#A9A9A9', '#B0926A', '#427D9D', '#A084DC']; // Replace with desired colors

                                                return (
                                                    <a
                                                        href="/home/detail"
                                                        draggable="false"
                                                        key={index}
                                                        className="col-10 rounded-3 peringkat"
                                                        style={{
                                                            background: `linear-gradient(-45deg, ${colors[index % colors.length]}a6, ${colors[index % colors.length]})`, // Applying gradient with 20% opacity of white
                                                            padding: "12px",
                                                            display: "flex",
                                                            flexDirection: "row",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            width: "85%", // Define a width for the container
                                                            textOverflow: "ellipsis"
                                                        }}
                                                        onClick={() => appDetailHandler(item)}
                                                        onContextMenu={(e) => { e.preventDefault(); }}
                                                    >
                                                        <div style={{ width: "80%" }}>
                                                            <div
                                                                style={{
                                                                    fontSize: "16px",
                                                                    fontWeight: "bold",
                                                                    color: 'white',
                                                                    whiteSpace: "nowrap",
                                                                    overflow: "hidden",
                                                                    textOverflow: "ellipsis",

                                                                }}
                                                                id={`index_member_${index}`}
                                                            >
                                                                {item.memberName}
                                                            </div>
                                                            <h5
                                                                className="text-white"
                                                                style={{
                                                                    fontSize: "16px",
                                                                    marginBottom: 0,
                                                                    color: "white",
                                                                }}
                                                            >
                                                                {item.deptName}
                                                            </h5>
                                                        </div>
                                                        <img
                                                            width={"20%"}
                                                            src={imageUrls[index % imageUrls.length]} // Cycling through image URLs
                                                            alt={`Image ${index}`}
                                                        />
                                                        <UncontrolledTooltip target={`index_member_${index}`} placement='top'>
                                                            {item.memberName}
                                                        </UncontrolledTooltip>
                                                    </a>
                                                )
                                            })
                                            :
                                            <h1 className="text-danger" style={{ textAlign: 'center', position: 'absolute', top: '45%' }}>
                                                NO DATA
                                            </h1>
                                    }
                                </CardBody>
                            </Card>
                            <Card style={{ marginBottom: 0, width: "79%" }}>
                                <CardHeader style={{ display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                                    <div>
                                        <span className="mdi mdi-star-circle"></span> {appListData?.data?.title}
                                    </div>
                                </CardHeader>
                                <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                                    <div className="spinner-wrapper" style={{ display: loadingSpinner1 ? "block" : "none", zIndex: "9999", position: "absolute", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            <Spinner style={{ padding: "24px", display: "block", position: "flex", justifyContent: 'center', alignItems: 'center' }} color="primary" />
                                        </div>
                                    </div>
                                    <Row
                                        className="py-2 m-2 d-flex justify-content-center align-items-center"
                                        style={{ gap: "25px", height: "370px" }}
                                    >
                                        {Array.isArray(appListData?.data?.list) && appListData?.data?.list.length > 0 ? appListData?.data?.list?.map((item, index) => {

                                            return (

                                                <Card
                                                    key={index}
                                                    className="fade-in"
                                                    hidden={blinker}
                                                    onClick={() => appDetailHandler(item)}
                                                    style={{
                                                        width: "30%",
                                                        height: "150px",
                                                        overflow: "hidden",
                                                    }}>
                                                    <a onContextMenu={(e) => { e.preventDefault(); }} href="/home/detail" draggable="false">

                                                        <CardBody
                                                            style={{
                                                                display: "flex",
                                                                padding: "10px",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                                position: "relative",
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    position: 'relative',
                                                                    margin: '0',
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        position: 'absolute',
                                                                        bottom: 45,
                                                                        left: 65,
                                                                        transform: 'translateX(-50%)',
                                                                        display: 'flex',
                                                                        flexDirection: 'row',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                    }}
                                                                >
                                                                    {
                                                                        Array.from({ length: item.bestEmployeeCount }, (_, i) => (
                                                                            <React.Fragment key={i}>
                                                                                <img width={'20px'} src={star} />
                                                                            </React.Fragment>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                            <img
                                                                draggable="false"
                                                                style={{
                                                                    minWidth: "10em",
                                                                    maxWidth: "10em",
                                                                    height: "10em",
                                                                    objectFit: "cover",
                                                                    objectPosition: "center top",
                                                                    borderRadius: "50%",
                                                                    marginRight: "5%",
                                                                }}
                                                                src={encodeURI(item.profileUrl)}
                                                                alt="Profile Image"
                                                            />

                                                            <Col
                                                                style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-start',
                                                                    maxWidth: "60%"
                                                                }}
                                                            >
                                                                <div
                                                                    style={{
                                                                        color: '#495057',
                                                                        fontSize: "20px",
                                                                        fontWeight: "bold",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        width: "95%"
                                                                    }}
                                                                    id={`tooltip-name-${index}-${index + 1}`}
                                                                >
                                                                    {item?.memberName}
                                                                </div>
                                                                <UncontrolledTooltip target={`tooltip-name-${index}-${index + 1}`}>
                                                                    {item.memberName}
                                                                </UncontrolledTooltip>
                                                                <div
                                                                    className="text-primary"
                                                                    style={{
                                                                        fontSize: "16px",
                                                                        textOverflow: "ellipsis",
                                                                        whiteSpace: "nowrap",
                                                                        overflow: "hidden",
                                                                        width: "100%"
                                                                    }}>
                                                                    {item.deptName}
                                                                </div>
                                                            </Col>
                                                            {
                                                                item.stickerList &&
                                                                item.stickerList
                                                                    .slice()
                                                                    .sort((a, b) => {
                                                                        return (
                                                                            b.stickerId - a.stickerId
                                                                        )
                                                                    })
                                                                    .map((row, i) => {
                                                                        const tooltipTarget = `tooltip-${index}-${i}`;

                                                                        return (
                                                                            <React.Fragment key={i}>
                                                                                <img
                                                                                    style={{
                                                                                        position: "absolute",
                                                                                        top: 8,
                                                                                        right: i * 32 + "px",
                                                                                        width: "22px",
                                                                                    }}
                                                                                    src={row.stickerUrl}
                                                                                    id={tooltipTarget}
                                                                                />
                                                                                <UncontrolledTooltip target={tooltipTarget}>
                                                                                    {row.stickerName}
                                                                                </UncontrolledTooltip>
                                                                            </React.Fragment>
                                                                        );
                                                                    })
                                                            }
                                                        </CardBody>
                                                    </a>
                                                </Card>
                                            )
                                        })
                                            :
                                            <h1 className="text-danger" style={{ textAlign: 'center' }}>
                                                NO DATA
                                            </h1>
                                        }
                                    </Row>
                                    <Row>
                                        <div className="d-flex justify-content-center">
                                            <nav>
                                                <ul className="pagination unselectable">
                                                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => {
                                                                setBlinker(true)
                                                                handlePageChange(currentPage - 1)
                                                            }}
                                                        >
                                                            <span className="mdi mdi-arrow-left-bold"></span>
                                                        </button>
                                                    </li>

                                                    {renderPageNumbers()}

                                                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                                        <button
                                                            className="page-link"
                                                            onClick={() => {
                                                                setBlinker(true)
                                                                handlePageChange(currentPage + 1)
                                                            }}
                                                        >
                                                            <span className="mdi mdi-arrow-right-bold"></span>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", margin: "12px 0 12px 0", width: "100%" }}>
                            <Card style={{
                                padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%",
                            }}>
                                <CardHeader style={{ fontSize: "16px" }}>
                                    <span className="mdi mdi-star-circle"></span> Employee of the Month
                                </CardHeader>
                                <CardBody style={{
                                    padding: 0,
                                    margin: 0,
                                    overflow: "hidden",
                                    backgroundColor: "transparent",
                                    display: "flex",
                                }}>
                                    <div
                                        className="d-flex justify-content-between py-2"
                                        style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                                    >
                                        <a
                                            className="arrow-left"
                                            onClick={() => handleSliderChange('back')}
                                            style={{
                                                position: "absolute",
                                                left: 0, top: '20.5%',
                                                height: "80%",
                                                width: "12%",
                                                zIndex: 2
                                            }}>
                                            <span className="mdi mdi-chevron-left" style={{ position: "absolute", left: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                        </a>
                                        {
                                            appBestlistOfMonthData?.data?.list &&
                                                appBestlistOfMonthData?.data?.list.length > 0 ?
                                                appBestlistOfMonthData?.data?.list.map((row, key) => {
                                                    return (
                                                        <Card
                                                            key={key}
                                                            className="slideshow-content"
                                                            style={{
                                                                width: "25vw",
                                                                height: "150px",
                                                                position: "relative",
                                                                left: `${(key * 5) + sliderMonth}vw`,
                                                                transition: "left 0.5s ease",
                                                            }}>
                                                            <CardBody
                                                                style={{
                                                                    display: "flex",
                                                                    padding: "10px",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    height: "100%",
                                                                }}>
                                                                <div
                                                                    style={{
                                                                        position: 'relative',
                                                                        margin: '0',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            position: 'absolute',
                                                                            bottom: 50,
                                                                            left: 73,
                                                                            transform: 'translateX(-50%)',
                                                                            display: 'flex',
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        {
                                                                            Array.from({ length: row.bestEmployeeCount }, (_, i) => (
                                                                                <React.Fragment key={i}>
                                                                                    <img width={'20px'} src={star} />
                                                                                </React.Fragment>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                <img
                                                                    draggable="false"
                                                                    style={{
                                                                        minWidth: "10em",
                                                                        maxWidth: "10em",
                                                                        height: "10em",
                                                                        objectFit: "cover",
                                                                        objectPosition: "center top",
                                                                        borderRadius: "50%",
                                                                        marginRight: "5%",
                                                                    }}
                                                                    src={encodeURI(row.profileUrl)}
                                                                    alt="Profile Image"
                                                                />
                                                                <Col style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-start',
                                                                    maxWidth: "60%"
                                                                }}>
                                                                    <div
                                                                        style={{
                                                                            fontSize: "20px",
                                                                            fontWeight: "bold",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            width: "95%"
                                                                        }}
                                                                        id={`tooltip-name-${key}-${row.memberId.toString().replace(/\t/g, '')}`}
                                                                    >
                                                                        {row.memberName}
                                                                    </div>
                                                                    <UncontrolledTooltip target={`tooltip-name-${key}-${row.memberId.toString().replace(/\t/g, '')}`}>
                                                                        {row.memberName}
                                                                    </UncontrolledTooltip>
                                                                    <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{row.deptName}</div>
                                                                    <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>{row.category}</div>
                                                                </Col>
                                                            </CardBody>
                                                        </Card>
                                                    )
                                                })
                                                : (
                                                    // <h1
                                                    //     className="text-danger"
                                                    //     style={{
                                                    //         textAlign: 'center',
                                                    //         position: 'absolute',
                                                    //         width: '100%',
                                                    //         height: '150px',
                                                    //         top: '50%',
                                                    //     }}>
                                                    //     NO DATA
                                                    // </h1>
                                                    <Card
                                                        className="slideshow-content"
                                                        style={{
                                                            // opacity: "0",
                                                            width: "25vw",
                                                            height: "150px",
                                                            position: "relative",
                                                            left: `3.5vw`,
                                                            transition: "left 0.5s ease",
                                                        }}>
                                                        <CardBody
                                                            style={{
                                                                display: "flex",
                                                                padding: "10px",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                            }}>
                                                            {/* <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span> */}
                                                            {/* <img
                                                                src={crown}
                                                                style={{
                                                                    position: "absolute",
                                                                    right: 0,
                                                                    top: 5,
                                                                    color: "gold",
                                                                    width: "64px",
                                                                    fontSize: "32px"
                                                                }}
                                                                className="mdi mdi-crown px-3 py-1"
                                                            /> */}
                                                            <img
                                                                src="http://192.168.0.29:8080/filefotocpr/default-user.png"
                                                                style={{
                                                                    minWidth: "10em",
                                                                    maxWidth: "10em",
                                                                    height: "10em",
                                                                    objectFit: "cover",
                                                                    borderRadius: "50%",
                                                                    marginRight: "5%",
                                                                }}
                                                                alt="Profile Image"
                                                            />
                                                            <Col style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                maxWidth: "60%"
                                                            }}>
                                                                <div style={{ opacity: '.5', fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>[Name]</div>
                                                                <div className="text-primary" style={{ opacity: '.5', fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>[Department]</div>
                                                                <div className="text-warning" style={{ opacity: '.5', fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>[Title]</div>
                                                            </Col>
                                                        </CardBody>
                                                    </Card>
                                                )
                                        }
                                        <a
                                            className="arrow-right"
                                            onClick={() => handleSliderChange('next')}
                                            style={{
                                                position: "absolute",
                                                right: 0,
                                                top: '20.5%',
                                                height: "80%",
                                                width: "12%",
                                                zIndex: 2
                                            }}>
                                            <span className="mdi mdi-chevron-right" style={{ position: "absolute", right: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                            {linkRekomendasi && (
                                <a
                                    className="berikan-recommend"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "24px",
                                        position: "relative", // Added for stacking
                                        transform: isBreathing ? 'scale(1.15)' : 'scale(1)',
                                        transition: 'transform 1s ease',
                                    }}
                                    href={linkRekomendasi}
                                >
                                    <img
                                        height={'180px'}
                                        src={give}
                                        style={{
                                            transition: 'transform 0.3s ease-in-out',
                                        }}
                                    />
                                    <b>Berikan Bintang</b>
                                    <div
                                        style={{
                                            position: "absolute",
                                            top: 0,
                                            left: 0,
                                            width: "100%",
                                            height: "100%",
                                            background: "rgba(0, 0, 0, 0.5)", // Adjust the darkness here (0.5 means 50% dark)
                                            opacity: 0, // Initially invisible
                                            transition: "opacity 0.3s", // Add a transition for smooth hover effect
                                        }}
                                    ></div>
                                </a>
                            )}
                            <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%" }}>
                                <CardHeader style={{ fontSize: "16px" }}>
                                    <span className="mdi mdi-star-circle"></span> {appListData?.data?.eoy}
                                </CardHeader>
                                <CardBody style={{
                                    padding: 0, margin: 0, backgroundColor: "transparent", display: "flex",
                                    overflow: "hidden"
                                }}>
                                    <div
                                        className="d-flex justify-content-between py-2"
                                        style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                                    >
                                        <a
                                            className="arrow-left"
                                            onClick={() => handleSliderChange2('back')}
                                            style={{
                                                position: "absolute",
                                                left: 0,
                                                top: '20.5%',
                                                height: "80%",
                                                width: "12%",
                                                zIndex: 2
                                            }}>
                                            <span className="mdi mdi-chevron-left" style={{ position: "absolute", left: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                        </a>
                                        {
                                            appBestlistOfYearData?.data?.list && appBestlistOfYearData?.data?.list.length > 0 ?
                                                appBestlistOfYearData?.data?.list.map((row, key) => {
                                                    return (
                                                        <Card
                                                            key={key}
                                                            className="slideshow-content"
                                                            style={{
                                                                width: "25vw",
                                                                height: "150px",
                                                                position: "relative",
                                                                left: `${(key * 5) + sliderYear}vw`,
                                                                transition: "left 0.5s ease",
                                                            }}>
                                                            <CardBody
                                                                style={{
                                                                    display: "flex",
                                                                    padding: "10px",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    height: "100%",
                                                                }}>
                                                                <div
                                                                    style={{
                                                                        position: 'relative',
                                                                        margin: '0',
                                                                    }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            position: 'absolute',
                                                                            bottom: 50,
                                                                            left: 73,
                                                                            transform: 'translateX(-50%)',
                                                                            display: 'flex',
                                                                            flexDirection: 'row',
                                                                            justifyContent: 'center',
                                                                            alignItems: 'center',
                                                                        }}
                                                                    >
                                                                        {
                                                                            Array.from({ length: row.bestEmployeeCount }, (_, i) => (
                                                                                <React.Fragment key={i}>
                                                                                    <img width={'20px'} src={star} />
                                                                                </React.Fragment>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {/* <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span> */}
                                                                {/* <img
                                                                    src={row.gender.toLowerCase() === 'male' ? crown : tiara}
                                                                    style={{
                                                                        position: "absolute",
                                                                        right: 0,
                                                                        top: 5,
                                                                        color: "gold",
                                                                        width: "64px",
                                                                        fontSize: "32px"
                                                                    }}
                                                                    className="mdi mdi-crown px-3 py-1"
                                                                /> */}
                                                                <img
                                                                    draggable="false"
                                                                    style={{
                                                                        minWidth: "10em",
                                                                        maxWidth: "10em",
                                                                        height: "10em",
                                                                        objectFit: "cover",
                                                                        objectPosition: "center top",
                                                                        borderRadius: "50%",
                                                                        marginRight: "5%",
                                                                    }}
                                                                    src={encodeURI(row.profileUrl)}
                                                                    alt="Profile Image"
                                                                />
                                                                <Col style={{
                                                                    display: 'flex',
                                                                    flexDirection: 'column',
                                                                    alignItems: 'flex-start',
                                                                    maxWidth: "60%"
                                                                }}>
                                                                    <div
                                                                        style={{
                                                                            fontSize: "20px",
                                                                            fontWeight: "bold",
                                                                            textOverflow: "ellipsis",
                                                                            whiteSpace: "nowrap",
                                                                            overflow: "hidden",
                                                                            width: "95%"
                                                                        }}
                                                                        id={`tooltip-name-${key}-${row.memberId.toString().replace(/\t/g, '')}`}
                                                                    >
                                                                        {row.memberName}
                                                                    </div>

                                                                    <UncontrolledTooltip target={`tooltip-name-${key}-${row.memberId.toString().replace(/\t/g, '')}`}>
                                                                        {row.memberName}
                                                                    </UncontrolledTooltip>
                                                                    <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{row.deptName}</div>
                                                                    <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>{row.category}</div>
                                                                </Col>
                                                            </CardBody>
                                                        </Card>
                                                    )
                                                })
                                                : (

                                                    // <h1
                                                    //     className="text-danger"
                                                    //     style={{
                                                    //         textAlign: 'center',
                                                    //         position: 'absolute',
                                                    //         width: '100%',
                                                    //         height: '150px',
                                                    //         top: '50%',
                                                    //     }}>
                                                    //     NO DATA
                                                    // </h1>
                                                    <Card
                                                        className="slideshow-content"
                                                        style={{
                                                            // opacity: "0",
                                                            width: "25vw",
                                                            height: "150px",
                                                            position: "relative",
                                                            left: `3.5vw`,
                                                            transition: "left 0.5s ease",
                                                        }}>
                                                        <CardBody
                                                            style={{
                                                                display: "flex",
                                                                padding: "10px",
                                                                justifyContent: "center",
                                                                alignItems: "center",
                                                                height: "100%",
                                                            }}>
                                                            {/* <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span> */}
                                                            {/* <img
                                                                src={crown}
                                                                style={{
                                                                    position: "absolute",
                                                                    right: 0,
                                                                    top: 5,
                                                                    color: "gold",
                                                                    width: "64px",
                                                                    fontSize: "32px"
                                                                }}
                                                                className="mdi mdi-crown px-3 py-1"
                                                            /> */}
                                                            <img
                                                                src="http://192.168.0.29:8080/filefotocpr/default-user.png"
                                                                style={{
                                                                    minWidth: "10em",
                                                                    maxWidth: "10em",
                                                                    height: "10em",
                                                                    objectFit: "cover",
                                                                    borderRadius: "50%",
                                                                    marginRight: "5%",
                                                                }}
                                                                alt="Profile Image"
                                                            />
                                                            <Col style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                maxWidth: "60%"
                                                            }}>
                                                                <div style={{ opacity: '.5', fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>[Name]</div>
                                                                <div className="text-primary" style={{ opacity: '.5', fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>[Department]</div>
                                                                <div className="text-warning" style={{ opacity: '.5', fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>[Title]</div>
                                                            </Col>
                                                        </CardBody>
                                                    </Card>
                                                )
                                        }
                                        <a
                                            className="arrow-right"
                                            onClick={() => handleSliderChange2('next')}
                                            style={{
                                                position: "absolute",
                                                right: 0,
                                                top: '20.5%',
                                                height: "80%",
                                                width: "12%",
                                                zIndex: 2
                                            }}>
                                            <span className="mdi mdi-chevron-right" style={{ position: "absolute", right: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>
                    </Container>
                </React.Fragment >
            }
        />
    );
};

export default Rekomendasi;
