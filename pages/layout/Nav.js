import {Col, Container, NavLink, Row} from "react-bootstrap";
import { HiOutlineMapPin } from 'react-icons/hi2';
import {BsCalendar} from "react-icons/bs";
import {CiUser} from "react-icons/ci";


const Nav = () => {
    return (
        <div className={"border-bottom border-2 border-primary"} id={"navWrapper"}>
            <Container fluid="xxl">
                <Row className="title">
                    <Col md={{span: 2}}><NavLink to='/'>Temfo,</NavLink></Col>
                    <Col md={{span: 1, offset: 3}}><NavLink to='/region'><HiOutlineMapPin />지역</NavLink></Col>
                    <Col><NavLink to='/calendar'> 일정<BsCalendar /></NavLink></Col>
                    <Col md={{span:1, offset: 4}}><NavLink to='/login'><CiUser /></NavLink></Col>
                </Row>
            </Container>
            <div className="navBorder"></div>
        </div>
    )
}

export default Nav;