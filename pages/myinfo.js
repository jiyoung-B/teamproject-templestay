import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import MyinfoCommon from "./layout/MyinfoCommon";

export default function Myinfo () {
    return (
        <main>
            <MyinfoCommon />
            <Container fluid>
                <Row className="lnm2">
                    <Col className="likesmenu2 col-6"><Link href='/likes'>좋아요</Link></Col>
                    <Col className="bar2 col-1">|</Col>
                    <Col className="infomenu2 col-5">내정보</Col>
                </Row>
                <Row className="msg">
                    <Col className="offset-1">개인정보 유출에 조심하세요</Col>
                </Row>
                <Row className="psinfo">
                    <Col className="col-10 offset-1">카드</Col>
                </Row>
                <Row className="msg">
                    <Col className="offset-1">예약 정보</Col>
                </Row>
                <Row className="bkinfo">
                    <Col className="col-10 offset-1">카드</Col>
                </Row>
            </Container>
        </main>
    )
}