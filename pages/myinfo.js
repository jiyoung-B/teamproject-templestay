import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import MyinfoCommon from "./layout/MyinfoCommon";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import {Table} from "react-bootstrap";
import Likes from "./likes";
import {getSession} from "next-auth/client";
import axios from "axios";
import React from "react";



export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if(!sess) { // 로그인하지 않은 경우 로그인으로 이동
        return {
            redirect: {permanent: false, destination: '/myinfo'},
            props: {}
        }
    }

    let email = sess.user.email; // 로그인한 사용자 아이디

    let url = `http://localhost:3000/api/member/myinfo?email=${email}`;

    const res = await axios.get(url);
    const member = await res.data[0];
    console.log('pg myinfo : ', await member);

    return {props : {member: member, session: sess}}
}



export default function Myinfo ({member, session}) {
    console.log('마이인포 -'+session);
    console.log('마이인포멤버 -'+member);
    return (
        <main>
            <MyinfoCommon session={session} member={member}/>
            <h1>{session.user.email}</h1>
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
                                <td>{member.name}</td>
                                <th>예약자 전화번호</th>
                                <td>{session.user.email}</td>
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