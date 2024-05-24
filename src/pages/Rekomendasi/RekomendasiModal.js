<<<<<<< HEAD
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Input, Form, FormGroup, FormFeedback } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { addRecommend, editRecommend, getMemberListData, getRecommendData, getRecommendListData, getSearchData, getStickerListData, resetMessage } from 'store/actions';
import { useFormik } from 'formik';
import { ReactSession } from 'react-client-session';
import * as Yup from "yup";
import '../../assets/scss/custom.scss';

const RekomendasiModal = ({ modal, toggle, isAdd, memberId, recommendId }) => {

    const dispatch = useDispatch()

    const appStickerListData = useSelector((state) => state.rekomendasiReducer.respGetStickerList);
    const appRecommendData = useSelector((state) => state.rekomendasiReducer.respGetRecommend);
    const appMsgAdd = useSelector((state) => state.rekomendasiReducer.msgAdd);
    const appMsgEdit = useSelector((state) => state.rekomendasiReducer.msgEdit);

    const appRekomendasiValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: memberId,
            comment: '',
            stickerId: {},
        },
        validationSchema: Yup.object().shape({
            stickerId: Yup.object().test(
                'atLeastOneSticker',
                'Wajib dipilih minimal satu',
                (value) => {
                    return Object.values(value).some((selected) => selected);
                }
            ),
        }),


        onSubmit: (values) => {
            const selectedStickers = Object.entries(values.stickerId)
                .filter(([key, value]) => value)
                .map(([key]) => parseInt(key));

            if (isAdd) {
                dispatch(addRecommend({
                    memberId: values.memberId,
                    comment: values.comment,
                    stickerId: selectedStickers,
                }));
            } else {
                dispatch(editRecommend({
                    recommendId: recommendId,
                    comment: values.comment,
                    stickerId: selectedStickers,
                }));
            }
            appRekomendasiValidInput.resetForm();
            toggle();
        }
    });

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getStickerListData())
        if (!isAdd) {
            dispatch(getRecommendData({ 'recommendId': recommendId }))
        }
    }, [isAdd, modal])

    useEffect(() => {
        if (appRecommendData.status === '1') {
            appRekomendasiValidInput.setFieldValue('comment', appRecommendData?.data?.result?.comment)
            appRecommendData?.data?.result?.stickerList.map((item, index) => {
                if (item.selected) {
                    appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                } else {
                    appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
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
                        "orgCd": selectedDeptData
                    }
                }));
            }
        }
    }, [appMsgAdd, appMsgEdit])

    return (
        <Modal size='lg' isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader className='px-4' toggle={toggle}>Berikan Bintang</ModalHeader>
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
                                <span>
                                    <b>
                                        Penghargaan
                                        <span className='text-danger'>*</span>
                                        &nbsp;
                                    </b>
                                    <span className='opacity-50 unselectable'>
                                        (Pilih satu atau lebih)
                                    </span>
                                </span>
                                <div>
                                    {
                                        appStickerListData?.data?.list.map((item, index) => {
                                            return (

                                                <React.Fragment key={index}>
                                                    <Input
                                                        type='checkbox'
                                                        name={`stickerId[${item.stickerId}]`}
                                                        id={item.stickerId}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
                                                            }
                                                        }}
                                                        checked={appRekomendasiValidInput.values.stickerId[item.stickerId] || false}
                                                        invalid={
                                                            appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? true : false
                                                        }
                                                    />
                                                    <label htmlFor={item.stickerId} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.stickerName}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.stickerUrl} alt={item.stickerName} />
                                                    </label>

                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    {appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? (
                                        <FormFeedback type="invalid">{appRekomendasiValidInput.errors.stickerId}</FormFeedback>
                                    ) : null}
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
                                                        name={`stickerId[${item.stickerId}]`}
                                                        id={item.stickerId}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
                                                            }
                                                        }}
                                                        invalid={
                                                            appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? true : false
                                                        }
                                                        checked={appRekomendasiValidInput.values.stickerId[item.stickerId] || false}
                                                    />
                                                    <label htmlFor={item.stickerId} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.stickerName}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.stickerUrl} alt={item.stickerName} />
                                                    </label>
                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    {appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? (
                                        <FormFeedback type="invalid">{appRekomendasiValidInput.errors.stickerId}</FormFeedback>
                                    ) : null}
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
    memberId: PropTypes.any,
    recommendId: PropTypes.any,
};

export default RekomendasiModal;
=======
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Input, Form, FormGroup, FormFeedback } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { addRecommend, editRecommend, getMemberListData, getRecommendData, getRecommendListData, getSearchData, getStickerListData, resetMessage } from 'store/actions';
import { useFormik } from 'formik';
import { ReactSession } from 'react-client-session';
import * as Yup from "yup";
import '../../assets/scss/custom.scss';

