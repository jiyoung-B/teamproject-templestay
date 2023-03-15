import {Container, Row, Col, NavLink} from 'react-bootstrap';
import { HiOutlineMapPin } from 'react-icons/hi2';
import { BsCalendar } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import Link from 'next/link';

const Nav = () => {
    return (
        <div className='border-bottom border-2 border-primary' id='navWrapper'>
            <Container fluid='xxl'>
                <Row className='title'>
                    <Col md={{ span: 2 }}>
                        <NavLink href='/'>
                            Temfo,
                        </NavLink>
                    </Col>
                    <Col md={{ span: 1, offset: 3 }}>
                        <Link href='/region'>
                            <NavLink>
                                <HiOutlineMapPin />지역
                            </NavLink>
                        </Link>
                    </Col>
                    <Col>
                        <Link href='/calendar'>
                            <NavLink>
                                일정<BsCalendar />
                            </NavLink>
                        </Link>
                    </Col>
                    <Col md={{ span: 1, offset: 4 }}>
                        <NavLink href='/login'>
                            <NavLink>
                                <CiUser />
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