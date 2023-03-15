import {Container, Row, Col, NavLink, Button, Modal} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';
import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Nav = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState('');

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
                            <NavLink style={{paddingTop: "0.5%"}}>
                                <HiOutlineMapPin style={{marginTop: "-1.5%"}} />지역
                            </NavLink>
                        </Link>
                    </Col>
                    <Col md={{ span: 5 }} style={{textAlign: "left"}}>
                        {/*<Link href='/calendar'>
                            <NavLink>
                                일정<BsCalendar />
                            </NavLink>
                        </Link>*/}
                        <>
                            <Button className="calbtn" onClick={handleShow}>일정<BsCalendar style={{marginTop: "-10%"}} /></Button>
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>날짜 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="cal">
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy-MM-dd"
                                        language="ko"
                                    />
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setEndDate(date)}
                                        selectsEnd
                                        startDate={startDate}
                                        endDate={endDate}
                                        dateFormat="yyyy-MM-dd"
                                        language="ko"
                                    />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
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
                                        style={{border: "1px solid white", backgroundColor: "white"}}
                                ><CiUser /></button>
                            </NavLink>
                        </NavLink>
                    </Col>
                </Row>
            </Container>
            <div className='navBorder'></div>
        </div>
    );
};

export default Nav;