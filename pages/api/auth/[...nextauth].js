// npm install next-auth@3.29.10 --save-dev
// 경로 : /pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import axios from "axios";

export default NextAuth({
    providers: [
        Credentials({
            id: "email-passwd-credentials",
            name: "email-passwd-credentials",
            credentials: {
                email: { label: "이메일", type: "email" },
                passwd: { label: "비밀번호", type: "password" }
            }, // 로그인 폼 정의
            async authorize(credentials, req) {
                // 입력한 인증 정보 가져옴
                const email = credentials.email;
                const passwd = credentials.passwd;

                // 인증 확인
                let params = `?email=${email}&passwd=${passwd}`;
                let url = `http://localhost:3000/api/member/login${params}`;
                const res = await axios.get(url);
                const result = await res.data;

                console.log('nextauth -', await result);

                // 인증에 성공해야만 로그인 허용
                //if (email === 'abc123' && passwd === '987xyz') {
                if (await result.cnt > 0) {
                    return credentials;
                }
            }
        })
    ],
    pages: { // 인증에 사용자 정의 로그인 페이지 사용
        signIn: '/layout/Nav'
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            console.log('jwt - ', user);
            if (user?.email) token.email = user.email;

            return token;
        },

        async session(session, userOrToken) {
            console.log('session - ', userOrToken);
            session.user.email = userOrToken.email;

            return session;
        }
    }
});