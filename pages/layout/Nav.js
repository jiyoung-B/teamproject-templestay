import {Container, Row, Col, NavLink, Button, Modal} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {ko} from "date-fns/locale";





const Nav = () => {

    const handlejoin = async () => {
        alert('회원가입을 축하합니다')

    };
    const handlelogin = async () => {
        const error = 0;

        if (error) { // 에러 발생시 - 인증 실패시
            alert('로그인에 실패했습니다');
        } else {
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
        <div className='border-bottom border-2 border-primary' id='navWrapper'>
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
                        <NavLink href='/login'>
                            <NavLink>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#loginModal"
                                        style={{border: "1px solid white", backgroundColor: "white"}}>
                                    <CiUser />
                                </button>
                            </NavLink>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
            <div className='navBorder'></div>
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
                                        <input type="email" className="form-control" id="email" placeholder="이메일주소"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-1 col-md-12">
                                        <input type="password" className="form-control" id="password" placeholder="비밀번호"/>
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
                                    <div className="mb-3 col-md-4">
                                        <input type="text" className="form-control" id="fname" placeholder="성"/>
                                    </div>
                                    <div className="mb-3 col-md-8">
                                        <input type="text" className="form-control" id="lname" placeholder="이름"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-md-12">
                                        <input type="email" className="form-control" id="email2" placeholder="이메일주소"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-5 col-md-12">
                                        <input type="password" className="form-control" id="password2" placeholder="비밀번호"/>
                                    </div>
                                </div>
                                <div className="mb-3 text-center" ><button type="button" className="btn col-md-10" style={{backgroundColor: '#240a0a',color:'white'}} onClick={handlejoin}>회원가입</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;