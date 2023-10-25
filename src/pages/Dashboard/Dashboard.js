import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
import { getSearchData } from "store/actions";
import '../../assets/scss/custom.scss';
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';

const Rekomendasi = () => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

    const dummyData = [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
        'Item 5',
        'Item 6',
        'Item 7',
        'Item 8',
        'Item 9',
        'Item 10',
        'Item 11',
        'Item 12',
        'Item 13',
        'Item 14',
        'Item 15',
        'Item 16',
        'Item 17',
        'Item 18',
        'Item 19',
        'Item 20',
        'Item 21',
        'Item 22',
        'Item 23',
        'Item 24',
        'Item 25',
        'Item 26',
        'Item 27',
        'Item 28',
        'Item 29',
        'Item 30',
        'Item 31',
        'Item 32',
        'Item 33',
        'Item 34',
        'Item 35',
        'Item 36',
        'Item 37',
        'Item 38',
        'Item 39',
        'Item 40',
        'Item 41',
        'Item 42',
        'Item 43',
        'Item 44',
        'Item 45',
        'Item 46',
        'Item 47',
        'Item 48',
        'Item 49',
        'Item 50',
    ];

    const itemsPerPage = 6;

    const maxListItems = 3;

    const [blinker, setBlinker] = useState(false)

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(dummyData.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = dummyData.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setBlinker(false);
        }, 200);

        return () => {
            clearInterval(intervalId);
        };
    }, [blinker]);

    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= maxListItems) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 2) {
                pageNumbers.push(1, 2, 3);
                pageNumbers.push('...', totalPages);
            } else if (currentPage >= totalPages - 1) {
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
                            setBlinker(true)
                            handlePageChange(page)
                        }}
                    >
                        {page}
                    </button>
                )}
            </li>
        ));
    };

    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <>
                    <React.Fragment>
                        <Container fluid>
                            <Card style={{ marginBottom: 0 }}>
                                <CardHeader>
                                    <span className="mdi mdi-star-circle"></span> Best Recommendation
                                </CardHeader>
                                <CardBody className="bg-light" style={{ padding: 0, margin: 0, border: "1px solid #BBB" }}>
                                    {/* <Row
                                        className="py-2 m-2"
                                    >
                                        <div className="d-flex justify-content-between" style={{ width: "300px" }}>
                                            <Input
                                                style={{ marginRight: '10px' }}
                                            />
                                            <Button>
                                                Cari
                                            </Button>
                                        </div>
                                    </Row>
                                    <hr /> */}
                                    <Row
                                        className="py-2 m-2 d-flex justify-content-center align-items-center"
                                        style={{ gap: "25px", height: "370px" }}
                                    >
                                        {currentItems.map((item, index) => {

                                            return (

                                                <Card
                                                    key={index}
                                                    className="fade-in"
                                                    hidden={blinker}
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
                                                        }}>
                                                        <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span>
                                                        <div
                                                            style={{
                                                                minWidth: "10em",
                                                                maxWidth: "10em",
                                                                height: "10em",
                                                                borderRadius: "50%",
                                                                marginRight: "5%",
                                                                backgroundImage: 'url("https://dummyimage.com/600x600/000/fff")',
                                                                backgroundSize: "cover",
                                                            }}
                                                        ></div>
                                                        <Col style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            alignItems: 'flex-start',
                                                            gap: '8px',
                                                            maxWidth: "60%"
                                                        }}>
                                                            <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>Annas Sigit Adityo Mulyo</div>
                                                            <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>{item}</div>
                                                            <div style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>Appreciation Name</div>
                                                        </Col>
                                                    </CardBody>
                                                </Card>
                                            )
                                        })}
                                    </Row>
                                    <Row>
                                        <div className="d-flex justify-content-center">
                                            <nav>
                                                <ul className="pagination">
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
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%" }}>
                                            <CardHeader>
                                                <span className="mdi mdi-star-circle"></span> Employee of the Month
                                            </CardHeader>
                                            <CardBody style={{ padding: 0, margin: 0, backgroundColor: "transparent", display: "flex", justifyContent: "center" }}>
                                                <div
                                                    className="d-flex justify-content-between py-2"
                                                    style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                                                >
                                                    <a className="arrow-left" style={{ position: "absolute", left: 0, top: '19.2%', height: "80.6%", width: "12%", zIndex: 2 }}>
                                                        <span className="mdi mdi-chevron-left" style={{ position: "absolute", left: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                    </a>
                                                    <Card
                                                        className="fade-in"
                                                        hidden={blinker}
                                                        style={{
                                                            width: "25vw",
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
                                                            }}>
                                                            <span style={{ position: "absolute", right: 0, top: 0, color: "gold", fontSize: "32px" }} className="mdi mdi-crown px-3 py-1"></span>
                                                            <div
                                                                style={{
                                                                    minWidth: "10em",
                                                                    maxWidth: "10em",
                                                                    height: "10em",
                                                                    borderRadius: "50%",
                                                                    marginRight: "5%",
                                                                    backgroundImage: 'url("https://dummyimage.com/600x600/000/fff")',
                                                                    backgroundSize: "cover",
                                                                }}
                                                            ></div>
                                                            <Col style={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'flex-start',
                                                                gap: '8px',
                                                                maxWidth: "60%"
                                                            }}>
                                                                <div style={{ fontSize: "20px", fontWeight: "bold", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "95%" }}>Annas Sigit Adityo Mulyo</div>
                                                                <div className="text-primary" style={{ fontSize: "16px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>lorem ipsum</div>
                                                                <div style={{ fontSize: "14px", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", width: "100%" }}>Appreciation Name</div>
                                                            </Col>
                                                        </CardBody>
                                                    </Card>
                                                    <a className="arrow-right" style={{ position: "absolute", right: 0, top: '19.2%', height: "80.6%", width: "12%", zIndex: 2 }}>
                                                        <span className="mdi mdi-chevron-right" style={{ position: "absolute", right: "2%", top: 35, fontSize: "62px", zIndex: 2 }} />
                                                    </a>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent", width: "35%" }}>
                                            <CardHeader>
                                                <span className="mdi mdi-star-circle"></span> Employee of the Year
                                            </CardHeader>
                                            <CardBody style={{ padding: 0, margin: 0, backgroundColor: "transparent" }}>
                                                <Row
                                                    className="d-flex justify-content-between py-1"
                                                    style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                                                >
                                                    texst
                                                </Row>
                                            </CardBody>
                                        </Card>
                                    </div>
                                </CardBody>
                            </Card>

                        </Container>
                        <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                        </div>
                    </React.Fragment>
                </>
            }
        />
    );
};

export default Rekomendasi;
