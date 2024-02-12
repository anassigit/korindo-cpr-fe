import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup } from 'reactstrap'

const ListOfView = (props) => {

    const [dropdown, setDropdown] = useState(false)
    const [dummyData, setDummyData] = useState()

    useEffect(() => {
        debugger
        if (Array.isArray(props.data) && props.data.length > 0) {
            setDummyData(props.data[0].data1)
        }
    }, [props.data])

    return (
        <Dropdown
            isOpen={dropdown}
            toggle={() => setDropdown(!dropdown)}
        >
            <InputGroup>
                <Input
                    value={dummyData}
                    onChange={(e) => setDummyData(e.target.value)}
                />
                <DropdownToggle
                    type='button'
                    style={{
                        borderRadius: '0 4px 4px 0'
                    }}
                >
                    <i className="fas fa-search" />
                </DropdownToggle>
                <DropdownMenu>
                    <div
                        style={{
                            width: '350px',
                            padding: '0 12px 0 12px'
                        }}
                    >
                        <InputGroup>
                            <Input
                                type='search'
                                style={{
                                    width: '25%'
                                }}
                            />
                            <Button
                                type='button'
                            >
                                <i className="fas fa-search" />
                            </Button>
                        </InputGroup>
                        <table className='table'>
                            <thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <th>tes</th>
                                    <th>tes</th>
                                    <th>tes</th>
                                </tr>
                            </thead>
                            <tbody onClick={() => {
                                setDropdown(false)
                            }}>
                                <tr>
                                    <td>
                                        data1
                                    </td>
                                    <td>
                                        data2
                                    </td>
                                    <td>
                                        data3
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        data1
                                    </td>
                                    <td>
                                        data2
                                    </td>
                                    <td>
                                        data3
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        data1
                                    </td>
                                    <td>
                                        data2
                                    </td>
                                    <td>
                                        data3
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </DropdownMenu>
            </InputGroup>
        </Dropdown>
    )
}

ListOfView.propTypes = {
    data: PropTypes.any
}

export default ListOfView