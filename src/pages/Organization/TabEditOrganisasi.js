import React from 'react'
import PropTypes from 'prop-types'

const TabEditOrganisasi = (props) => {
    return (
        <div 
        hidden={!props.appTabEdit}
        >
            TabEditOrganisasi
        </div>
    )
}

TabEditOrganisasi.propTypes = {
    appTabEdit: PropTypes.any,
}

export default TabEditOrganisasi