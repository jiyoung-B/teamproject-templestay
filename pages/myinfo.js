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
import moment from "moment/moment";



export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    let email = session.user.email;

    console.log('세션으로 나온 이메일', email)

    let param = `?email=${email}`
   // let param = `?email=test@test.com`
    let url = `http://localhost:3000/api/bookedInfo${param}`

    const res = await axios.get(url)
    console.log('boookedinfo', res)
    let bookedinfos = res.data[0];
    // let bookedinfos.B_STRDATE = moment(bookedinfos.B_STRDATE).format('YYYY-MM-DD');

    // let updatedBookedInfos = bookedinfos.map((info) => {
    //     return {
    //         ...info,
    //         B_STRDATE: moment(info.B_STRDATE).format('YYYY-MM-DD'),
    //         B_ENDDATE: moment(info.B_STRDATE).format('YYYY-MM-DD')
    //     }
    // })
    console.log('북데이터인포스', bookedinfos)

    return {props:{bookedinfos}}
}



export default function Myinfo ({session, bookedinfos}) {
    console.log('예약정보 받아오나요?', bookedinfos)

    return (
        <main>
            <MyinfoCommon session={session}/>
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
                        <>
                        {bookedinfos.map(bi => (
                                <Table striped="columns" bordered className="bkdtb">
                                    <tbody key={bi.PID}>
                                    <tr>
                                        <th>예약자명</th>
                                        <td>{session.name}</td>
                                        <th>이메일</th>
                                        <td>{bi.email}</td>
                                    </tr>
                                    <tr>
                                        <th>절</th>
                                        <td>{bi.T_NAME}</td>
                                        <th>프로그램 이름</th>
                                        <td>{bi.P_NAME}</td>
                                    </tr>
                                    <tr>
                                        <th>분류</th>
                                        <td>{bi.P_CLASS}</td>
                                        <th>기간</th>
                                        <td>{bi.B_STRDATE} ~ {bi.B_ENDDATE}</td>
                                    </tr>
                                    <tr>
                                        <th>인원</th>
                                        <td>성인: {bi.ADULT}<br/>중등: {bi.MIDDLE}<br/>초등: {bi.YOUNG}<br />미취학아동: {bi.PRESCHOOL}</td>
                                        <th>가격</th>
                                        <td>{bi.TOTAL}</td>
                                    </tr>
                                    </tbody>
                                </Table>
                        ))}
                        </>

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