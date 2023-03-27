import {Container, Row, Col, NavLink, Button, Modal, Form, ToggleButton} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import React, {useEffect, useState} from "react";
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale";
import {handleInput, hashPassword, process_submit} from "../../models/Utils";
import {error} from "next/dist/build/output/log";
import {signIn, signOut} from "next-auth/client";
import axios from "axios";
import {useRouter} from "next/router";
import moment from 'moment';



// export async function getServerSideProps(ctx) {
//     //const {lid ,str, end} ={ctx.query.lid, ctx.query.str, ctx.query.end}
//     const [lid ,str, end] = [ctx.query.lid, ctx.query.str, ctx.query.end]
//
//     let params = ``;
//     let url = `http://localhost:3000/api/?email=${params}`;
//
//     const res = await axios.get(url);
//     const searchTemple = await res.data;
//     console.log('검색한절 : ', await searchTemple);
//
//     return {props : {searchTemple}}
// }


const Nav = ({props, menu, session, searchTemple}) => {


    const [passwd2, setPasswd2,] = useState('');
    const [repasswd, setRepasswd] = useState('');
    const [name, setName] = useState('');
    const [email2, setEmail2] = useState('');
    const [passwdError, setPasswdError] = useState('');
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');

    // 지역 radio button
    registerLocale("ko", ko);
    const [radioValue, setRadioValue] = useState(null);
    const radios = [
        { name: "인천", value: "인천"},
        { name: "서울", value: "서울"},
        { name: "강원", value: "강원"},
        { name: "충남", value: "충남"},
        { name: "경기", value: "경기"},
        { name: "충북", value: "충북"},
        { name: "세종", value: "세종"},
        { name: "경북", value: "경북"},
        { name: "전북", value: "전북"},
        { name: "대구", value: "대구"},
        { name: "광주", value: "광주"},
        { name: "전남", value: "전남"},
        { name: "경남", value: "경남"},
        { name: "제주", value: "제주"},
        { name: "부산", value: "부산"},
    ];

    // 회원가입
    const handleJoin = async () => {
        if (passwd2 !== repasswd){
            setPasswdError('비밀번호가 일치하지 않습니다!');
            return ;
        } else {
            setPasswdError('');
        }
        // 암호화시
        let hashpwd2 = await hashPassword(passwd2); // 암호를 해시화 함
        console.log('join 해쉬드 패스워드 ', hashpwd2)

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

    // 로그인
    const handlelogin = async (e) => {
        e.preventDefault();

        const data = {email: email, passwd: passwd};

        const  {error} = await signIn('email-passwd-credentials', {
            email,
            passwd,
            // ...data,
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

    // 로그아웃
    const handleSignOut = async () => {
            await signOut();
            alert('로그아웃 완료')
            location.href = '/'

    }



    //const tomorrow = new Date().setDate(new Date().getDate() + 1);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [show, setShow] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(tomorrow);

    // 여기 왜 이렇게?
    const handleClose = () => {
        setShow(false)
    };

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

    // 지역 및 날짜 선택
    const handleSelection = () => {
        let lid = radioValue;
        console.log('lid',radioValue)
        let str = moment(startDate).format('YYYY-MM-DD');
        let end = null;
        console.log('str',str)
        console.log('end',end)
        if(endDate !== null) {
            end = moment(endDate).format('YYYY-MM-DD');
        }

        console.log(`선택한 지역 및 날짜짜 : ${lid} ${str}~${end}`)

        location.href = `/?lid=${lid}&str=${str}&end=${end}`
    };


    return (

        <>
        <div className='border-bottom border-2 border-primary bg-white'
             style={{position: "relative", top: 0, width: "100%"}} id='navWrapper'>
            <Container fluid='xxl pt-2'>
                <Row className='title'>
                    <Col md={{ span: 3 }} style={{textAlign: "left"}}>
                        <NavLink href='/'>
                            Temfo,
                        </NavLink>
                    </Col>
                    <Col md={{sapn:6}} style={{textAlign: "center"}}>
                        <Row>
                            <Button className="calbtn" variant="transparent" onClick={handleShow}>
                                <Row>
                                    <Col md={{ span: 5 }} style={{textAlign: "right"}}>
                                        <HiOutlineMapPin className="calbtn"/> 지역
                                    </Col>
                                    <Col md={{ span: 5 }} style={{textAlign: "left"}}>
                                        일정<BsCalendar style={{marginTop: "-7%"}} />
                                    </Col>
                                </Row>
                            </Button>
                        <>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>지역 & 날짜 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Container fluid style={{textAlign: "center"}}>
                                        {radios.map((radio, idx) => (
                                            idx % 5 === 0 ? (
                                                <Row key={idx} >
                                                    {radios.slice(idx, idx + 5).map((radio, idx2) => (
                                                        <Col key={idx2}>
                                                            <ToggleButton
                                                                className="m-2"
                                                                id={`radio-${idx}-${idx2}`} // 각각의 버튼에 유일한 id 부여
                                                                type="radio"
                                                                variant="outline-primary"
                                                                name="radio"
                                                                value={radio.value}
                                                                checked={radioValue === radio.value}
                                                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                            >
                                                                <label htmlFor={`radio-${idx}-${idx2}`} style={{marginBottom: 0}}>
                                                                    {radio.name}
                                                                </label>
                                                            </ToggleButton>
                                                        </Col>
                                                    ))}
                                                </Row>
                                            ) : null
                                        ))}
                                    </Container>
                                    <br />
                                    <Row>
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
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                    <Button variant="primary" onClick={handleSelection}>
                                        선택
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                        </Row>
                    </Col>
                    <Col md={{ span: 3 }} style={{textAlign: "right"}}>
                            <>
                               <span>Hi!{session.name}</span>
                                <Button className="calbtn" onClick={handleShowLogin}>
                                    <CiUser />
                                </Button>
                                <Modal show={showLogin} onHide={handleCloseLogin}>

                                    {(session && session.name !== 'guest') ? (<>
                                        <Modal.Header>
                                            <Modal.Title>안녕하세요</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Form>
                                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                    <div>{session.name}님</div>
                                                </Form.Group>
                                            </Form>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button type="button" variant="primary" onClick={handleSignOut}>
                                                {/*onClick={() => signOut()}*/}
                                                로그아웃
                                            </Button>
                                            <NavLink href='/myinfo'>
                                            <Button type="button" variant="secondary">
                                                내정보
                                            </Button>
                                                </NavLink>
                                        </Modal.Footer>
                                    </>) : (<>
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
                                    </>)}


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
                                                              onChange={e => handleInput(setEmail2, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="password"
                                                              placeholder="비밀번호"
                                                              onChange={e => handleInput(setPasswd2, e)}
                                                />
                                                <Form.Control className="mb-3"
                                                              type="password"
                                                              placeholder="비밀번호 확인"
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