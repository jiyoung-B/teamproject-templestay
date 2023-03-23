import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const MyinfoCommon = ({member, session}) => {
    console.log('마이커먼 인포 - ', session);
    console.log('마이커먼인포 멤버 - ', member);

        return(
        <div>
            <Container fluid>
                <Row className="fstr">
                    <Col className="col-5 offset-1">
                        <Col className="welcome">환영합니다</Col>
                        <Col className="email">{member.name}님😊</Col>
                        <Col className="email">이메일주소 {session.user.email}</Col>
                    </Col>
                    <Col style={{textAlign: "right"}} className="buddhist col-5"><img src="/img/buddhist.png" /></Col>
                </Row>
            </Container>
        </div>

        );


}

export default MyinfoCommon;