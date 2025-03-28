import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';

const DetailContentInfluencer = ({ modal, toggle, recommendData }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Detail Isi</ModalHeader>
            <ModalBody>
                <div className='my-2' style={{ fontWeight: "bold" }}>
                    Tanggal
                </div>
                <Input
                    disabled
                    value={recommendData?.write_time}
                />
                <div className='my-2' style={{ fontWeight: "bold" }}>
                    Departemen
                </div>
                <Input
                    disabled
                    value={recommendData?.deptName}
                />
                <div className='my-2' style={{ fontWeight: "bold" }}>
                    Nama
                </div>
                <Input
                    disabled
                    value={recommendData?.memberName}
                />
                <div className='my-2' style={{ fontWeight: "bold" }}>
                    Compliment
                </div>
                <Input
                    disabled
                    value={recommendData?.stickerName}
                />
                <div className='my-2' style={{ fontWeight: "bold" }}>
                    Komentar
                </div>
                <Input
                    type='textarea'
                    style={{ height: '8em' }}
                    disabled
                    value={recommendData?.comment}
                />
            </ModalBody>
            <ModalFooter>
                <Button className='p-2 unselectable text-danger' onClick={toggle}>
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    )
}

DetailContentInfluencer.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    recommendData: PropTypes.any,
};

export default DetailContentInfluencer