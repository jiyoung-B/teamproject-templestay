// npm install next-auth@3.29.10 --save -dev
// 경로 : /pages/api/auth/[...nextauth].js
import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "axios";
export default NextAuth({
    providers: [
        Credentials({
            id: "userid-passwd-credentials",
            name: "userid-passwd-credentials",
            credentials: {
                userid: { label: "이메일", type: "text" },
                passwd: { label: "비밀번호", type: "password" }
            }, // 로그인 폼 정의
            async authorize(credentials, req) {
                // 아무거나 입력해도 그냥 로그인 됨
                console.log('auth login - ', credentials);
                // 입력한 인증 정보 가져옴
                const userid = credentials.userid;
                const passwd = credentials.passwd;

                // 인증확인
                let params =`?userid=${userid}&passwd=${passwd}`
                let url = `http://localhost:3000/api/member/login${params}`;
                const res = await axios.get(url);
                const result = await res.data;

                console.log('nextauth -', await result);


                // 인증에 성공해야만 로그인 허용
                //if(userid === 'abc123' && passwd === '987xyz') {
                if(await result.cnt>0 ) {
                    console.log('auth login - ', credentials);
                    return credentials;
                }else {
                    console.log('세션없음')
                    return null;
                }

            }
        })
    ],
    // pages: { // 인증에 사용자 정의 로그인 페이지 사용
    //     signIn: '/'
    // },
    callbacks: { // 세션 변수 외에 다른 값들도 확인하고 싶다면 콜백함수를 쓴다..?
        signIn: async (user, account, profile) => {
            return Promise.resolve("/login-modal");
        },
        signUp: async (user, account, profile) => {
            return Promise.resolve("/joinModal");
        },
    // token, user, account, profile, isNewUser
    async jwt(token, user, account, profile, isNewUser) {
        console.log('jwt - ', user);
        if(user?.userid) token.userid = user.userid;// 옵셔널 체인! express 할때 했어? 삼항연산자와 비슷.
        return token;
    },
    // session, userOrToken
    async session(session, userOrToken) {
        console.log('session - ', userOrToken);
        session.user.userid = userOrToken.userid;
        return session;
    }
    }
});
