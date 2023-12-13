import RootPageCustom from 'common/RootPageCustom'
import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Container, UncontrolledAlert } from 'reactstrap'

const MaintainRole = () => {

    const [appLocationMaster, setAppLocationMaster] = useState(true)
    const [appLocationMasterMsg, setAppLocationMasterMsg] = useState('')

    return (

        <RootPageCustom msgStateGet={null} msgStateSet={null}
            componentJsx={
                <React.Fragment>
                    {appLocationMasterMsg !== "" ? <UncontrolledAlert toggle={() => { setAppLocationMasterMsg("") }} color={appLocationMasterMsg?.status == "1" ? "success" : "danger"}>
                        {typeof appLocationMasterMsg == 'string' ? null : appLocationMasterMsg?.message}</UncontrolledAlert> : null}
                    <Container
                        style={{ display: appLocationMaster ? 'block' : "none" }}
                        fluid
                    >
                        <Card style={{ marginBottom: 0 }}>
                            <CardHeader>
                                <span className="mdi mdi-account-tie"></span> Maintain Role
                            </CardHeader>
                            <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>
                            </CardBody>
                        </Card>
                    </Container>
                </React.Fragment>
            }

        />
    )
}

export default MaintainRole