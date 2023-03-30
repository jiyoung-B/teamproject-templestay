// npm install next-auth@3.29.10 --save-dev
// 경로 : /pages/api/auth/[...nextauth].js

import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import axios from "axios";
import {hashPassword, comparePasswd} from "../../../models/Utils";

export default NextAuth({
    providers: [
        Credentials({
            id: "email-passwd-credentials",
            name: "email-passwd-credentials",
            credentials: {
                name: { label: "이름", type: "text" },
                email: { label: "이메일", type: "email" },
                passwd: { label: "비밀번호", type: "password" }
            }, // 로그인 폼 정의
            async authorize(credentials, req) {
                const email = credentials.email;
                let passwd = credentials.passwd;

                passwd = hashPassword(passwd)

                let params = `?email=${email}&passwd=${passwd}`;
                //let params = `?email=${email}`;
                let url = `http://localhost:3000/api/member/login${params}`;
                const res = await axios.get(url);
                const result = await res.data;

                // 인증시 기존 암호와 테이블의 암호끼리 비교
                let is_ok = comparePasswd(req.body.passwd, (await result).passwd);

                // 인증에 성공해야만 로그인 허용
                if (await is_ok) {
                    credentials.name = (await result).name;
                    return credentials;
                }
            }
        })
    ],
     secret: process.env.SECRET,
    pages: { // 인증에 사용자 정의 로그인 페이지 사용
        signIn: '/layout/Nav'
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (user?.email) token.email = user.email;
            return token;
        },

        async session(session, userOrToken) {
            session.user.email = userOrToken.email;
            session.user.name = userOrToken.name;
            return session;
        }
    }
});

