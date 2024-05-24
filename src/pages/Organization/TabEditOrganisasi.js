<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editMappingDept, getDeptListOrg, getOrganizationListData } from 'store/actions'
import { Button, Table } from 'reactstrap'

const TabEditOrganisasi = (props) => {

    const dispatch = useDispatch()
    const [deptListTemp, setDeptListTemp] = useState([])

    const appDeptList = useSelector((state) => {
        return state.organizationReducer.respGetDeptListOrg
    })

    const appMsgEdit = useSelector((state) => {
        return state.organizationReducer.msgEdit
    })

    useEffect(() => {
        if (props.selectedDeptData) {
            dispatch(getDeptListOrg({
                orgCd: props.selectedDeptData.orgCd
            }))
        }
    }, [props.selectedDeptData])

    const appDepartmentColumn = [
        {
            dataField: "orgCd",
            text: "Kode Department",
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "orgCd",
            text: "Nama Department",
            style: {
                textAlign: 'center',
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "action",
            text: "Actions",
            style: {
                paddingTop: '8px !important',
                textAlign: 'center'
            },
            headerStyle: { textAlign: 'center' },
        },
    ]

    useEffect(() => {
        setDeptListTemp(appDeptList?.data?.list)
    }, [appDeptList])

    useEffect(() => {
        if (appMsgEdit) {
            props.setAppOrganizationMsg(appMsgEdit)
            dispatch(getOrganizationListData())
            props.setLoadingSpinner(true)
        }
    }, [appMsgEdit])

    const moveRowUp = (index) => {
        if (index > 0) {
            const updatedList = [...deptListTemp];
            [updatedList[index - 1].order, updatedList[index].order] = [updatedList[index].order, updatedList[index - 1].order];
            setDeptListTemp(updatedList);
        }
    };

    const moveRowDown = (index) => {
        if (index < deptListTemp.length - 1) {
            const updatedList = [...deptListTemp];
            [updatedList[index].order, updatedList[index + 1].order] = [updatedList[index + 1].order, updatedList[index].order];
            setDeptListTemp(updatedList);
        }
    };

    return (
        <React.Fragment>
            {
                props.appTabEdit && (
                    <div style={{ height: '100%', margin: '0 1px 0 1px' }}>
                        <Table>
                            <thead>
                                <tr>
                                    {appDepartmentColumn.map((column, index) => (
                                        <th key={index} style={column.headerStyle}>{column.text}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(deptListTemp) && deptListTemp.sort((a, b) => {
                                    return a.order - b.order
                                }).map((department, index) => {
                                    return (
                                        <tr className='member-row' key={index}>
                                            <td style={appDepartmentColumn[0].style}>{department.orgCd}</td>
                                            <td style={appDepartmentColumn[1].style}>{department.deptName}</td>
                                            <td style={appDepartmentColumn[2].style}>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-up'
                                                    onClick={() => moveRowUp(index)}
                                                ></a>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-down'
                                                    onClick={() => moveRowDown(index)}
                                                ></a>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                        <div className='m-4'>
                            <Button
                                disabled={props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? false : true}
                                style={{
                                    backgroundColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    borderColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    marginRight: '.5rem'
                                }}
                                onClick={() => {

                                    let temp = deptListTemp.map((item) => item.orgCd)

                                    props.setLoadingSpinner(true)
                                    dispatch(editMappingDept({
                                        orgParentCd: props.selectedDeptData.orgCd,
                                        orgCd: temp,
                                    }))
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                disabled={props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? false : true}
                                className='btn-danger'
                                style={{
                                    backgroundColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    borderColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    marginRight: '.5rem'
                                }}
                                onClick={() => {
                                    dispatch(getDeptListOrg({
                                        orgCd: props.selectedDeptData?.orgCd
                                    }))
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                )
            }
        </React.Fragment >
    )
}

TabEditOrganisasi.propTypes = {
    appTabEdit: PropTypes.any,
    setAppOrganizationMsg: PropTypes.any,
    selectedDeptData: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

=======
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editMappingDept, getDeptListOrg, getOrganizationListData } from 'store/actions'
import { Button, Table } from 'reactstrap'

const TabEditOrganisasi = (props) => {

    const dispatch = useDispatch()
    const [deptListTemp, setDeptListTemp] = useState([])

    const appDeptList = useSelector((state) => {
        return state.organizationReducer.respGetDeptListOrg
    })

    const appMsgEdit = useSelector((state) => {
        return state.organizationReducer.msgEdit
    })

    useEffect(() => {
        if (props.selectedDeptData) {
            dispatch(getDeptListOrg({
                orgCd: props.selectedDeptData.orgCd
            }))
        }
    }, [props.selectedDeptData])

    const appDepartmentColumn = [
        {
            dataField: "orgCd",
            text: "Kode Department",
            style: { textAlign: 'center' },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "orgCd",
            text: "Nama Department",
            style: {
                textAlign: 'center',
            },
            headerStyle: { textAlign: 'center' },
        },
        {
            dataField: "action",
            text: "Actions",
            style: {
                paddingTop: '8px !important',
                textAlign: 'center'
            },
            headerStyle: { textAlign: 'center' },
        },
    ]

    useEffect(() => {
        setDeptListTemp(appDeptList?.data?.list)
    }, [appDeptList])

    useEffect(() => {
        if (appMsgEdit) {
            props.setAppOrganizationMsg(appMsgEdit)
            dispatch(getOrganizationListData())
            props.setLoadingSpinner(true)
        }
    }, [appMsgEdit])

    const moveRowUp = (index) => {
        if (index > 0) {
            const updatedList = [...deptListTemp];
            [updatedList[index - 1].order, updatedList[index].order] = [updatedList[index].order, updatedList[index - 1].order];
            setDeptListTemp(updatedList);
        }
    };

    const moveRowDown = (index) => {
        if (index < deptListTemp.length - 1) {
            const updatedList = [...deptListTemp];
            [updatedList[index].order, updatedList[index + 1].order] = [updatedList[index + 1].order, updatedList[index].order];
            setDeptListTemp(updatedList);
        }
    };

    return (
        <React.Fragment>
            {
                props.appTabEdit && (
                    <div style={{ height: '100%', margin: '0 1px 0 1px' }}>
                        <Table>
                            <thead>
                                <tr>
                                    {appDepartmentColumn.map((column, index) => (
                                        <th key={index} style={column.headerStyle}>{column.text}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(deptListTemp) && deptListTemp.sort((a, b) => {
                                    return a.order - b.order
                                }).map((department, index) => {
                                    return (
                                        <tr className='member-row' key={index}>
                                            <td style={appDepartmentColumn[0].style}>{department.orgCd}</td>
                                            <td style={appDepartmentColumn[1].style}>{department.deptName}</td>
                                            <td style={appDepartmentColumn[2].style}>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-up'
                                                    onClick={() => moveRowUp(index)}
                                                ></a>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-down'
                                                    onClick={() => moveRowDown(index)}
                                                ></a>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                        <div className='m-4'>
                            <Button
                                disabled={props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? false : true}
                                style={{
                                    backgroundColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    borderColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    marginRight: '.5rem'
                                }}
                                onClick={() => {

                                    let temp = deptListTemp.map((item) => item.orgCd)

                                    props.setLoadingSpinner(true)
                                    dispatch(editMappingDept({
                                        orgParentCd: props.selectedDeptData.orgCd,
                                        orgCd: temp,
                                    }))
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                disabled={props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? false : true}
                                className='btn-danger'
                                style={{
                                    backgroundColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    borderColor: props.selectedDeptData && Object.keys(props.selectedDeptData).length !== 0 ? '' : '#A9A9A9',
                                    marginRight: '.5rem'
                                }}
                                onClick={() => {
                                    dispatch(getDeptListOrg({
                                        orgCd: props.selectedDeptData?.orgCd
                                    }))
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                )
            }
        </React.Fragment >
    )
}

TabEditOrganisasi.propTypes = {
    appTabEdit: PropTypes.any,
    setAppOrganizationMsg: PropTypes.any,
    selectedDeptData: PropTypes.any,
    setLoadingSpinner: PropTypes.any,
}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default TabEditOrganisasi