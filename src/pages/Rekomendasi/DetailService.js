import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editServiceDept, editServiceMember, getDeptData, getDetailDeptData, getMemberDetailData, getMemberListData, getServiceDeptData, getServiceMemberData, resetMessageMemberDtl } from "store/actions";
import PropTypes from 'prop-types';
import '../../assets/scss/custom.scss';
import '../../config';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Input, Row } from "reactstrap";
import MsgModal from "components/Common/MsgModal";
import Select, { components } from "react-select";
import { ReactSession } from 'react-client-session';

const DetailService = (props) => {
    const dispatch = useDispatch();

    // let selectedMemberData = ReactSession.get('selectedMemberData')
    const [serviceId, setServiceId] = useState()

    // const [memberName, setMemberName] = useState()
    // const [memberDept, setMemberDept] = useState()
    // const [memberPosistion, setMemberPosition] = useState()
    // const [memberPhoneNum, setMemberPhoneNum] = useState()

    const [selectedService, setSelectedService] = useState()

    const [selectedMulti, setselectedMulti] = useState([]);
    const [addedRoles, setAddedRoles] = useState([]);
    const [removedRoles, setRemovedRoles] = useState([]);

    const [serviceDetail, setServiceDetail] = useState([]);
    const [optionRole, setOptionRole] = useState([]);

    // const appMemberDetail = useSelector((state) => state.ssoReducer.respGetMemberDetail);
    // const appDetailDeptData = useSelector((state) => state.ssoReducer.respGetDetailDept);

    // const appMemberServiceData = useSelector((state) => state.ssoReducer.respGetServiceMember);
    // const appDeptServiceData = useSelector((state) => state.ssoReducer.respGetServiceDept);

    // const msgEdit = useSelector((state) => state.ssoReducer.msgEdit);

    // useEffect(() => {
    //     if (appMemberDetail?.data?.list) {
    //         setServiceDetail(appMemberDetail?.data?.list?.serviceList)
    //     } else if (appDetailDeptData?.data?.list) {
    //         // setMemberName('')
    //         // setMemberDept('')
    //         // setMemberPosition('')
    //         // setMemberPhoneNum('')
    //         setServiceDetail(appDetailDeptData?.data?.list?.serviceList)
    //     }
    // }, [appMemberDetail, appDetailDeptData, msgEdit])

    // useEffect(() => {
    //     let originalArray = selectedMemberData ? appMemberServiceData?.data?.list : appDeptServiceData?.data?.list ? appDeptServiceData?.data?.list : []

    //     const includedArray = originalArray
    //         ?.filter(obj => obj.include === true)
    //         ?.map(obj => ({
    //             "value": obj.role_id,
    //             "label": obj.name,
    //             "include": obj.include,
    //         }));

    //     const excludedArray = originalArray

    //         ?.map(obj => ({
    //             "value": obj.role_id,
    //             "label": obj.name,
    //             "include": obj.include,
    //         }));

    //     setselectedMulti(includedArray)
    //     setOptionRole(excludedArray)

    // }, [appMemberServiceData, appDeptServiceData])

    // function handleMulti(s) {

    //     let originalArray = appMemberServiceData?.data?.list
    //         ? appMemberServiceData?.data?.list
    //         : appDeptServiceData?.data?.list
    //             ? appDeptServiceData?.data?.list
    //             : [];

    //     const currentSelection = (selectedMulti || []).map((item) => item.value);

    //     const addedValues = s.filter((item) => !currentSelection.includes(item.value));
    //     const deletedValues = currentSelection.filter((item) => !s.some((selectedItem) => selectedItem.value === item));

    //     addedValues.forEach((addedItem) => {
    //         setAddedRoles(current => [...current, addedItem.value]);
    //         if (removedRoles.length > 0) {
    //             setRemovedRoles(current => {
    //                 let temp = current.filter((item) => {
    //                     if (item === addedItem.value) {
    //                         return ''
    //                     } else {
    //                         return item
    //                     }
    //                 })
    //                 return temp
    //             });
    //         }
    //     })

    //     deletedValues.forEach((deletedItem) => {
    //         setRemovedRoles(current => {
    //             let temp = current?.filter((item) => {
    //                 return item !== addedValues.value; // Use !== to filter out the item you want to remove
    //             });
    //             return temp ? [...temp, deletedItem] : [deletedItem]; // Ensure temp is an array
    //         });
    //     });

    //     // const newRemovedRoles = selectedMulti.filter((item) => !s.some((newItem) => newItem.value === item.value));
    //     // const newAddedRoles = selectedMulti.filter((item) => s.some((newItem) => newItem.value === item.value));

    //     // const removedRolesArray = Array.isArray(removedRoles) ? removedRoles : [];

    //     // const updatedRemovedRoles = [...removedRolesArray, ...newRemovedRoles];

    //     // setRemovedRoles(updatedRemovedRoles);

    //     setselectedMulti(s);
    // }

    // console.log('addedRoles', addedRoles)
    // console.log('removedRoles', removedRoles)

    // const DropdownIndicator = (props) => {
    //     return (
    //         <components.DropdownIndicator {...props}>
    //             <i className="mdi mdi-plus-thick" />
    //         </components.DropdownIndicator>
    //     );
    // };

    // const colourStyles = {
    //     control: (baseStyles, state) => ({
    //         ...baseStyles,
    //         border: 0,
    //         boxShadow: 'none',

    //     }),

    //     option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    //         const color = '#8C8C8C';
    //         return {
    //             ...styles,
    //             backgroundColor: isDisabled
    //                 ? undefined
    //                 : isSelected
    //                     ? '#8C8C8C'
    //                     : isFocused
    //                         ? '#e6e6e6'
    //                         : undefined,
    //             color: isDisabled
    //                 ? '#ccc'
    //                 : isSelected
    //                     ? 'white'
    //                         ? 'white'
    //                         : 'black'
    //                     : 'black',
    //             cursor: isDisabled ? 'not-allowed' : 'default',
    //             ':active': {
    //                 ...styles[':active'],
    //                 backgroundColor: !isDisabled
    //                     ? isSelected
    //                         ? '#8C8C8C'
    //                         : color
    //                     : undefined,
    //             },
    //         };
    //     },

    //     multiValue: (styles, { data }) => {
    //         const color = '#8C8C8C';
    //         return {
    //             ...styles,
    //             backgroundColor: '#8C8C8C',

    //         };
    //     },

    //     multiValueLabel: (styles, { data }) => ({
    //         ...styles,
    //         color: 'white',
    //         fontSize: '13px',
    //         paddingLeft: '12px',
    //         paddingRight: '12px',
    //         paddingTop: '7.5px',
    //         paddingBottom: '7.5px',
    //         borderRadius: '4px',
    //     }),

    //     multiValueRemove: (styles, { data }) => ({
    //         ...styles,
    //         color: 'white',
    //         ':hover': {
    //             backgroundColor: '#8C8C8C',
    //             color: 'white',
    //         },
    //     }),
    // };

    // const [modal, setModal] = useState(false)

    // const toggleModal = (e) => {
    //     if (typeof e === 'string') {
    //         setServiceId(e)
    //         setSelectedService(e)
    //         if (appMemberDetail?.data?.list) {
    //             dispatch(getServiceMemberData({ service_id: e, member_id: appMemberDetail?.data?.list?.member_id }))
    //         } else {
    //             dispatch(getServiceDeptData({ service_id: e, dept_id: appDetailDeptData?.data?.list?.dept_id }))
    //         }

    //     }
    //     if (!modal) {
    //         setselectedMulti([])
    //         setOptionRole([])
    //     }
    //     setModal(!modal)
    // }

    // // ...
    // const toggleApply = (e) => {
    //     if (modal) {
    //         setselectedMulti([]);
    //         setOptionRole([]);

    //         let originalArray = appMemberServiceData?.data?.list
    //             ? appMemberServiceData?.data?.list
    //             : appDeptServiceData?.data?.list
    //                 ? appDeptServiceData?.data?.list
    //                 : [];

    //         const convertedSelectedMultiAll = selectedMulti.map((item) => ({
    //             role_id: item.value,
    //             name: item.label,
    //             include: item.include,
    //         }));

    //         const convertedSelectedIncludeFalse = selectedMulti
    //             .filter((item) => item.include === false)
    //             .map((item) => ({
    //                 role_id: item.value,
    //                 name: item.label,
    //                 include: item.include,
    //             }));


    //         // Handle removed roles
    //         // debugger
    //         const addRoles = convertedSelectedIncludeFalse.map((item) => addedRoles.includes(item.role_id) ? item.role_id : null);

    //         const removedRolesArray = Array.isArray(removedRoles) > 0 ? removedRoles.map((item) => item) : [];
    //         const filteredRoleIds = originalArray
    //             .filter((item) => removedRolesArray.includes(item.role_id) && item.include === true)
    //             .map((item) => item.role_id);

    //         const uniqueRemovedRolesArray = [...new Set(filteredRoleIds)];


    //         if (selectedMemberData) {
    //             dispatch(
    //                 getServiceMemberData({
    //                     service_id: serviceId,
    //                     member_id: selectedMemberData?.member_id,
    //                 })
    //             );
    //             if (addRoles.length > 0 || removedRoles.length > 0) {
    //                 dispatch(
    //                     editServiceMember({
    //                         addRole: addRoles || null,
    //                         removeRole: uniqueRemovedRolesArray || null,
    //                         member_id: appMemberDetail?.data?.list?.member_id,
    //                     })
    //                 );
    //             }
    //         } else {
    //             dispatch(
    //                 getServiceDeptData({
    //                     service_id: serviceId,
    //                     dept_id: appDetailDeptData?.data?.list?.dept_id,
    //                 })
    //             );
    //             dispatch(
    //                 editServiceDept({
    //                     addRole: addRoles || null,
    //                     removeRole: uniqueRemovedRolesArray || null,
    //                     dept_id: appDetailDeptData?.data?.list?.dept_id,
    //                 })
    //             )

    //         }
    //     }
    //     setselectedMulti([])
    //     setRemovedRoles([])
    //     setAddedRoles([])
    //     setModal(!modal);
    // };
    // // ...

    // // useEffect(() => {
    // //     debugger
    // //     if (selectedMemberData) {
    // //         dispatch(getMemberDetailData({ member_id: selectedMemberData?.member_id }))
    // //     }
    // // }, [selectedMemberData])

    // useEffect(() => {
    //     if (msgEdit.status === '1') {
    //         dispatch(getDetailDeptData({ dept_id: props.selectedDeptData }));
    //         dispatch(getMemberDetailData({ member_id: selectedMemberData?.member_id }))
    //     }
    // }, [msgEdit])

    // // useEffect(() => {
    // //     debugger
    // //     if (appMemberDetail?.data?.list)  {
    // //         dispatch(resetMessageMemberDtl())
    // //         setMemberName(appMemberDetail?.data?.list?.member_name)
    // //         setMemberDept(appMemberDetail?.data?.list?.dept_name)
    // //         setMemberPosition(appMemberDetail?.data?.list?.position)
    // //         setMemberPhoneNum(appMemberDetail?.data?.list?.hp)
    // //     }
    // // }, [appMemberDetail])

    // useEffect(() => {
    //     props.setSelectedMemberData(null)
    //     dispatch(getMemberDetailData({ member_id: '' }))
    // }, [props.selectedDeptData])

    return (
        <>
            <div
                className="py-2 px-3"
                style={{ backgroundColor: "#8C8C8C", fontWeight: "bold", color: "white" }}
            >
                Detail & Edit
            </div>
            <div className="p-4" style={{ width: "100" }}>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2%" }}>
                        <label style={{ width: "24em" }}>
                            Name
                        </label>
                        <Input
                            type="text"
                            disabled
                            className="form-control"
                            style={{ maxWidth: "80%" }}
                            // value={appMemberDetail?.data?.list?.member_name ? appMemberDetail?.data?.list?.member_name : ''}
                        />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2%" }}>
                        <label style={{ width: "24em" }}>
                            Departement
                        </label>
                        <Input
                            type="text"
                            disabled
                            className="form-control"
                            style={{ maxWidth: "80%" }}
                            // value={appDetailDeptData.data?.list?.dept_name ? appDetailDeptData.data?.list?.dept_name : appMemberDetail?.data?.list?.dept_name}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2%" }}>
                        <label style={{ width: "24em" }}>
                            Position
                        </label>
                        <Input
                            type="text"
                            disabled
                            className="form-control"
                            style={{ maxWidth: "80%" }}
                            // value={appMemberDetail?.data?.list?.position ? appMemberDetail?.data?.list?.position : ''}
                        />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <label style={{ width: "24em" }}>
                            Phone Number (HP)
                        </label>
                        <Input
                            type="text"
                            disabled
                            className="form-control"
                            style={{ maxWidth: "80%" }}
                            // value={appMemberDetail?.data?.list?.hp ? appMemberDetail?.data?.list?.hp : ''}
                        />
                    </Col>
                </Row>
            </div>

            <div className="p-4" style={{ width: "100%" }}>
                <Row style={{ fontWeight: "bold" }}>
                    <Col style={{ marginBottom: "2%" }}>
                        Services
                    </Col>
                </Row>
                <Card style={{ backgroundColor: "#F6F6F6", border: '1px solid rgba(73, 80, 87, 0.2)' }}>
                    <CardHeader style={{ backgroundColor: "#8C8C8C" }}>
                        Choose Service
                    </CardHeader>
                    <CardBody style={{ height: "25vh", overflowX: "auto", overflowY: "auto", paddingTop: '0.5rem', paddingBottom: '0.5rem' }}>
                        <div className="p-2" style={{ width: "100%", fontWeight: "bold", borderBottom: '1px solid rgba(73, 80, 87, 0.2)', position: "relative", display: "flex", alignItems: "center", marginTop: "2px !important" }}>
                            &nbsp;
                            <Col xs='3' style={{ textAlign: "left" }}>Service</Col>
                            <Col xs='7' style={{ textAlign: "left" }}>Roles</Col>
                            <Col xs='1' style={{ textAlign: "center" }}>Edit</Col>
                        </div>
                        {
                            serviceDetail.map((item, index) => {
                                return (
                                    <React.Fragment key={index}>
                                        <div className="p-2" style={{ width: "100%", position: "relative", borderTop: '1px solid rgba(73, 80, 87, 0.2)', display: "flex", alignItems: "center" }}>
                                            &nbsp;
                                            <Col xs='3'>{item.service}</Col>
                                            <Col xs='7'>{item.roles}</Col>
                                            <Col xs='1' style={{ textAlign: "center", fontSize: "16px" }}><a className="mdi mdi-pencil" onClick={() => toggleModal(item.service)}></a></Col>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </CardBody>
                </Card>
                {/* <div style={{width:"100%", display: "flex", justifyContent: 'end' }}>
                    <Button 
                    className="btn btn-primary rounded-0 px-4" 
                    style={{ border: "1px solid #BBB"}}
                    onClick={() => {
                        
                    }}
                    >
                        <b>Apply</b>
                    </Button>
                </div> */}
            </div>

            <MsgModal
                modal={modal}
                toggle={toggleModal}
                toggleApply={toggleApply}
                message={
                    <React.Fragment>
                        <Col style={{ display: "flex", justifyContent: "", alignItems: "center" }}>
                            <label style={{ width: "14em" }}>
                                Service
                            </label>
                            <span
                                style={{ maxWidth: "100%" }}
                            >
                                {selectedService}
                            </span>
                        </Col>
                        <Col style={{ marginTop: '3%' }}>
                            <label style={{ width: "14em" }}>
                                Role
                            </label>
                            <Select
                                //id="user"
                                value={selectedMulti}
                                isMulti={true}
                                onChange={(e) => {
                                    handleMulti(e);
                                }}
                                options={optionRole}
                                className="select2-selection"
                                // styles={colourStyles}
                                // components={{ DropdownIndicator }}
                                placeholder={"Select or type"}

                            />
                        </Col>
                    </React.Fragment>
                }
            />
        </>
    );
};

DetailService.propTypes = {
    appDeptData: PropTypes.any,
    selectedDeptData: PropTypes.any,
    setSelectedDeptData: PropTypes.any,
    setSelectedMemberData: PropTypes.any,
    selectedMemberData: PropTypes.any,
    appDetailDeptDataState: PropTypes.any,
};

export default DetailService;
