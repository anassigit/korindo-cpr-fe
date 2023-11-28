import RootPageCustom from "common/RootPageCustom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import { getManualPDFData } from "store/actions";


const UserManualPDF = () => {
    const dispatch = useDispatch();
    const appManualPDFData = useSelector((state) => state.manualReducer.respGetManualPDF);

    useEffect(() => {
        dispatch(getManualPDFData());
    }, [dispatch]);

    const [fileUrl, setFileUrl] = useState()

    useEffect(() => {
        if (appManualPDFData.status === '1') {
            const encodedFileUrl = encodeURI(appManualPDFData?.data?.result);
            setFileUrl(encodedFileUrl);
        }
    }, [appManualPDFData])

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
                                    {
                                        fileUrl ? (
                                            <embed src={fileUrl} type="application/pdf" width={"100%"} height={"700px"} />
                                        ) : 
                                        ( 
                                            <span className="text-danger">
                                                File Doesn&#39;t Exist
                                            </span>
                                         )
                                    }
                                </div>
                            </CardBody>
                        </Card>
                    </Container>
                </React.Fragment>
            }
        />
    );
};

export default UserManualPDF;
