import React, { useEffect, useState } from 'react';
import { Card, CardBody, Col, Row, Spinner, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom.scss'; // Import your custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecommend, getMemberListData, getRecommendListData, getSearchData } from 'store/actions';
import { ReactSession } from 'react-client-session';
import MsgModal from 'components/Common/MsgModal';
import RekomendasiModal from './RekomendasiModal';

const HistoryRekomendasi = () => {

    let offset = ReactSession.get('offset')
    let limit = ReactSession.get('limit')
    let selectedDeptData = ReactSession.get('selectedDeptData')

    const dispatch = useDispatch()

    const maxStickersToShow = 2; // Maximum number of stickers to show

    const [modal, setModal] = useState(false)
    const [loadingSpinner, setLoadingSpinner] = useState(false)
    const [isAdd, setIsAdd] = useState(false)
    const [modalRekomendasi, setModalRekomendasi] = useState(false)

    const [recommendId, setRecommendId] = useState()
    const [employeeId, setEmployeeId] = useState()

    const appRecommendList = useSelector((state) => {
        return state.rekomendasiReducer.respGetRecommendList
    })

    const appMsgDelete = useSelector((state) => {
        return state.rekomendasiReducer.msgDelete
    })

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
                        "org_id": selectedDeptData
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
                        "org_id": selectedDeptData
                    }
                }));
            }
        }
    }, [appMsgDelete])

    const toggleDeleteModal = () => {
        setModal(!modal)
    }

    const toggleApply = () => {
        dispatch(deleteRecommend({ recommend_id: recommendId }))
        setModal(!modal)
        setLoadingSpinner(true)
    }


    const toggleModal = () => {
        setModalRekomendasi(!modalRekomendasi)
    }


    useEffect(() => {
        dispatch(getRecommendListData())
    }, [])

    return (
        <React.Fragment>

            <RekomendasiModal
                toggle={toggleModal}
                modal={modalRekomendasi}
                isAdd={isAdd}
                recommend_id={recommendId}
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
                    appRecommendList?.data?.list.map((item, index) => {

                        return (
                            <Card
                                key={index}
                                style={{ width: "47%", marginBottom: "0" }}
                            >
                                <CardBody
                                    className='glass-card'
                                    style={{
                                        padding: "5%",
                                        height: "30vh",
                                    }}>
                                    <div
                                        style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}
                                    >
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                                height: '80px',
                                                width: '80px',
                                                marginRight: "25px",
                                            }}
                                            src={item.profile_url}
                                        />
                                        <div
                                            style={{ display: 'flex', flexDirection: "column", justifyContent: "center", width: "50%" }}
                                        >
                                            <b id='name-recommendation' style={{ fontSize: "1.8vh" }}>
                                                {item.name}
                                            </b>
                                            <div className='text-primary' style={{ fontSize: "1.3vh" }}>
                                                {item.dept_name}
                                            </div>
                                        </div>
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

                                            {item.stickerList && Array.isArray(item.stickerList) && item.stickerList.slice(0, maxStickersToShow).map((sticker, stickerIndex) => {
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
                                                                src={sticker.url}
                                                            />
                                                            {sticker.name}
                                                        </div>
                                                    </>
                                                );
                                            })}

                                            {item.stickerList && item.stickerList.length > maxStickersToShow && (
                                                <React.Fragment>
                                                    <div id={`sticker-no-${index}`} style={{ fontSize: '1.2vh', textOverflow: "ellipsis" }}>
                                                        +{item.stickerList.length - maxStickersToShow} More...
                                                    </div>
                                                    <UncontrolledTooltip target={`sticker-no-${index}`} placement='top'>
                                                        {item.stickerList.slice(maxStickersToShow).map((row, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    {row.name}
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
                                            {item.comment}
                                            <UncontrolledTooltip target={`comment-recommendation-${index}`} placement='top'>
                                                {item.comment}
                                            </UncontrolledTooltip>
                                        </div>
                                        <a
                                            onClick={() => {
                                                setIsAdd(false)
                                                setModalRekomendasi(true)
                                                setRecommendId(item.id)
                                            }}
                                            className='mdi mdi-pencil text-primary'
                                            style={{ position: "absolute", bottom: 0, right: "15%", paddingBottom: "2%", fontSize: "2.5vh" }}
                                        >
                                        </a>
                                        <a
                                            onClick={() => {
                                                setRecommendId(item.id)
                                                toggleDeleteModal()
                                            }}
                                            className='mdi mdi-close text-danger'
                                            style={{ position: "absolute", bottom: 0, right: "0", paddingRight: "4%", fontSize: "3vh" }}
                                        >
                                        </a>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })
                ) : null}
                <div className="spinner-wrapper" style={{ display: loadingSpinner ? "block" : "none", zIndex: "9999", position: "fixed", top: "0", right: "0", width: "100%", height: "100%", backgroundColor: "rgba(255, 255, 255, 0.5)", opacity: "1" }}>
                    <Spinner style={{ padding: "24px", display: "block", position: "fixed", top: "42.5%", right: "50%" }} color="primary" />
                </div>
            </div>

        </React.Fragment>
    );
}

export default HistoryRekomendasi;
