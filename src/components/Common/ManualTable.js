<<<<<<< HEAD
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

const ManualTable = (props) => {

    const dispatch = useDispatch()
    const [isFirstRenderDropdown, setIsFirstRenderDropdown] = useState([])
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [sortField, setSortField] = useState([])

    useEffect(() => {
        dispatch(props.dispatchCall(props.searchGet))
    }, [props.searchGet])

    useEffect(() => {
        if (isFirstRender) {
            if (Array.isArray(props.column) && props.column.length > 0) {
                setIsFirstRenderDropdown(() => (
                    props.column.map(() => {
                        return true
                    })
                ))
                setSortField(() => (
                    props.column.map(() => ("desc"))
                ))
            }
            setIsFirstRender(false)
        }
    }, [props.column])

    return (
        <table className='table'>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    {props.column.map((item, index) => {
                        return (
                            <th
                                key={index}
                                style={item?.headerStyle}
                                onClick={() => {
                                    if (item.sort && item.sort === true) {
                                        if (item?.sort) {
                                            setIsFirstRenderDropdown(prevState => {
                                                const newState = [...prevState]
                                                newState[index] = false
                                                return newState
                                            })
                                            props.searchSet(prevState => {
                                                let order = ""
                                                if (isFirstRenderDropdown[index] === true) {
                                                    order = "desc"
                                                } else {
                                                    if (prevState.order === "desc") {
                                                        order = "asc"
                                                        setSortField(prevState => {
                                                            const newState = [...prevState]
                                                            newState[index] = "asc"
                                                            return newState
                                                        })
                                                    } else {
                                                        order = "desc"
                                                        setSortField(prevState => {
                                                            const newState = [...prevState]
                                                            newState[index] = "desc"
                                                            return newState
                                                        })
                                                    }
                                                }
                                                return ({
                                                    ...prevState,
                                                    sort: item?.dataField,
                                                    order: order
                                                })
                                            })
                                        }
                                    }
                                }}
                            >
                                {item.text}
                                {item.sort && item.sort === true ? (
                                    <span className="order">
                                        {isFirstRenderDropdown[index] ? (
                                            <>
                                                <span className="dropdown">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                                <span className="dropup">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        ) : sortField[index] === "asc" ? (
                                            <>
                                                &nbsp;
                                                <span className="dropup">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="dropdown">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        )}
                                    </span>
                                ) : null}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map((dataItem, dataIndex) => {
                    return (
                        <tr key={dataIndex}>
                            {
                                props.column.map((columnItem, columnIndex) => {
                                    return (
                                        <td
                                            key={columnIndex}
                                            style={columnItem?.style}
                                        >
                                            {
                                                columnItem?.formatter ? columnItem?.formatter(dataItem[columnItem.dataField], dataItem) : dataItem[columnItem.dataField]
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

ManualTable.propTypes = {
    column: PropTypes.any,
    data: PropTypes.any,
    searchSet: PropTypes.any,
    searchGet: PropTypes.any,
    dispatchCall: PropTypes.any,
}

=======
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

const ManualTable = (props) => {

    const dispatch = useDispatch()
    const [isFirstRenderDropdown, setIsFirstRenderDropdown] = useState([])
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [sortField, setSortField] = useState([])

    useEffect(() => {
        dispatch(props.dispatchCall(props.searchGet))
    }, [props.searchGet])

    useEffect(() => {
        if (isFirstRender) {
            if (Array.isArray(props.column) && props.column.length > 0) {
                setIsFirstRenderDropdown(() => (
                    props.column.map(() => {
                        return true
                    })
                ))
                setSortField(() => (
                    props.column.map(() => ("desc"))
                ))
            }
            setIsFirstRender(false)
        }
    }, [props.column])

    return (
        <table className='table'>
            <thead>
                <tr style={{ textAlign: 'center' }}>
                    {props.column.map((item, index) => {
                        return (
                            <th
                                key={index}
                                style={item?.headerStyle}
                                onClick={() => {
                                    if (item.sort && item.sort === true) {
                                        if (item?.sort) {
                                            setIsFirstRenderDropdown(prevState => {
                                                const newState = [...prevState]
                                                newState[index] = false
                                                return newState
                                            })
                                            props.searchSet(prevState => {
                                                let order = ""
                                                if (isFirstRenderDropdown[index] === true) {
                                                    order = "desc"
                                                } else {
                                                    if (prevState.order === "desc") {
                                                        order = "asc"
                                                        setSortField(prevState => {
                                                            const newState = [...prevState]
                                                            newState[index] = "asc"
                                                            return newState
                                                        })
                                                    } else {
                                                        order = "desc"
                                                        setSortField(prevState => {
                                                            const newState = [...prevState]
                                                            newState[index] = "desc"
                                                            return newState
                                                        })
                                                    }
                                                }
                                                return ({
                                                    ...prevState,
                                                    sort: item?.dataField,
                                                    order: order
                                                })
                                            })
                                        }
                                    }
                                }}
                            >
                                {item.text}
                                {item.sort && item.sort === true ? (
                                    <span className="order">
                                        {isFirstRenderDropdown[index] ? (
                                            <>
                                                <span className="dropdown">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                                <span className="dropup">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        ) : sortField[index] === "asc" ? (
                                            <>
                                                &nbsp;
                                                <span className="dropup">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="dropdown">
                                                    <span className="caret">
                                                    </span>
                                                </span>
                                            </>
                                        )}
                                    </span>
                                ) : null}
                            </th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {props.data.map((dataItem, dataIndex) => {
                    return (
                        <tr key={dataIndex}>
                            {
                                props.column.map((columnItem, columnIndex) => {
                                    return (
                                        <td
                                            key={columnIndex}
                                            style={columnItem?.style}
                                        >
                                            {
                                                columnItem?.formatter ? columnItem?.formatter(dataItem[columnItem.dataField], dataItem) : dataItem[columnItem.dataField]
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

ManualTable.propTypes = {
    column: PropTypes.any,
    data: PropTypes.any,
    searchSet: PropTypes.any,
    searchGet: PropTypes.any,
    dispatchCall: PropTypes.any,
}

>>>>>>> f23d2f551239199f028f5e8870adde7381ad99ca
export default ManualTable