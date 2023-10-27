import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import '../../assets/scss/custom.scss'; // Import your custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendListData } from 'store/actions';

const HistoryRekomendasi = () => {

    const dispatch = useDispatch()

    const maxStickersToShow = 2; // Maximum number of stickers to show

    const appRecommendList = useSelector((state) => {
        return state.rekomendasiReducer.respGetRecommendList
    })

    useEffect(() => {
        dispatch(getRecommendListData())
    }, [])

    return (
        <React.Fragment>
            <div
                style={{
                    background: 'linear-gradient(25deg, rgba(255,255,255,1) 0%, rgba(37,150,190,0.2) 46%, rgba(37,150,190,0.19931722689075626) 100%)',
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
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
                                        style={{ display: "flex", flexDirection: "row" }}
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
                                            style={{ display: 'flex', flexDirection: "column", paddingTop: "7%", width: "50%" }}
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

                                            {item.stickerList.slice(0, maxStickersToShow).map((sticker, stickerIndex) => {
                                                return (
                                                    <div
                                                        xl="6"
                                                        key={stickerIndex}
                                                        style={{ fontSize: '1.2vh', textOverflow: "ellipsis" }}
                                                    >
                                                        {sticker.name}
                                                    </div>
                                                );
                                            })}

                                            {item.stickerList.length > maxStickersToShow && (
                                                <React.Fragment>
                                                    <div id={`sticker-no-${index}`} style={{ fontSize: '1.2vh', textOverflow: "ellipsis" }}>
                                                        +{item.stickerList.length - maxStickersToShow} More...
                                                    </div>
                                                    <UncontrolledTooltip target={`sticker-no-${index}`} placement='top'>

                                                    </UncontrolledTooltip>
                                                </React.Fragment>
                                            )}

                                        </div>
                                        <div id='comment-recommendation' style={{ fontSize: "1.5vh" }}>
                                            {item.comment}
                                        </div>
                                        <span className='mdi mdi-pencil text-primary' style={{position:"absolute", bottom:0, right:"15%", paddingBottom:"2%", fontSize:"2.5vh"}}>
                                        </span>
                                        <span className='mdi mdi-close text-danger' style={{position:"absolute", bottom:0, right:"0", paddingRight:"4%", fontSize:"3vh"}}>
                                        </span>
                                    </div>
                                </CardBody>
                            </Card>
                        )
                    })
                ) : null}
            </div>

        </React.Fragment>
    );
}

export default HistoryRekomendasi;
