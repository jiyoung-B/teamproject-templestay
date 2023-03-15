import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";

const unit = 28

const Program = () => {

    return(
        <div style={{marginTop:`${unit*2}px`}} id={'programWrapper'}>

            <div id={'titleWrapper'}>
                <h3 className={"text-primary ps-4"}>[갑사] 당일 템플스테이(단체 10명 이상 하루 체험)</h3>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'imgWrapper'}>
                <div id="carouseContainer">

                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://noms.templestay.com/images//RsImage/L_2231.png?timestamp=0"
                                alt="First slide"
                                height="800px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://noms.templestay.com/images//RsImage/L_10908.png"
                                alt="Second slide"
                                height="800px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="http://noms.templestay.com/images//RsImage/L_10909.png"
                                alt="Third slide"
                                height="800px"
                            />
                        </Carousel.Item>
                    </Carousel>

                </div>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'selectWrapper'}>

                <Container id={'selectContainer'}>
                    <Row className={'d-flex justify-content-center'}>
                        <Col lg={4}>
                            <Container>
                                <Row>
                                    <Col><p className={'text-center m-0 fs-3 text-primary'}>일정 <BsCheck2 className={"mb-2"}/></p></Col>
                                    <Col><p className={'text-center m-0 fs-3 text-primary'}>인원 <BsCheck2 className={"mb-2"}/></p></Col>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div id={'priceWrapper'}>

                <Container>
                    <Row>
                        <Col><p className={'text-end pt-2 m-0'}>2023.03.02~2023.03.04</p></Col>
                        <Col>
                            <Container>
                                <Row>
                                    <Col><p className={'text-center pt-2 m-0'}>(2박) 2인</p></Col>
                                    <Col><p className={'text-center pt-2 m-0'}>70,000 원</p></Col>
                                </Row>
                            </Container>
                        </Col>
                        <Col><p className={'text-center m-0 fs-3 text-primary'}><BsCheck2 className={"mb-2"}/>예약하기</p></Col>
                    </Row>
                </Container>

            </div>
            <div id={'priceInfoWrapper'}>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={11}>
                            <p className={'mb-2 fs-3 text-primary'}>참가비용</p>
                            <div id={'priceTableContainer'}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>구 분</th>
                                        <th>성인</th>
                                        <th>중고생</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>당일형</td>
                                        <td>30,000원</td>
                                        <td>30,000원</td>
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div  style={{marginTop:`${unit*4}px`}} id={'contentWrapper'}>
                <div id={'contentContainer'}>
                    <p className="fs-3 fw-bold text-secondary">프로그램 소개</p>
                    <p>당일형
                        학교, 기업, 동호화, 모임 등 단체에서 진행하는 문화행사 일정의 일환으로 10명

                        이상의 참가자를 대상으로 당일 최소 2시간부터 최대 5시간 동안 사찰의 전통

                        문화를 체험 할 수 있습니다.

                        참가비는 3만원부터 시작합니다.

                        * 10인 이상시에만 진행합니다.

                        * 원하는 프로그램이 있으면 맞춤형으로 진행 가능 합니다.

                    </p>
                </div>
            </div>
            <div style={{marginTop:`${unit*2}px`}} id={'scheduleWrapper'}>
                <Container id={'scheduleContainer'}>
                    <Row>
                        <Col md={3}>
                            <p className={'fs-5 fw-bold'}>프로그램 일정</p>
                            <p>기타 코멘트</p>
                        </Col>
                        <Col md={9}>
                            <p className={'fs-5 fw-bold'}>원하는 날</p>
                            <Table>
                                <thead>
                                <tr>
                                    <th>시작시간</th>
                                    <th>일정명</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>10:00~11:30</td>
                                    <td>보물투어</td>
                                </tr>
                                <tr><td>11:30~12:30</td><td>점심공양</td></tr>
                                <tr><td>12:30~14:00</td><td>용문폭포 걷기 명상</td></tr>
                                <tr><td>14:00~15:00</td><td>108 여의보주 만들기</td></tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{marginTop:`${unit*2}px`, marginBottom:`${unit*5}px`}} id={'otherProWrapper'}>

                <div id="programContainer">
                    <p className={'fs-3 fw-bold text-secondary'} id="programTitle">다른 프로그램</p>
                    <Container style={{marginTop:`${unit*2}px`}}>
                        <Row>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="http://noms.templestay.com/images//RsImage/L_10908.png" style={{height: '280px'}}/>
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] 당일 템플스테이(단체 10명 이상 하루 체험)
                                    </Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="http://noms.templestay.com/images//RsImage/L_11381.png" style={{height: '280px'}} />
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] 주말 휴일 템플스테이</Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="http://noms.templestay.com/images//RsImage/L_2409.png" style={{height: '280px'}} />
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] [2023 문화가있는날] 템플스테이</Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                        </Row>
                    </Container>
                </div>

            </div>

        </div>


    )

}


export default Program