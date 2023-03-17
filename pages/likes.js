import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import MyinfoCommon from "./layout/MyinfoCommon";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import temple from "./temple/[name]";

export default function Likes () {
    return (
        <main>
            <MyinfoCommon />
            <Container fluid>
                <Row className="lnm">
                    <Col className="likesmenu1 col-6">좋아요</Col>
                    <Col className="bar1 col-1">|</Col>
                    <Col className="infomenu1 col-5"><Link href='/myinfo'>내정보</Link></Col>
                </Row>
                <Row>
                    <Col className="temples col-11 offset-1" style={{fontSize: "25px"}}>좋아요를 누른 사찰</Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <Col className="col-1">(이미지)</Col>
                        <Col className="col-1">XX사</Col>
                        <Col className="col-3">주소</Col>
                        <Col className="col-2">날짜</Col>
                        <Col className="col-3">프로그램 이름</Col>
                        <Col className="col-1">인원 수</Col>
                    </Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <Col className="col-1">(이미지)</Col>
                        <Col className="col-1">XX사</Col>
                        <Col className="col-3">주소</Col>
                        <Col className="col-2">날짜</Col>
                        <Col className="col-3">프로그램 이름</Col>
                        <Col className="col-1">인원 수</Col>
                    </Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <Col className="col-1">(이미지)</Col>
                        <Col className="col-1">XX사</Col>
                        <Col className="col-3">주소</Col>
                        <Col className="col-2">날짜</Col>
                        <Col className="col-3">프로그램 이름</Col>
                        <Col className="col-1">인원 수</Col>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}
Likes.getLayout = (page) => (
    <Layout meta={{title: '마이페이지-좋아요'}}>
        <Nav />
        {page}
    </Layout>
)