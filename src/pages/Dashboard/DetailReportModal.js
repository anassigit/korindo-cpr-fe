import PropTypes from 'prop-types';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { addReport, getReportListData } from 'store/actions';
import '../../assets/scss/custom/modal/modal.css';
const DetailReportModal = ({ modal, toggle, recommendId }) => {

    const dispatch = useDispatch()
    const [jenisLapor, setJenisLapor] = useState('')

    const appReportListData = useSelector((state) => {
        return state.dashboardReducer.respGetReportList
    })

    useEffect(() => {
        dispatch(getReportListData())
    }, [])

    useEffect(() => {
        if (appReportListData.status === '1') {
            setJenisLapor(appReportListData?.data?.list[0].jenisLapor)
        }
    }, [appReportListData])

    const saveHandler = () => {
        
        dispatch(addReport({
            recommendId: recommendId,
            jenisLapor: jenisLapor,
        }))
        toggle()
    }

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Lapor</ModalHeader>
            <ModalBody>
                <div className='mb-2' style={{ fontWeight: "bold" }}>
                    Jenis Laporan
                </div>
                <Input
                    type='select'
                    value={jenisLapor}
                    onChange={(e) => {
                        setJenisLapor(e.target.value)
                    }}
                >
                    {
                        appReportListData?.data?.list.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.jenisLapor}
                                >
                                    {item.description}
                                </option>
                            )
                        })
                    }
                </Input>
            </ModalBody>
            <ModalFooter>

                <Button className='btn btn-danger' style={{ border: 'none', color: "white" }} onClick={saveHandler}>
                    Lapor
                </Button>
                <a className='p-2 unselectable text-danger' onClick={toggle}>
                    Close
                </a>
            </ModalFooter>
        </Modal>
    );
};

DetailReportModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    recommendId: PropTypes.any,
};

export default DetailReportModal;
