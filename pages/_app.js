import '../styles/css/custom.css'
import '../styles/css/Nav.css'
import '../styles/globals.css'
import '../styles/css/MyinfoCommon.css'
import '../styles/css/likes.css'
import '../styles/css/intro.css'
import '../styles/css/myinfo.css'
import React from 'react';
import {useEffect} from "react";
import Layout from "./layout/Layout";
import {getSession} from "next-auth/client";
import App from "next/app";

function MyApp({ Component, pageProps, session }) {
    pageProps.session = session;
    console.log('myapp페이지프롭스', pageProps);
    console.log('myapp페이지프롭스멤버멤버', pageProps.member);
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <React.Fragment>
            <Layout {...pageProps} session={session}>
                <Component {...pageProps} />
            </Layout>
        </React.Fragment>
    )
}


MyApp.getInitialProps = async (ctx) => {
    // next app의 기본 props객체 초기화 - application단위의 전역변수
    const appProps = await App.getInitialProps(ctx);
    let sess =await getSession(ctx);
    appProps.session = await sess;
    if(!sess) appProps.session = {user:{ name: 'guest', email: 'null', userid: 0 }};
    return {...appProps};

}
// export async function getServerSideProps(ctx) {
//
//     // 세션 객체 가져오기
//     const sess = await getSession(ctx);
//     if(!sess) { // 로그인하지 않은 경우 로그인으로 이동
//         return {
//             redirect: {permanent: false, destination: '/'},
//             props: {}
//         }
//     }
//     // let userid = ctx.query.userid;
//     // let userid = 'abc123';
//     let email = sess.user.email; // 로그인한 사용자 아이디
//
//     let url = `http://localhost:3000/api/member/myinfo?email=${email}`;
//
//     const res = await axios.get(url);
//     const member = await res.data[0];
//     console.log('네브멤버 : ', await member);
//
//     return {props : {member: member, session: sess}}
// }

export default MyApp
