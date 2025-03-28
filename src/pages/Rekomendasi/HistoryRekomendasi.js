import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Row, Spinner, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom.scss'; // Import your custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecommend, getInfoData, getMemberListData, getRecommendListData, getSearchData, resetMessage, submitRecommend } from 'store/actions';
import { ReactSession } from 'react-client-session';
import MsgModal from 'components/Common/MsgModal';
import RekomendasiModal from './RekomendasiModal';
import star from "../../assets/images/star.png"
import PropTypes from "prop-types"

const HistoryRekomendasi = (props) => {

    let offset = ReactSession.get('offset')
    let limit = ReactSession.get('limit')
    let selectedDeptData = ReactSession.get('selectedDeptData')

    const dispatch = useDispatch()

    const maxStickersToShow = 2; // Maximum number of stickers to show

    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [modalRekomendasi, setModalRekomendasi] = useState(false)
    const [submitEnable, setSubmitEnable] = useState(false)

    const [recommendId, setRecommendId] = useState()
    const [memberId, setMemberId] = useState()

    const appRecommendList = useSelector((state) => {
        return state.rekomendasiReducer.respGetRecommendList
    })

    const appMsgDelete = useSelector((state) => {
        return state.rekomendasiReducer.msgDelete
    })

    const appMsgAdd = useSelector((state) => {
        return state.rekomendasiReducer.msgAdd
    })

    useEffect(() => {
        dispatch(getRecommendListData())
    }, [])

    useEffect(() => {
        dispatch(resetMessage())
    }, [dispatch])

    useEffect(() => {
        if (appMsgAdd) {

            dispatch(getRecommendListData())

            dispatch(getInfoData())

            props.setAppRekomendasiMsg(appMsgAdd)
            setLoadingSpinner(false)
        }
    }, [appMsgAdd])

    useEffect(() => {
        if (appMsgDelete.status === '1') {
            setLoadingSpinner(false)
            dispatch(getRecommendListData())
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
        } else if (appMsgDelete.status === '0') {
            setLoadingSpinner(false)
            dispatch(getRecommendListData())
            let offset = ReactSession.get('offset')
            let limit = ReactSession.get('limit')
            let selectedDeptData = ReactSession.get('selectedDeptData')
            let searchVal = ReactSession.get('searchVal')
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

        dispatch(getRecommendListData())
        props.setAppRekomendasiMsg(appMsgDelete)
    }, [appMsgDelete])

    const toggleDeleteModal = () => {
        setModal(!modal)
    }

    const toggleApply = () => {
        dispatch(deleteRecommend({ recommendId: recommendId }))
        setModal(!modal)
        setLoadingSpinner(true)
    }

    const toggleModal = () => {
        setModalRekomendasi(!modalRekomendasi)
    }

    useEffect(() => {
        if (appRecommendList?.data?.list) {
            const shouldSetSubmitEnable = appRecommendList?.data?.list.some(item => item?.submit === false);
            if (shouldSetSubmitEnable) {
                setSubmitEnable(true);
            } else {
                setSubmitEnable(false);
            }
        }
    }, [appRecommendList, appMsgDelete, appMsgAdd])

    return (
        <React.Fragment>

            <RekomendasiModal
                toggle={toggleModal}
                modal={modalRekomendasi}
                isAdd={isAdd}
                recommendId={recommendId}
            />
            <MsgModal
                toggle={toggleDeleteModal}
                toggleApply={toggleApply}
                modal={modal}
                message={'Apakah anda yakin untuk menghapus ini?'}
            />
            <div
                style={{
                    background: 'linear-gradient(25deg, rgba(255,255,255,1) 0%, rgba(37,150,190,0.2) 46%, rgba(37,150,190,0.19931722689075626) 100%)',
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignContent: "space-between",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    padding: "5%"
                    // gap: "2vw",
                }}
            >
                {appRecommendList?.data?.list ? (
                    appRecommendList?.data?.list?.map((item, index) => {
                        return (
                            <Card
                                key={index}
                                style={{
                                    width: "47%",
                                    marginBottom: "0",
                                    backgroundColor: 'transparent',
                                    borderColor: 'transparent',
                                }}
                            >
                                <CardBody
                                    className='glass-card'
                                    style={{
                                        padding: "5%",
                                        backgroundColor: item?.submit ? '#F0F0F0' : 'white',
                                        height: "30vh",
                                        opacity: item?.submit === true ? "75%" : "100%",
                                    }}>
                                    <div
                                        style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                style={{
                                                    objectPosition: 'center top',
                                                    objectFit: 'cover',
                                                    borderRadius: '50%',
                                                    height: '80px',
                                                    width: '80px',
                                                    marginRight: '25px',
                                                }}
                                                src={item?.profileUrl}
                                            />
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    position: 'relative',
                                                    left: '-75px',
                                                    top: "-50%",
                                                }}
                                            >
                                                {
                                                    item?.bestEmployeeCount > 0 ? (
                                                        Array.from({ length: item?.bestEmployeeCount }, (_, i) => (
                                                            <img key={i} width={'20px'} src={star} />
                                                        ))
                                                    ) : (
                                                        <img className='opacity-0' width={'20px'} src={star} />
                                                    )
                                                }

                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                position: 'relative',
                                                width: '50%',
                                                left: '-1em',
                                            }}
                                        >
                                            <b id={`name-recommendation-${index}`} style={{ fontSize: '1.8vh' }}>
                                                {item?.memberName}
                                            </b>

                                            <div className="text-primary" style={{ fontSize: '1.3vh', marginLeft: '0' }}>
                                                {item?.deptName}
                                            </div>
                                        </div>
                                        <UncontrolledTooltip target={`name-recommendation-${index}`} placement='top'>
                                            {item?.memberName}
                                        </UncontrolledTooltip>

                                    </div>
                                    <div>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                flexWrap: 'wrap',
                                                gap: '8px',
                                                paddingTop: ".5em",
                                                paddingBottom: ".5em",
                                            }}
                                        >

                                            {item?.stickerList && Array.isArray(item?.stickerList) && item?.stickerList.slice(0, maxStickersToShow).map((sticker, stickerIndex) => {
                                                return (
                                                    <>
                                                        <div
                                                            key={stickerIndex}
                                                            style={{ fontSize: '1.2vh', textOverflow: "ellipsis" }}
                                                        >
                                                            <img
                                                                width='12px'
                                                                height='12px'
                                                                style={{
                                                                    marginRight: "2px"
                                                                }}
                                                                src={sticker.stickerUrl}
                                                            />
                                                            {sticker.stickerName}
                                                        </div>
                                                    </>
                                                );
                                            })}

                                            {item?.stickerList && item?.stickerList.length > maxStickersToShow && (
                                                <React.Fragment>
                                                    <div id={`sticker-no-${index}`} style={{ fontSize: '1.2vh', textOverflow: "ellipsis" }}>
                                                        +{item?.stickerList.length - maxStickersToShow} More...
                                                    </div>
                                                    <UncontrolledTooltip target={`sticker-no-${index}`} placement='top'>
                                                        {item?.stickerList.slice(maxStickersToShow).map((row, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {row.stickerName}
                                                                </div>
                                                            )
                                                        })}
                                                    </UncontrolledTooltip>
                                                </React.Fragment>
                                            )}

                                        </div>
                                        <div
                                            className={`comment-recommendation`}
                                            id={`comment-recommendation-${index}`}
                                            style={{ fontSize: "1.5vh" }}
                                        >
                                            {item?.comment}
                                            <UncontrolledTooltip target={`comment-recommendation-${index}`} placement='top'>
                                                {item?.comment}
                                            </UncontrolledTooltip>
                                        </div>
                                        {
                                            !item?.submit && (
                                                <React.Fragment>
                                                    <a
                                                        onClick={() => {
                                                            setIsAdd(false)
                                                            setModalRekomendasi(true)
                                                            setRecommendId(item?.recommendId)
                                                        }}
                                                        className='mdi mdi-pencil text-primary'
                                                        style={{ position: "absolute", bottom: 0, right: "15%", paddingBottom: "2%", fontSize: "2.5vh" }}
                                                    >
                                                    </a>
                                                    <a
                                                        onClick={() => {
                                                            setRecommendId(item?.recommendId)
                                                            toggleDeleteModal()
                                                        }}
                                                        className='mdi mdi-close text-danger'
                                                        style={{ position: "absolute", bottom: 0, right: "0", paddingRight: "4%", fontSize: "3vh" }}
                                                    >
                                                    </a>
                                                </React.Fragment>
                                            )
                                        }
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })
                ) : null}
                <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", bottom: "4%", right: "4%" }}>
                    <a
                        className="btn btn-danger"
                        href='/home'
                        style={{
                            marginRight: "12px", // Adjust the spacing between the buttons
                        }}
                    >
                        <span className='mdi mdi-home' />
                        &nbsp;Home
                    </a>
                    <Button
                        disabled={!submitEnable}
                        onClick={() => {
                            dispatch(submitRecommend());
                            props.setAppRekomendasiMsg('');
                            setLoadingSpinner(true)
                        }}
                        style={{
                            backgroundColor: submitEnable ? '' : "#A9A9A9",
                            borderColor: submitEnable ? '' : "#A9A9A9",
                        }}
                    >
                        Submit
                    </Button>
                </div>

                <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                    <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                </div>
            </div>

        </React.Fragment>
    );
}

HistoryRekomendasi.propTypes = {
    appRekomendasiMsg: PropTypes.any,
    setAppRekomendasiMsg: PropTypes.any,
}

export default HistoryRekomendasi;