const RekomendasiModal = ({ modal, toggle, isAdd, memberId, recommendId }) => {

    const dispatch = useDispatch()

    const appStickerListData = useSelector((state) => state.rekomendasiReducer.respGetStickerList);
    const appRecommendData = useSelector((state) => state.rekomendasiReducer.respGetRecommend);
    const appMsgAdd = useSelector((state) => state.rekomendasiReducer.msgAdd);
    const appMsgEdit = useSelector((state) => state.rekomendasiReducer.msgEdit);

    const appRekomendasiValidInput = useFormik({
        enableReinitialize: true,

        initialValues: {
            memberId: memberId,
            comment: '',
            stickerId: {},
        },
        validationSchema: Yup.object().shape({
            stickerId: Yup.object().test(
                'atLeastOneSticker',
                'Wajib dipilih minimal satu',
                (value) => {
                    return Object.values(value).some((selected) => selected);
                }
            ),
        }),


        onSubmit: (values) => {
            const selectedStickers = Object.entries(values.stickerId)
                .filter(([key, value]) => value)
                .map(([key]) => parseInt(key));

            if (isAdd) {
                dispatch(addRecommend({
                    memberId: values.memberId,
                    comment: values.comment,
                    stickerId: selectedStickers,
                }));
            } else {
                dispatch(editRecommend({
                    recommendId: recommendId,
                    comment: values.comment,
                    stickerId: selectedStickers,
                }));
            }
            appRekomendasiValidInput.resetForm();
            toggle();
        }
    });

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        dispatch(getStickerListData())
        if (!isAdd) {
            dispatch(getRecommendData({ 'recommendId': recommendId }))
        }
    }, [isAdd, modal])

    useEffect(() => {
        if (appRecommendData.status === '1') {
            appRekomendasiValidInput.setFieldValue('comment', appRecommendData?.data?.result?.comment)
            appRecommendData?.data?.result?.stickerList.map((item, index) => {
                if (item.selected) {
                    appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                } else {
                    appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
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
                        "orgCd": selectedDeptData
                    }
                }));
            }
        }
    }, [appMsgAdd, appMsgEdit])

    return (
        <Modal size='lg' isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader className='px-4' toggle={toggle}>Berikan Bintang</ModalHeader>
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
                                <span>
                                    <b>
                                        Penghargaan
                                        <span className='text-danger'>*</span>
                                        &nbsp;
                                    </b>
                                    <span className='opacity-50 unselectable'>
                                        (Pilih satu atau lebih)
                                    </span>
                                </span>
                                <div>
                                    {
                                        appStickerListData?.data?.list.map((item, index) => {
                                            return (

                                                <React.Fragment key={index}>
                                                    <Input
                                                        type='checkbox'
                                                        name={`stickerId[${item.stickerId}]`}
                                                        id={item.stickerId}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
                                                            }
                                                        }}
                                                        checked={appRekomendasiValidInput.values.stickerId[item.stickerId] || false}
                                                        invalid={
                                                            appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? true : false
                                                        }
                                                    />
                                                    <label htmlFor={item.stickerId} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.stickerName}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.stickerUrl} alt={item.stickerName} />
                                                    </label>

                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    {appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? (
                                        <FormFeedback type="invalid">{appRekomendasiValidInput.errors.stickerId}</FormFeedback>
                                    ) : null}
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
                                                        name={`stickerId[${item.stickerId}]`}
                                                        id={item.stickerId}
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, true);
                                                            } else {
                                                                appRekomendasiValidInput.setFieldValue(`stickerId[${item.stickerId}]`, false);
                                                            }
                                                        }}
                                                        invalid={
                                                            appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? true : false
                                                        }
                                                        checked={appRekomendasiValidInput.values.stickerId[item.stickerId] || false}
                                                    />
                                                    <label htmlFor={item.stickerId} style={{ marginRight: "12px" }}>
                                                        &nbsp;{item.stickerName}
                                                        <img width={'18px'} style={{ position: "relative", top: "-2px", marginLeft: "2px" }} src={item.stickerUrl} alt={item.stickerName} />
                                                    </label>
                                                </React.Fragment>

                                            )
                                        })
                                    }
                                    {appRekomendasiValidInput.touched.stickerId && appRekomendasiValidInput.errors.stickerId ? (
                                        <FormFeedback type="invalid">{appRekomendasiValidInput.errors.stickerId}</FormFeedback>
                                    ) : null}
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
    memberId: PropTypes.any,
    recommendId: PropTypes.any,
};

export default RekomendasiModal;
>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
