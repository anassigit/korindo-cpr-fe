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
import { getBestListData, getBestOfMonthListData, getBestOfYearListData, getSearchData } from "store/actions";
import '../../assets/scss/custom.scss';
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';
import { ReactSession } from 'react-client-session';
import DetailInfluencer from "./DetailInfluencer";
import crown from "../../assets/images/crown.png"
import tiara from "../../assets/images/tiara.png"
import give from "../../assets/images/Give Mahkota.png"
import ProfileMenu from "components/CommonForBoth/TopbarDropdown/ProfileMenu";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Rekomendasi = () => {

    const dispatch = useDispatch()
    const history = useHistory()

    const menu = JSON.parse(ReactSession.get("menu"));
    const [linkRekomendasi, setLinkRekomendasi] = useState();
    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const [appDashboardPage, setAppDashboardPage] = useState(true)
    const [appDetailRecommendationPage, setAppDetailRecommendationPage] = useState(false)

    const [appDetailRecommendationData, setAppDetailRecommendationData] = useState()

    const [sliderMonth, setSliderMonth] = useState(4)
    const [sliderYear, setSliderYear] = useState(4)

    const appBestlistData = useSelector((state) => state.dashboardReducer.respGetBestList);
    const appBestlistOfMonthData = useSelector((state) => state.dashboardReducer.respGetBestOfMonthList);
    const appBestlistOfYearData = useSelector((state) => state.dashboardReducer.respGetBestOfYearList);

    const itemsPerPage = 6;
    const [blinker, setBlinker] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const totalItems = appBestlistData?.data?.count;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    useEffect(() => {
        dispatch(getBestOfMonthListData())
        dispatch(getBestOfYearListData())
        const foundRow = menu.find((row) => row.id === 'KORTRN001');
        const temp = foundRow ? foundRow.path : null;

        setLinkRekomendasi(temp);
    }, [])

    useEffect(() => {
        dispatch(getBestListData({
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
    }, [appBestlistData])

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
                newSliderYear = sliderYear >= 2.6 ? -56 : (sliderYear + step);
            } else if (lengthArray2 === 2) {
                newSliderYear = sliderYear >= 2.6 ? -26 : (sliderYear + step);
            } else {
                newSliderYear = 4;
            }
        } else {
            if (lengthArray2 === 3) {
                newSliderYear = sliderYear <= -56 ? 4 : (sliderYear - step);
            } else if (lengthArray2 === 2) {
                newSliderYear = sliderYear <= -26 ? 2.6 : (sliderYear - step);
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
        history.push('/home/detail')
    }

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    <Container hidden={!appDashboardPage} fluid>
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader style={{ display: "flex", justifyContent: "space-between" }}>
                                <div>
                                    <span className="mdi mdi-star-circle"></span> {appBestlistData?.data?.title}
                                </div>
                                <div>
                                    <img
                                        src={give}
                                        style={{
                                            color: "gold",
                                            width: "18px",
                                        }}
                                        className="mdi mdi-crown mx-2"
                                    />

                                    {appBestlistData?.data?.crown}
                                </div>
                            </CardHeader>
                            <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                                <Row
                                    className="py-2 m-2 d-flex justify-content-center align-items-center"
                                    style={{ gap: "25px", height: "370px" }}
                                >
                                    {appBestlistData?.data?.list?.map((item, index) => {
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
                                                <CardBody
                                                    style={{
                                                        display: "flex",
                                                        padding: "10px",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        height: "100%",
                                                        position: "relative", // Add relative positioning to the container
                                                    }}
                                                >
                                                    <img
                                                        style={{
                                                            minWidth: "10em",
                                                            maxWidth: "10em",
                                                            height: "10em",
                                                            objectFit: "cover",
                                                            objectPosition: "center top",
                                                            borderRadius: "50%",
                                                            marginRight: "5%",
                                                        }}
                                                        src={encodeURI(item?.profile_url)}
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
                                                        <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>{item?.name}</div>
                                                        <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{item.dept_name}</div>
                                                        <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", marginTop: "2vh" }}>{item.position}</div>
                                                    </Col>
                                                    {
                                                        item.stickerList &&
                                                        item.stickerList
                                                            .slice()
                                                            .sort((a, b) => {
                                                                return (
                                                                    b.id - a.id
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
                                                                            src={row.url}
                                                                            id={tooltipTarget}
                                                                        />
                                                                        <UncontrolledTooltip target={tooltipTarget}>
                                                                            {row.name}
                                                                        </UncontrolledTooltip>
                                                                    </React.Fragment>
                                                                );
                                                            })
                                                    }

                                                </CardBody>

                                            </Card>
                                        )
                                    })}
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
                                <hr />
                                <div style={{ display: "flex", justifyContent: "space-evenly", marginBottom: "12px" }}>
                                    <Card style={{
                                        padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%",
                                    }}>
                                        <CardHeader>
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
                                                        left: 0, top: '19.2%',
                                                        height: "80.6%",
                                                        width: "12%",
                                                        zIndex: 2
                                                    }}>
                                                    <span className="mdi mdi-chevron-left" style={{ position: "absolute", left: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                </a>
                                                {
                                                    appBestlistOfMonthData?.data?.list ?
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
                                                                        {/* <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span> */}
                                                                        <img
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
                                                                        />
                                                                        <img
                                                                            style={{
                                                                                minWidth: "10em",
                                                                                maxWidth: "10em",
                                                                                height: "10em",
                                                                                objectPosition: "center top",
                                                                                objectFit: "cover",
                                                                                borderRadius: "50%",
                                                                                marginRight: "5%",
                                                                            }}
                                                                            src={encodeURI(row?.profile_url)}
                                                                            alt="Profile Image"
                                                                        />
                                                                        <Col style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'flex-start',
                                                                            maxWidth: "60%"
                                                                        }}>
                                                                            <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>{row.name}</div>
                                                                            <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{row.dept_name}</div>
                                                                            <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>{row.category}</div>
                                                                        </Col>
                                                                    </CardBody>
                                                                </Card>
                                                            )
                                                        })
                                                        : (
                                                            <Card
                                                                className="slideshow-content"
                                                                style={{
                                                                    opacity: "0",
                                                                    width: "25vw",
                                                                    height: "150px",
                                                                    position: "relative",
                                                                    left: `0vw`,
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
                                                                    <img
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
                                                                    />
                                                                    <img
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
                                                                        <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>test</div>
                                                                        <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>teestt</div>
                                                                        <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>test</div>
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
                                                        top: '19.2%',
                                                        height: "80.6%",
                                                        width: "12%",
                                                        zIndex: 2
                                                    }}>
                                                    <span className="mdi mdi-chevron-right" style={{ position: "absolute", right: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                </a>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%" }}>
                                        <CardHeader>
                                            <span className="mdi mdi-star-circle"></span> Employee of the Year
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
                                                        top: '19.2%',
                                                        height: "80.6%",
                                                        width: "12%",
                                                        zIndex: 2
                                                    }}>
                                                    <span className="mdi mdi-chevron-left" style={{ position: "absolute", left: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                </a>
                                                {
                                                    appBestlistOfYearData?.data?.list ?
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
                                                                        {/* <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span> */}
                                                                        <img
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
                                                                        />
                                                                        <img
                                                                            style={{
                                                                                minWidth: "10em",
                                                                                maxWidth: "10em",
                                                                                height: "10em",
                                                                                objectPosition: "center top",
                                                                                objectFit: "cover",
                                                                                borderRadius: "50%",
                                                                                marginRight: "5%",
                                                                            }}
                                                                            src={encodeURI(row?.profile_url)}
                                                                            alt="Profile Image"
                                                                        />
                                                                        <Col style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            alignItems: 'flex-start',
                                                                            maxWidth: "60%"
                                                                        }}>
                                                                            <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>{row.name}</div>
                                                                            <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{row.dept_name}</div>
                                                                            <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>{row.category}</div>
                                                                        </Col>
                                                                    </CardBody>
                                                                </Card>
                                                            )
                                                        })
                                                        : (
                                                            <Card
                                                                className="slideshow-content"
                                                                style={{
                                                                    opacity: "0",
                                                                    width: "25vw",
                                                                    height: "150px",
                                                                    position: "relative",
                                                                    left: `0vw`,
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
                                                                    <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span>
                                                                    <img
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
                                                                        <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>test</div>
                                                                        <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>teestt</div>
                                                                        <div className="text-warning" style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%", fontWeight: "bold", marginTop: "2vh" }}>test</div>
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
                                                        top: '19.2%',
                                                        height: "80.6%",
                                                        width: "12%",
                                                        zIndex: 2
                                                    }}>
                                                    <span className="mdi mdi-chevron-right" style={{ position: "absolute", right: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                </a>
                                            </div>
                                        </CardBody>
                                    </Card>
                                    &nbsp;
                                    <a
                                        className="berikan-recommend"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "24px",
                                            position: "relative", // Added for stacking
                                        }}
                                        href={linkRekomendasi}
                                    >
                                        <img
                                            height={'180px'}
                                            src={give}
                                            style={{
                                                transition: "filter 0.3s", // Add a transition for smooth hover effect
                                            }}
                                        />
                                        <b>Berikan Mahkota</b>
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

                                    &nbsp;
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                    {/* <DetailInfluencer
                        appDetailRecommendationPage={appDetailRecommendationPage}
                        setAppDetailRecommendationPage={setAppDetailRecommendationPage}
                        appDetailRecommendationData={appDetailRecommendationData}
                    /> */}

                    <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                        <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                    </div>
                </React.Fragment>
            }
        />
    );
};

export default Rekomendasi;
