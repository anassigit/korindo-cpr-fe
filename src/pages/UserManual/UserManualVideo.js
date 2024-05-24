import RootPageCustom from "common/RootPageCustom";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { getManualVideoData } from "store/actions";

const UserManualVideo = () => {
    const dispatch = useDispatch();
    const appManualVideoData = useSelector((state) => state.manualReducer.respGetManualVideo);

    useEffect(() => {
        dispatch(getManualVideoData());
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
                                        src={appManualVideoData?.data?.result}
                                        controls
                                        autoPlay
                                        style={{
                                            width: '75%',
                                            margin: 'auto'
                                        }}>
                                    </video>
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default UserManualVideo;
