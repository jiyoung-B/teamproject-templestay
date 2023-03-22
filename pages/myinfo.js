import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import MyinfoCommon from "./layout/MyinfoCommon";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import {Table} from "react-bootstrap";

export default function Myinfo () {
    return (
        <main>
            <MyinfoCommon />
            <Container fluid>
                <Row className="lnm2">
                    <Col className="likesmenu2 col-6"><Link href='/likes'>좋아요</Link></Col>
                    <Col className="bar2 col-1">|</Col>
                    <Col className="infomenu2 col-5">예약정보</Col>
                </Row>
                <Row className="msg">
                    <Col className="offset-1">예약1</Col>
                </Row>
                <Row className="bkinfo">
                    <Col className="col-10 offset-1">
                        <Table striped="columns" bordered className="bkdtb">
                            <tbody>
                            <tr>
                                <th>예약자 이름</th>
                                <td></td>
                                <th>예약자 전화번호</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>절</th>
                                <td></td>
                                <th>프로그램 이름</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>분류</th>
                                <td></td>
                                <th>기간</th>
                                <td></td>
                            </tr>
                            <tr>
                                <th>인원</th>
                                <td></td>
                                <th>가격</th>
                                <td></td>
                            </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}

Myinfo.getLayout = (page) => (
    <Layout meta={{title: '마이페이지-내정보'}}>
        <Nav />
        {page}
    </Layout>
)