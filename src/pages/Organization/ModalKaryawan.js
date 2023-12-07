import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css';
const ModalKaryawan = ({ modal, toggle, toggleApply }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Pilih Department</ModalHeader>
            <ModalBody>
                
            </ModalBody>
            <ModalFooter>

                <Button className='btn btn-primary' style={{ border: 'none', color: "white" }} onClick={toggleApply}>
                    Apply
                </Button>
                <a className='p-2 unselectable' onClick={toggle}>
                    Close
                </a>
            </ModalFooter>
        </Modal>
    );
};

ModalKaryawan.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    toggleApply: PropTypes.any,
    successClose: PropTypes.any,
};

export default ModalKaryawan;
