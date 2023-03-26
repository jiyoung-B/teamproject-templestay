import {check_captcha, handleInput, hashPassword, process_submit} from "../../module/Utils";
import {useState} from "react"
import {getSession} from "next-auth/client";
import Layout from "../../module/Utils";

export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if (sess) { // 로그인한 경우 회원정보로 이동
        return {
            redirect: {permanent: false, destination: '/member/myinfo'},
            props: {}
        }
    }
    return { props: {}}
}
export default function Join() {

    const [userid, setUserid] = useState('');
    const [passwd, setPasswd,] = useState('');
    const [name, setName] = useState('');


    const handlejoin = async () => {
        let hashpwd = await hashPassword(passwd) // 암호ㅎ를 해시화 함
        const data = {userid: userid, name: name, passwd:await hashpwd };
        if (await process_submit('/api/member/join', data) > 0) {
            location.href = '/member/login'
        }

    };


    return (
        <main>
            <h2>회원가입</h2>
            <form name="join">
                <div><label for="userid">이메일</label>
                    <input type="text" name="uid" id="userid" onChange={e => handleInput(setUserid,e)} /></div>
                <div><label for="name">이름</label>
                    <input type="text" name="name" id="name" onChange={e => handleInput(setName,e)}/></div>
                <div><label for="pwd">비밀번호</label>
                    <input type="password" name="pwd" id="passwd" onChange={e => handleInput(setPasswd,e)}/></div>

                <div><label></label>
                    <button type="button" className="btns" id="joinbtn" onClick={handlejoin}> 입력완료 </button>
                    <button type="reset"> 다시입력 </button>
                </div>
            </form>
        </main>

    );
};
Join.getLayout = (page) => (
    <Layout meta={{title: '회원가입'}}>
        {page}
    </Layout>
)
