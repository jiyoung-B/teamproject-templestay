import {signOut} from "next-auth/client";
import Layout from "../../components/layout/Layout";
import Login from "./login";

export default function Logout({member, session}) {
    return (
        <main>
            <button className='logout' onClick={() => signOut()
                .then(r=>location.href='/')}>로그아웃하기</button>
        </main>
    )
}


Logout.getLayout = (page) => (
    <Layout meta={{title: '로그아웃하기'}}>
        {page}
    </Layout>
)
