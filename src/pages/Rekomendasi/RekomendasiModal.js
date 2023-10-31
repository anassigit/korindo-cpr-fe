import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Input, Form, FormGroup } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { addRecommend, editRecommend, getMemberListData, getRecommendData, getRecommendListData, getSearchData, getStickerListData, resetMessage } from 'store/actions';
import { useFormik } from 'formik';
import { ReactSession } from 'react-client-session';
import * as Yup from "yup";

const RekomendasiModal = ({ modal, toggle, isAdd, employee_id, recommend_id }) => {

    const dispatch = useDispatch()

    const appStickerListData = useSelector((state) => state.rekomendasiReducer.respGetStickerList);
    const appRecommendData = useSelector((state) => state.rekomendasiReducer.respGetRecommend);
    const appMsgAdd = useSelector((state) => state.rekomendasiReducer.msgAdd);
    const appMsgEdit = useSelector((state) => state.rekomendasiReducer.msgEdit);

    const appRekomendasiValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            employ_id: employee_id,
            comment: '',
            sticker: {},
        },
        validationSchema: Yup.object().shape({
            // comment: Yup.string().required("Wajib diisi"),
        }),


        onSubmit: (values) => {
            debugger
            const selectedStickers = Object.entries(values.sticker)
                .filter(([key, value]) => value)
                .map(([key]) => parseInt(key));

            if (isAdd) {
                dispatch(addRecommend({
                    employ_id: values.employ_id,
                    comment: values.comment,
                    sticker: selectedStickers,
                }));
            } else {
                dispatch(editRecommend({
                    recommend_id: recommend_id,
                    comment: values.comment,
                    sticker: selectedStickers,
                }));
            }
            appRekomendasiValidInput.resetForm()
            toggle()
        }
    });

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getStickerListData())
        if (!isAdd) {
            dispatch(getRecommendData({ 'recommend_id': recommend_id }))
        }
    }, [isAdd, modal])

    useEffect(() => {
        if (appRecommendData.status === '1') {
            appRekomendasiValidInput.setFieldValue('comment', appRecommendData?.data?.result?.comment)
            appRecommendData?.data?.result?.stickerList.map((item, index) => {
                if (item.selected) {
                    appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, true);
                } else {
                    appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, false);
                }
            })
        }
    }, [appRecommendData])

    useEffect(() => {
        if (appMsgAdd.status === '1' || appMsgEdit.status === '1') {
            let offset = ReactSession.get('offset')
            let limit = ReactSession.get('limit')
            let selectedDeptData = ReactSession.get('selectedDeptData')
            let searchVal = ReactSession.get('searchVal')
            dispatch(getRecommendListData())
            if (searchVal) {
                dispatch(getSearchData({
                    "offset": offset,
                    "limit": limit,
                    "search": {
                        "search": searchVal
                    }
                }))
            } else {
                dispatch(getMemberListData({
                    "offset": offset,
                    "limit": limit,
                    "search": {
                        "org_id": selectedDeptData
                    }
                }));
            }
        }
    }, [appMsgAdd, appMsgEdit])

    return (
        <Modal size='lg' isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader className='px-4' toggle={toggle}>Berikan Rekomendasi</ModalHeader>
            <ModalBody className='px-4'>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault()
                        appRekomendasiValidInput.handleSubmit()
                    }}
                >
                    <FormGroup>

                        {isAdd === true ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <b>
                                    Penghargaan
                                </b>
                                <div>
                                    {
                                        appStickerListData?.data?.list.map((item, index) => {
                                            return (

                                                <React.Fragment key={index}>
                                                    <Input
                                                        type='checkbox'
                                                        name={`sticker[${item.id}]`}
                                                        id={item.id}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, false);
                                                            }
                                                        }}
                                                        checked={appRekomendasiValidInput.values.sticker[item.id] || false}
                                                    />
                                                    <label htmlFor={item.id} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.name}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.url} alt={item.name} />
                                                    </label>
                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    <div style={{ fontWeight: 'bold' }}>
                                        Keterangan
                                    </div>
                                    <Input
                                        type='textarea'
                                        name='comment'
                                        value={appRekomendasiValidInput.values.comment || ""}
                                        onChange={appRekomendasiValidInput.handleChange}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <b>
                                    Penghargaan
                                </b>
                                <div>
                                    {
                                        appStickerListData?.data?.list.map((item, index) => {
                                            return (

                                                <React.Fragment key={index}>
                                                    <Input
                                                        type='checkbox'
                                                        name={`sticker[${item.id}]`}
                                                        id={item.id}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`sticker[${item.id}]`, false);
                                                            }
                                                        }}
                                                        checked={appRekomendasiValidInput.values.sticker[item.id] || false}
                                                    />
                                                    <label htmlFor={item.id} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.name}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.url} alt={item.name} />
                                                    </label>
                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    <div style={{ fontWeight: 'bold' }}>
                                        Keterangan
                                    </div>
                                    <Input
                                        type='textarea'
                                        name='comment'
                                        value={appRekomendasiValidInput.values.comment || ""}
                                        onChange={appRekomendasiValidInput.handleChange}
                                    />
                                </div>
                            </div>
                        )}

                        <div style={{ display: "flex", justifyContent: 'end', paddingTop: "24px" }}>
                            <Button
                                type='submit'
                                className="btn btn-primary"
                                style={{ border: 'none', color: "white" }}
                            >
                                Apply
                            </Button>
                            <a className='p-2 unselectable' onClick={toggle}>
                                Close
                            </a>
                        </div>
                    </FormGroup>
                </Form>
            </ModalBody>

        </Modal >
    );
};

RekomendasiModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    isAdd: PropTypes.any,
    employee_id: PropTypes.any,
    recommend_id: PropTypes.any,
};

export default RekomendasiModal;
