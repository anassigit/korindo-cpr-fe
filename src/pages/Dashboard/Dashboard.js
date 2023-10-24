import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Container,
    Input,
    Row, Spinner
} from "reactstrap";
import { getSearchData } from "store/actions";
import '../../assets/scss/custom.scss';
import RootPageCustom from '../../common/RootPageCustom';
import '../../config';

const Rekomendasi = () => {

    const dispatch = useDispatch()

    const [loadingSpinner, setLoadingSpinner] = useState(false)

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
                                    <Row
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
                                    <hr />
                                    <Row
                                        className="py-2 m-2 d-flex justify-content-center"
                                        style={{ gap: "25px" }}
                                    >
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                    <Row
                                        className="py-2 m-2 d-flex justify-content-center align-items-center"
                                        style={{ gap: "25px" }}
                                    >
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Card style={{
                                            width: "30%",
                                        }}>
                                            <CardBody
                                                style={{
                                                    display: "flex",
                                                    padding: "10px",
                                                    justifyContent: "center",
                                                    alignItems: "center"
                                                }}>
                                                <img
                                                    src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU"
                                                    style={{
                                                        width: "150px",
                                                        height: "150px",
                                                        borderRadius: "50%",
                                                        marginRight: "5%"
                                                    }}
                                                />
                                                <div style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'flex-start',
                                                    gap: '10px',
                                                }}>
                                                    <div>Name</div>
                                                    <div>Department Name</div>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Row>
                                </CardBody>
                            </Card>
                            <Card style={{ padding: 0, margin: "6px 0 0 0", backgroundColor: "transparent" }}>
                                <CardBody style={{ padding: 0, margin: 0, }}>
                                    <Row
                                        className="d-flex justify-content-between py-1"
                                        style={{ fontSize: "14px", marginRight: 1, marginLeft: 1 }}
                                    >
                                    </Row>
                                </CardBody>
                            </Card>
                        </Container>
                        <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                            <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="danger" />
                        </div>
                    </React.Fragment>
                </>
            }
        />
    );
};

export default Rekomendasi;
