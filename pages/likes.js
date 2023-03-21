import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import { temples } from "./utils/temples";
import MyinfoCommon from "./layout/MyinfoCommon";

export default function Likes () {

    const [checkedState, setCheckedState] = useState(
        new Array(temples.length).fill(false)
    );

    const [userinfo, setUserInfo] = useState({
        name: [],
        program: [],
        price: [],
        details: [],
        response: [],
    });

    let handleOnChange = (position, e) => {
        if (checkedState.filter((i) => i).length >= 3 && e.target.checked) return;
        let updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        // 3개만 선택하도록 제한
        if (updatedCheckedState.filter(v => v).length >= 4) {
            return
        }

        setCheckedState(updatedCheckedState);

        // 체크박스에 체크된 데이터 가져오기
        const { value, checked } = e.target;
        const { name, program, price, details } = userinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                name: [...name, value],
                program: [...program],
                price: [...price],
                details: [...details],
                response: [...name, ...program, ...price, ...details, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                name: name.filter((e) => e !== value),
                program: program.filter((e) => e !== value),
                price: price.filter((e) => e !== value),
                details: details.filter((e) => e !== value),
                response: [...name.filter((e) => e !== value), ...program.filter((e) => e !== value), ...price.filter((e) => e !== value), ...details.filter((e) => e !== value)],
            });
        }
    };

    const [show, setShow] = useState(false);
    const handleShow = () => {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let count = 0;

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                count++;
            }
        });

        if (count <= 1) {
            alert('비교할 대상을 2개 이상 선택해주세요!')
            setShow(false);
        } else {
            setShow(true);
        }
    }
    const handleClose = () => setShow(false);

    let go2bk = () => {
        handleClose()
        location.href = '/book';
    };

    console.log(userinfo.response)

    function SelectCompareCnt(props) {
        // const comCnt = props.type;
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let comCnt = 0;

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                comCnt++;
            }
        });

        if (comCnt === 2) {
            return (
                <table style={{textAlign: "center", border: "1px solid #331904"}}>
                    <tr style={{height: "40px"}}>
                        <th>{String(userinfo.response[0]).split(',')[0]}</th>
                        <th>{String(userinfo.response[1]).split(',')[0]}</th>
                    </tr>
                    <tr style={{height: "500px"}}><td colSpan="3">지도</td></tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[1]}</td>
                        <td>{String(userinfo.response[1]).split(',')[1]}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[2]}</td>
                        <td>{String(userinfo.response[1]).split(',')[2]}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{String(userinfo.response[0]).split(',')[3]}</td>
                        <td>{String(userinfo.response[1]).split(',')[3]}</td>
                    </tr>
                    <tr className="gobkbtn">
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                    </tr>
                </table>
            );
        } else if(comCnt === 3) {
            return (
                <table style={{textAlign: "center", border: "1px solid #331904"}}>
                    <tr style={{height: "40px"}}>
                        <th>{String(userinfo.response[0]).split(',')[0]}</th>
                        <th>{String(userinfo.response[1]).split(',')[0]}</th>
                        <th>{String(userinfo.response[2]).split(',')[0]}</th>
                    </tr>
                    <tr style={{height: "500px"}}><td colSpan="3">지도</td></tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[1]}</td>
                        <td>{String(userinfo.response[1]).split(',')[1]}</td>
                        <td>{String(userinfo.response[2]).split(',')[1]}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[2]}</td>
                        <td>{String(userinfo.response[1]).split(',')[2]}</td>
                        <td>{String(userinfo.response[2]).split(',')[2]}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{String(userinfo.response[0]).split(',')[3]}</td>
                        <td>{String(userinfo.response[1]).split(',')[3]}</td>
                        <td>{String(userinfo.response[2]).split(',')[3]}</td>
                    </tr>
                    <tr className="gobkbtn">
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                    </tr>
                </table>
            );
        }
    }

    return (
        <main>
            <MyinfoCommon />
            <Container fluid>
                <Row className="lnm">
                    <Col className="likesmenu1 col-6">좋아요</Col>
                    <Col className="bar1 col-1">|</Col>
                    <Col className="infomenu1 col-5"><Link href='/myinfo'>내정보</Link></Col>
                </Row>
                <Row className="likesncom">
                    <Col className="temples col-9 offset-1" style={{fontSize: "25px"}}>좋아요를 누른 사찰</Col>
                    <Col>
                        <>
                            <Button variant="primary" className="combtn" onClick={handleShow}>비교하기</Button>
                            <Modal size="xl" show={show} onHide={handleClose}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>템플 스테이 비교</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="comtab">
                                    <SelectCompareCnt />
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </>
                    </Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <ul className="temples-list" style={{padding: "0"}}>
                            {temples.map(({ name, location, day, program, number }, index ) => {   // temples에서 정보 가져오기
                                return (
                                    <Row>
                                        <li key={index} className="temples-list-item">
                                            <Col className="col-3" style={{display: "flex", paddingLeft: "1%"}}>
                                                <Col className="col-5" style={{display: "flex", alignItems: "center"}}>
                                                    <Form.Check type="checkbox" className="checkbox" id={`custom-checkbox-${index}`} namd={name} value={name}
                                                                checked={checkedState[index]} onChange={ (e) => handleOnChange(index, e) }></Form.Check>
                                                    <img src="/img/temple.png" width="32" height="32" />
                                                </Col>
                                                <Col className="col-7" style={{display: "flex", alignItems: "center"}}>{name}</Col>
                                            </Col>
                                            <Col className="col-3">{location}</Col>
                                            <Col className="col-2">{day}</Col>
                                            <Col className="col-3">{program}</Col>
                                            <Col className="col-1">{number}</Col>
                                        </li>
                                    </Row>
                                )
                            } )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}