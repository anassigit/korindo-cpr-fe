import React, { useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import '../../assets/scss/custom.scss'; // Import your custom CSS
import { useDispatch, useSelector } from 'react-redux';
import { getRecommendListData } from 'store/actions';

const HistoryRekomendasi = () => {

    const dispatch = useDispatch()
    const appMemberList2 = useSelector((state) => {
        return state.rekomendasiReducer.respGetRecommendList
    })

    useEffect(() => {
        dispatch(getRecommendListData())
    }, [])

    return (
        <React.Fragment>
            {
                appMemberList2?.data?.list?.map((item, index) => {
                    <div
                        key={index}
                        className='d-flex justify-content-center my-3'
                        style={{ gap: '24px', width: "100%" }}
                    >
                        <Card className='col-5'>
                            <CardBody>
                                {item.name}
                            </CardBody>
                        </Card>
                    </div>
                })
            }
        </React.Fragment>
    );
}

export default HistoryRekomendasi;
