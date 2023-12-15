import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardHeader, Container } from 'reactstrap'
import ApplicationRoleAccess from './ApplicationRoleAccess'

const RoleAccess = (props) => {

    const [tabAppRole, setTabAppRole] = useState(false)
    const [tabUserRole, setTabUserRole] = useState(false)

    useEffect(() => {
        if (props.appAccessRole) {
            setTabAppRole(true)
        } else {
            setTabAppRole(false)
        }
    }, [props.appAccessRole])

    return (
        <Container
            style={{ display: props.appAccessRole ? 'block' : "none" }}
            fluid
        >
            <Card style={{ marginBottom: 0 }}>
                <CardHeader>
                    <span className="mdi mdi-format-list-bulleted"></span> Maintain Access Role
                </CardHeader>
                <CardBody className="bg-light" style={{ paddingTop: "1rem", paddingBottom: "1rem", margin: 0, border: "1px solid #BBB" }}>

                    <div style={{
                        display: 'flex'
                    }}>
                        <button
                            className={`btn btn${tabAppRole ? '' : '-outline'}-primary`}
                            style={{
                                borderRadius: '.25rem .25rem 0 0',
                                marginBottom: '-1px'
                            }}
                            onClick={() => {
                                setTabAppRole(true)
                                setTabUserRole(false)
                            }}
                        >
                            Application Role
                        </button>
                        <button
                            className={`btn btn${tabUserRole ? '' : '-outline'}-primary`}
                            style={{
                                borderRadius: '.25rem .25rem 0 0',
                                marginBottom: '-1px'
                            }}
                            onClick={() => {
                                setTabAppRole(false)
                                setTabUserRole(true)
                            }}
                        >
                            User Role
                        </button>
                    </div>
                    <Card
                        style={{
                            backgroundColor: 'transparent'
                        }}
                    >
                        <CardHeader
                            style={{
                                borderColor: '#A084DC',
                                borderTop: '1px solid #A084DC',
                                borderRight: '1px solid #A084DC',
                                borderLeft: '1px solid #A084DC',
                            }}
                        >
                            {tabAppRole ? 'Data Application Role' : 'Data User Role'}
                        </CardHeader>
                        <CardBody
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            {tabAppRole ?
                                (
                                    <ApplicationRoleAccess
                                        tabAppRole={tabAppRole}
                                        appMaintainRoleData={props.appMaintainRoleData}
                                    />
                                )
                                :
                                null
                            }
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
            <Button
                className="btn btn-danger my-3"
                onClick={() => {
                    props.setAppMaintainRole(true)
                    props.setAppAccessRole(false)
                }}
            >
                <span className="mdi mdi-arrow-left" />
                &nbsp;Kembali
            </Button>
        </Container>
    )
}

RoleAccess.propTypes = {
    appMaintainRoleData: PropTypes.any,
    appAccessRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppAccessRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
}

export default RoleAccess