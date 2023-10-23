import React from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Spinner } from 'reactstrap';
import '../../assets/scss/custom/modal/modal.css'
const MsgModal = ({ modal, toggle, message, toggleApply }) => {
    return (
        <Modal isOpen={modal} toggle={toggle} backdrop="static">
            <ModalHeader toggle={toggle}>Mapping Service & Roles</ModalHeader>
            <ModalBody>
                {message === null ? (
                    <div className='d-flex justify-content-center'>
                        <Spinner
                            animation="grow"
                            style={{
                                width: '25px',
                                height: '25px',
                                display: 'block',
                                left: '50%',
                                top: '50%',
                            }}
                            color="grey"
                        />
                    </div>
                ) : (
                    message
                )}
            </ModalBody>
            <ModalFooter>

                <Button style={{ backgroundColor: "#8C8C8C", border: 'none', color: "white" }} onClick={toggleApply}>
                    Apply
                </Button>
                <a className='p-2 unselectable' onClick={toggle}>
                    Close
                </a>
            </ModalFooter>
        </Modal>
    );
};

MsgModal.propTypes = {
    modal: PropTypes.any,
    toggle: PropTypes.any,
    toggleApply: PropTypes.any,
    message: PropTypes.any,
    successClose: PropTypes.any,
};

export default MsgModal;
