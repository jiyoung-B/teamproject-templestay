import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import axios from "axios";

export async function getServerSideProps(ctx) {

    let {pid} = ctx.query

    let param = `?pid=${pid}`
    let url = `http://localhost:3000/api/program${param}`

    const res = await axios.get(url)

    let proData = await res.data;




    return {props:{proData}}
}


const Program = ({proData}) => {
    const unit = 28

    return(
        <div className={'container'} style={{marginTop:`${unit*2}px`}} id={'programWrapper'}>

            <div id={'titleWrapper'}>
                <h3 className={"text-primary ps-4"} key={proData[0][0].PID}>{proData[0][0].P_NAME}</h3>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'imgWrapper'}>
                <div id="carouseContainer">

                    <Carousel>

                        {proData[1].map(pic => (
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src={pic.P_PICLINK}
                                alt="First slide"
                                height="800px"
                                />
                            </Carousel.Item>
                        ))}
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
                            <span className={'fs-3 me-3 text-primary'} key={proData[0][0].PID}>참가비용</span> <span className={'ms-5 text-danger'} key={proData[0][0].PID}>{proData[0][0].P_CAUTION}</span>
                            <div className={'mt-2'}id={'priceTableContainer'}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>구 분</th>
                                        {proData[2].map(clas =>(
                                            <th>{clas.PRICECLASS}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{proData[2][0].DIVISION}</td>
                                        {proData[2].map(pri =>(
                                            <td>{pri.PRICE}</td>
                                        ))}
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
                    <p key={proData[0].PID}> <span className={'text-warning fs-4'} key={proData[0][0].PID}> {proData[0][0].P_CLASS}</span>&nbsp;{proData[0][0].P_INTRO}</p>
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
                    <Container style={{marginTop:`${unit}px`}} id={'cardContainer'}>
                        <Row>
                            {proData[3].map((program)=>(
                                <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }}>
                                    <Card style={{ width: '100%' }}>
                                        <Card.Img variant="top" src={program.P_PICLINK} style={{height: '280px'}}/>
                                        <Card.Body>
                                            <Card.Title style={{height:`70px`}}>{program.P_NAME}
                                            </Card.Title>
                                            <Button variant="primary">예약하러 가기</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </div>

            </div>

        </div>


    )

}


export default Program