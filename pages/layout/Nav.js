import {Container, Row, Col, NavLink, Button, Modal} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale";
import {handleInput, check_captcha, hashPassword, process_submit, comparePasswd} from "../../module/Utils";
import {error} from "next/dist/build/output/log";
import {getSession, signIn, useSession} from "next-auth/react";
import axios from "axios";

const Nav = () => {

    const [passwd2, setPasswd2,] = useState('');
    const [repasswd, setRepasswd] = useState('');
    const [name, setName] = useState('');
    const [email2, setEmail2] = useState('');
    const [passwdError, setPasswdError] = useState('');


    const handlejoin = async () => {

        if (passwd2 !==repasswd){
            setPasswdError('비밀번호가 일치하지 않습니다!');
            return ;
        } else {
            setPasswdError('');
        }
        // 암호화시
        //let hshpwd2 = await hashPassword(passwd2); // 암호를 해시화 함
        //const data = { passwd: await hshpwd2, name: name, email: email2};

        // 비암호화
        const data = { passwd: passwd2, name: name, email: email2};
        console.log(data);
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

    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    const handlelogin = async () => {


            const data = {email: email, passwd: await passwd};

            const {error} = await signIn('email-passwd-credentials', {
                email, passwd,
                redirect: false
            });

            console.log('pg login -', await error);
            if (error) { // 에러 발생시 - 인증 실패시
                alert('로그인에 실패했습니다');
            } else {
                alert('로그인 되었습니다');
                location.href = '/';
            }

     };


    const tomorrow = new Date().setDate(new Date().getDate() + 1);

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                            <NavLink>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal"
                                        style={{border: "1px solid white", backgroundColor: "white"}}>
                                    <CiUser />
                                </button>
                            </NavLink>
                    </Col>
                </Row>
            </Container>
            <div className='navBorder'></div>
        </div>
    {/*login modal*/}
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="loginModalLabel">어서 오세요</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <input type="email" className="form-control" id="email" placeholder="이메일주소" onChange={e => handleInput(setEmail, e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-1 col-md-12">
                                <input type="password" className="form-control" id="password" placeholder="비밀번호" onChange={e => handleInput(setPasswd, e)}/>
                            </div>

                        </div>
                        <div className="mb-5 text-right position-relative">
                            <div className="position-absolute top-0 end-0"><a className="#"><span className="text-primary" style={{fontSize: '0.8em'}} >이메일/비밀번호</span></a></div>
                        </div>
                        <div className="mb-3 text-center" ><button type="button" className="btn col-md-10" style={{backgroundColor: 'saddlebrown', color: 'white'}} onClick={handlelogin}>로그인</button></div>
                        <div className="text-center"><button type="button" className="btn col-md-10" style={{backgroundColor:'#240a0a',color:'white'}} data-bs-toggle="modal" data-bs-target="#joinModal">회원가입</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    {/*Join Modal */}
    <div className="modal fade" id="joinModal" tabIndex="-1" aria-labelledby="joinModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-sm">
            <div className="modal-content">
                <div className="modal-header">
                    <h3 className="modal-title" id="loginModalLabel">회원가입</h3>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form>
                        {/* <div className="col-md-12"> */}
                        <div className="row">

                            <div className="mb-3 col-md-12">
                                <input type="text" className="form-control" id="name" placeholder="이름" onChange={e => handleInput(setName, e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <input type="email" className="form-control" id="email2" placeholder="이메일주소" onChange={e => handleInput(setEmail2, e)}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <input type="password" className="form-control" id="password2" placeholder="비밀번호" onChange={e => handleInput(setPasswd2, e)}/>
                            </div>
                            <div className="mb-3 col-md-12">
                                <input type="password" className="form-control" id="repasswd" placeholder="비밀번호확인" onChange={e => handleInput(setRepasswd, e)}/>
                            </div>
                            <div style={{ color:"red",fontSize:"0.85em"}}>{passwdError}</div>
                        </div>
                        <div className="mt-4 mb-3 text-center" ><button type="button" className="btn col-md-10" style={{backgroundColor: '#240a0a',color:'white'}} onClick={handlejoin}>회원가입</button></div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </>
    );
};

export default Nav;