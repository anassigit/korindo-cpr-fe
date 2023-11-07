import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner, Input } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'
import { useDispatch, useSelector } from 'react-redux';
import { getReportListData } from 'store/actions';
const DetailReportModal = ({ modal, toggle, message, toggleApply }) => {

    const dispatch = useDispatch()

    const appReportListData = useSelector((state) => {
        return state.dashboardReducer.respGetReportList
    })

    const tempReport = [
        {
            id: '1',
            content: '[][][][][][]]]',
        },
        {
            id: '2',
            content: 'awdawdwad',
        },
    ]

    useEffect(() => {
        dispatch(getReportListData())
    }, [])

    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Lapor</ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                    Jenis Laporan
                </div>
                <Input
                    type='select'
                >
                    {
                        tempReport.map((item, index) => {

                            return (
                                <option
                                    key={index}
                                    value={item.id}
                                >
                                    {item.content}
                                </option>
                            )
                        })
                    }
                </Input>
            </ModalBody>
            <ModalFooter>

                <Button className='btn btn-danger' style={{ border: 'none', color: "white" }} onClick={toggleApply}>
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
    toggleApply: PropTypes.any,
    message: PropTypes.any,
    successClose: PropTypes.any,
};

export default DetailReportModal;
