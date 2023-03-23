import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import {getSession, useSession} from "next-auth/client";
import axios from "axios";

export async function getServerSideProps(ctx) {
// 세션 객체 가져오기
//     const sess = await getSession(ctx);
//     let email = sess?.user?.email;
//     let url = email ? `http://localhost:3000/api/member/myinfo?email=${email}`:'';
//
//     if(url){
//         const res = await axios.get(url);
//         const member = await res.data[0];
//         console.log('pg myinfo common : ', await member);
//
//         return {props : {member: member, session: sess}}
//     } else {
//         return {props : {session: null}};
//     }

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
    console.log('마이커먼인포res', res);
    const member = await res.data[0];
    console.log('인포커먼 멤버 myinfo : ', await member);

    return {props : {member: member, session: sess}}
}

const MyinfoCommon = ({member, session}) => {
    console.log('myinfo - ', session);
    console.log('myinfo멤버 - ', member);

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