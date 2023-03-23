import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from "next/link";
import MyinfoCommon from "./layout/MyinfoCommon";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import Likes from "./likes";
import {getSession} from "next-auth/client";
import axios from "axios";
import React from "react";



export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if(!sess) { // 로그인하지 않은 경우 로그인으로 이동
        return {
            redirect: {permanent: false, destination: '/layout/Nav'},
            props: {}
        }
    }
    // let userid = ctx.query.userid;
    // let userid = 'abc123';
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
                    <Col className="col-10 offset-1">아이디: {member.name}<br/>이메일: {session.user.email}님</Col>
                    {/*!!*/}
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