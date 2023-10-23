import React from "react"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { Row, Col, BreadcrumbItem, Button } from "reactstrap"

const Breadcrumb = props => {
  return (
    <Row style={{marginBottom: "-15px", marginTop: "-10px"}}>
      <Col xs="12">
      
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
        
          
          
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
            <div className="dropdown d-none d-lg-inline-block ms-2">
              {props.pageNow != undefined ? 
                <button
                style={{marginTop: "-13px", marginLeft: "-25px"}}
                  type="button"
                  onClick={() => {
                    props.pageNow(false);
                    props.pageBefore(true);
                    props.message("");
                  }}
                  className="btn header-item noti-icon "
                  data-toggle="reload"
                >
                  <i className="bx bx-chevron-left" /> 
                </button>
              : <div><br/><br/> </div>
              }
            </div>
            <i className="bx bx-book-content font-size-18 align-middle me-2"></i>
          
              <BreadcrumbItem>
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              
              <BreadcrumbItem active>
                <Link to="#">{props.breadcrumbItem}</Link>
              </BreadcrumbItem>
            </ol>
          </div>

        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string,
  pageNow : PropTypes.any,
  pageBefore : PropTypes.any,
  message : PropTypes.any,
}

export default Breadcrumb
