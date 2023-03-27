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

    return (
        <main>
            <MyinfoCommon session={session} member={member}/>
         <h1>{session.name}</h1>
         <h1>{session.email}</h1>
          {/*  <span>Hi!{children.props}</span>
            <span>Hi!{children.props}</span>*/}
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
                        {bookinfo.map(({name, phone, tname, pname, category, period, pplnum, price}, index) => {
                            return (
                                <Table striped="columns" bordered className="bkdtb">
                                    <tbody key={index} value={[name, phone, tname, pname, category, period, pplnum, price]}>
                                    <tr>
                                        <th>예약자 이름</th>
                                        <td>{name}</td>
                                        <th>예약자 전화번호</th>
                                        <td>{phone}</td>
                                    </tr>
                                    <tr>
                                        <th>절</th>
                                        <td>{tname}</td>
                                        <th>프로그램 이름</th>
                                        <td>{pname}</td>
                                    </tr>
                                    <tr>
                                        <th>분류</th>
                                        <td>{category}</td>
                                        <th>기간</th>
                                        <td>{period}</td>
                                    </tr>
                                    <tr>
                                        <th>인원</th>
                                        <td>{pplnum}</td>
                                        <th>가격</th>
                                        <td>{price}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            )
                        })}
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