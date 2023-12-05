import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getDeptListOrg } from 'store/actions'
import { Table } from 'reactstrap'

const TabEditOrganisasi = (props) => {

    const dispatch = useDispatch()

    const appDeptList = useSelector((state) => {
        return state.organizationReducer.respGetDeptListOrg
    })

    useEffect(() => {
        if (props.selectedDeptData) {
            dispatch(getDeptListOrg({
                org_cd: props.selectedDeptData.org_id
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
    return (
        <React.Fragment>
            {
                props.appTabEdit && (
                    <div style={{ height: '100%' }}>
                        <Table>
                            <thead>
                                <tr>
                                    {appDepartmentColumn.map((column, index) => (
                                        <th key={index} style={column.headerStyle}>{column.text}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(appDeptList?.data?.list) && appDeptList?.data?.list.sort((a, b) => {
                                    return a.order-b.order
                                }).map((department, index) => {
                                    return (
                                        <tr key={index}>
                                            <td style={appDepartmentColumn[0].style}>{department.orgCd}</td>
                                            <td style={appDepartmentColumn[1].style}>{department.deptName}</td>
                                            <td style={appDepartmentColumn[2].style}>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-up'
                                                >
                                                </a>
                                                <a
                                                    style={{
                                                        fontSize: '20px',
                                                    }}
                                                    className='mdi mdi-chevron-down'
                                                >
                                                </a>
                                            </td>
                                        </tr>
                                    )
                                }
                                )}
                            </tbody>
                        </Table>
                    </div>
                )
            }
        </React.Fragment>
    )
}

TabEditOrganisasi.propTypes = {
    appTabEdit: PropTypes.any,
    setAppOrganizationMsg: PropTypes.any,
    selectedDeptData: PropTypes.any,
}

export default TabEditOrganisasi