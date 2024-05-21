import React from "react"
import { Container, Row, Col } from "reactstrap"

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid={true}>
          <Row>
            <Col md={7}>
              {/* ©Korindo {new Date().getFullYear()} */}
              <span className="mdi mdi-phone"></span> KTA Help Contact: &nbsp;
              <b>
              Venna (HRD & GA Division, ext. 214), &nbsp;  Abdul (HRD & GA Division, ext. 231)
              </b>
            </Col>
            <Col md={5}>
              <div className="text-sm-end d-none d-sm-block">
                ©Korindo {new Date().getFullYear()}
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
