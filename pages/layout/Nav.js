import {Container, Row, Col, NavLink, Button, Modal, Form} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale";
import {handleInput, hashPassword, process_submit, comparePasswd} from "../../module/Utils";
import {error} from "next/dist/build/output/log";
import {getSession, signIn, signOut, useSession} from "next-auth/client";
import axios from "axios";

export async function getServerSideProps(ctx) {

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    let email = sess?.user?.email;
    let url = email ? `http://localhost:3000/api/member/myinfo?email=${email}`:'';

    if(url){
    const res = await axios.get(url);
    const member = await res.data[0];
    console.log('pg myinfo Nav : ', await member);

    return {props : {member: member, session: sess}}
    } else {
        return {props : {session: null}};
    }
}



const Nav = ({menu, member, session}) => {
    console.log('nav - ', session);
    const [passwd2, setPasswd2,] = useState('');
    const [repasswd, setRepasswd] = useState('');
    const [name, setName] = useState('');
    const [email2, setEmail2] = useState('');
    const [passwdError, setPasswdError] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    //
    const [joinEmail, setJoinEmail] = useState('');
    const handleJoin = async () => {
        if (passwd2 !== repasswd){
            setPasswdError('비밀번호가 일치하지 않습니다!');
            return ;
        } else {
            setPasswdError('');
        }
        // 암호화시
        let hashpwd2 = await hashPassword(passwd2); // 암호를 해시화 함
        console.log('join ', hashpwd2)

        const data = {passwd: await hashpwd2, name: name, email: email2};
        //const data = {passwd: await hashpwd2, name: name, email: joinEmail};

        // 비암호화
        //const data = { passwd: passwd2, name: name, email: email2};
        console.log('데이타~~!!', data);
        if (await process_submit('/api/member/join', data) > 0) {

            alert('회원가입을 축하합니다');
            location.href = '/';
        } else {
            // console.log(process_submit('/api/member/join', data))
            if (await process_submit('/api/member/join', data) == -1) {

                alert('이미 가입된 이메일입니다!');
            }
        }


    };

    //const data = {userid: userid, name: name, passwd:await hshpwd };
    const handlelogin = async () => {
        const data = {email: email, passwd: passwd};
        const  {error} = await signIn('email-passwd-credentials', {
            email,
            passwd,
            redirect: false
        });
        console.log('signin error : ', await error);
        if (error) { // 에러 발생시 - 인증 실패시
            alert('로그인 실패');
            console.log(error);

        } else {
            alert('로그인');
            location.href = '/myinfo';
        }


     };


    const tomorrow = new Date().setDate(new Date().getDate() + 1);

    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);
    const handleShowJoin = () => {
        setShowLogin(false);
        setShowJoin(true);
    };
    const handleCloseJoin = () => setShowJoin(false);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    return (
        <>
        <div className='border-bottom border-2 border-primary bg-white'
             style={{position: "relative", top: 0, width: "100%"}} id='navWrapper'>
            <Container fluid='xxl'>
                <Row className='title'>
                    <Col md={{ span: 1 }} style={{textAlign: "center"}}>
                        <NavLink href='/'>
                            Temfo,
                        </NavLink>
                    </Col>
                    <Col md={{ span: 5 }} style={{textAlign: "right"}}>
                        <Link href='/region'>
                            <NavLink style={{marginTop: "0.2%"}}>
                                <HiOutlineMapPin style={{marginTop: "-2%"}} />지역
                            </NavLink>
                        </Link>
                    </Col>
                    <Col md={{ span: 5 }} style={{textAlign: "left"}}>
                        <>
                            <Button className="calbtn" onClick={handleShow}>일정<BsCalendar style={{marginTop: "-13%"}} /></Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>날짜 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="cal">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={onChange}
                                        inline
                                        startDate={startDate}
                                        endDate={endDate}
                                        minDate={tomorrow}
                                        monthsShown={2}
                                        selectsRange
                                        dateFormat="yyyy-MM-dd"
                                        locale={ko}
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        선택
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </Col>
                    <Col md={{ span: 1 }} style={{textAlign: "center"}}>
                            <>
                               <span>Hi!{session.user.email}</span>
                                <Button className="calbtn" onClick={handleShowLogin}>
                                    <CiUser />
                                </Button>
                                <Modal show={showLogin} onHide={handleCloseLogin}>
                                    <Modal.Header>
                                        <Modal.Title>로그인</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Control className="mb-3"
                                                              type="email"
                                                              value={email}
                                                              placeholder="이메일"
                                                              autoFocus
                                                              onChange={e => handleInput(setEmail, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="password"
                                                              value={passwd}
                                                              placeholder="비밀번호"
                                                              autoFocus
                                                              onChange={e => handleInput(setPasswd, e)}
                                                />
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button type="button" variant="primary" onClick={handlelogin}>
                                            로그인
                                        </Button>
                                        <Button type="button" variant="secondary" onClick={handleShowJoin}>
                                            회원가입
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                                <Modal show={showJoin} onHide={handleCloseJoin}>
                                    <Modal.Header>
                                        <Modal.Title>회원가입</Modal.Title>
                                    </Modal.Header>
                                    {showJoin && (
                                  <>
                                    <Modal.Body>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Control className="mb-3"
                                                              type="text"
                                                              placeholder="이름"
                                                              autoFocus
                                                              onChange={e => handleInput(setName, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="email"
                                                              placeholder="이메일"
                                                              autoFocus
                                                              onChange={e => handleInput(setEmail2, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="password"
                                                              placeholder="비밀번호"
                                                              autoFocus
                                                              onChange={e => handleInput(setPasswd2, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="password"
                                                              placeholder="비밀번호 확인"
                                                              autoFocus
                                                              onChange={e => handleInput(setRepasswd, e)}
                                                />
                                                <div style={{ color:"red",fontSize:"0.85em"}}>{passwdError}</div>
                                            </Form.Group>
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleCloseJoin}>
                                            취소
                                        </Button>
                                        <br />
                                        <Button variant="primary" onClick={handleJoin}>
                                            회원가입
                                        </Button>
                                    </Modal.Footer>
                                        </>
                                    )}
                                </Modal>
                            </>
                    </Col>
                </Row>
            </Container>
            <div className='navBorder'></div>
        </div>
    </>
    );
};

export default Nav;