import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, CardBody, CardHeader, Container } from 'reactstrap'
import ApplicationRoleAccess from './ApplicationRoleAccess'
import UserRoleAccess from './UserRoleAccess'

const RoleAccess = (props) => {

    const [tabAppRole, setTabAppRole] = useState(false)
    const [appAddAccessRole, setAppAddAccessRole] = useState(false)
    const [appEditAccessRole, setAppEditAccessRole] = useState(false)

    const [tabUserRole, setTabUserRole] = useState(false)
    const [appAddUserRole, setAppAddUserRole] = useState(false)
    const [appEditUserRole, setAppEditUserRole] = useState(false)

    useEffect(() => {
        if (props.appAccessRole) {
            setTabAppRole(true)
        } else {
            setTabAppRole(false)
        }
    }, [props.appAccessRole])

    return (
        <Container
            // style={{ display: props.appAccessRole ? 'block' : "none" }}
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
                            className={`btn btn${tabAppRole || appAddAccessRole || appEditAccessRole ? '' : '-outline'}-primary`}
                            style={{
                                borderRadius: '.25rem .25rem 0 0',
                                marginBottom: '-1px'
                            }}
                            onClick={() => {
                                setTabAppRole(true)
                                setAppAddAccessRole(false)
                                setAppEditAccessRole(false)
                                setAppAddUserRole(false)
                                setAppEditUserRole(false)
                                setTabUserRole(false)
                            }}
                        >
                            Application Role
                        </button>
                        <button
                            className={`btn btn${tabUserRole || appAddUserRole || appEditUserRole ? '' : '-outline'}-primary`}
                            style={{
                                borderRadius: '.25rem .25rem 0 0',
                                marginBottom: '-1px'
                            }}
                            onClick={() => {
                                setTabAppRole(false)
                                setAppAddAccessRole(false)
                                setAppEditAccessRole(false)
                                setAppAddUserRole(false)
                                setAppEditUserRole(false)
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
                            {tabAppRole ? 'Data Application Role' : appAddAccessRole ? 'Tambah Application Role' : appEditAccessRole ? 'Ubah Application Role' : appAddUserRole ? 'Tambah User Role' : 'Data User Role'}
                        </CardHeader>
                        <CardBody
                            style={{
                                backgroundColor: 'white'
                            }}
                        >
                            
                            <ApplicationRoleAccess
                                tabAppRole={tabAppRole}
                                setTabAppRole={setTabAppRole}
                                appAddAccessRole={appAddAccessRole}
                                setAppAddAccessRole={setAppAddAccessRole}
                                appEditAccessRole={appEditAccessRole}
                                setAppEditAccessRole={setAppEditAccessRole}
                                appMaintainRoleData={props.appMaintainRoleData}
                                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                                setLoadingSpinner={props.setLoadingSpinner}
                            />
                            <UserRoleAccess
                                tabUserRole={tabUserRole}
                                setTabUserRole={setTabUserRole}
                                appAddUserRole={appAddUserRole}
                                setAppAddUserRole={setAppAddUserRole}
                                appEditUserRole={appEditUserRole}
                                setAppEditUserRole={setAppEditUserRole}
                                appMaintainRoleData={props.appMaintainRoleData}
                                setAppMaintainRoleMsg={props.setAppMaintainRoleMsg}
                                setLoadingSpinner={props.setLoadingSpinner}
                            />
                        </CardBody>
                    </Card>
                </CardBody>
            </Card>
            {
                !(appAddAccessRole || appEditAccessRole || appAddUserRole || appEditUserRole) &&
                (
                    <Button
                        className="btn btn-danger my-3"
                        onClick={() => {
                            props.setAppMaintainRole(true)
                            props.setAppAccessRole(false)
                            setTabAppRole(false)
                            setTabUserRole(false)
                        }}
                    >
                        <span className="mdi mdi-arrow-left" />
                        &nbsp;Kembali
                    </Button>
                )
            }
        </Container>
    )
}

RoleAccess.propTypes = {
    appMaintainRoleData: PropTypes.any,
    appAccessRole: PropTypes.any,
    setAppMaintainRole: PropTypes.any,
    setAppAccessRole: PropTypes.any,
    setAppMaintainRoleMsg: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

export default RoleAccess