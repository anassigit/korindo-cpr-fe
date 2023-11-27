import RootPageCustom from "common/RootPageCustom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { getManualData } from "store/actions";

// ... (other imports)

const UserManual = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const appManualData = useSelector((state) => state.manualReducer.respGetManual);

    const videoRef = useRef(null);

    useEffect(() => {
        dispatch(getManualData());
    }, [dispatch]);


    return (
        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    <Container
                        style={{ display: "block" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-information-outline"></span> User Manual
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <video
                                        src={appManualData?.data?.result}
                                        ref={videoRef}
                                        controls
                                        style={{
                                            width: '40%',
                                            margin: 'auto'
                                        }}>
                                    </video>
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                    Download PDF Tutorial: <a className="link-download" download> <span className="mdi mdi-file-pdf text-danger" style={{ fontSize: "16px" }}></span> Click Here</a>
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default UserManual;
