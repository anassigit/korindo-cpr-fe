import React, { useEffect } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';
import '../../assets/scss/custom.scss'; // Import your custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendListData } from 'store/actions';

const HistoryRekomendasi = () => {

    const dispatch = useDispatch()
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
                                <CardBody style={{
                                    padding:"5%",
                                    height: "30vh",
                                }}>
                                    <div
                                        style={{ display: "flex", flexDirection: "row" }}
                                    >
                                        <img
                                            style={{
                                                objectFit: "cover",
                                                borderRadius: "50%",
                                                height: '90px',
                                                width: '90px',
                                                marginRight: "25px",
                                            }}
                                            src={item.profile_url}
                                        />
                                        <div
                                            style={{ display: 'flex', flexDirection: "column", paddingTop: "8%", width: "50%" }}
                                        >
                                            <b id='name-recommendation'>
                                                {item.name}
                                            </b>
                                            <div className='text-primary'>
                                                {item.dept_name}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                           className='my-2'
                                           style={{ display: "flex", alignItems: "center" }}
                                        >
                                            {item.stickerList.map((sticker, stickerIndex) => {
                                                return (
                                                    <Col key={stickerIndex} style={{ fontSize: '10px' }}>
                                                        {sticker.name}
                                                    </Col>
                                                )
                                            })}
                                        </div>
                                        <div>
                                            {item.comment}
                                        </div>
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
