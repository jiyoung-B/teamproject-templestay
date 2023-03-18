import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, NavLink, Row, Table} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import axios from "axios";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import Likes from "./likes";
import shortid from 'shortid'
import Link from "next/link";
//shortid.generate()


export async function getServerSideProps(ctx) {

    let {pid} = ctx.query

    let param = `?pid=${pid}`
    let url = `http://localhost:3000/api/program${param}`

    const res = await axios.get(url)

    let proData = await res.data;

    return {props:{proData}}
}


export default function Program ({proData}) {
    const unit = 28

    return(
        <div className={'container'} style={{marginTop:`${unit*2}px`}} id={'programWrapper'}>

            <div id={'titleWrapper'}>
                <h3 className={"text-primary ps-4"}>{proData[0][0].P_NAME}</h3>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'imgWrapper'}>
                <div id="carouseContainer">

                    <Carousel>

                        {proData[1].map(pic => (
                            <Carousel.Item key={shortid.generate()}>
                                <img
                                className="d-block w-100"
                                src={pic}
                                alt="First slide"
                                height="800px"
                                key={shortid.generate()}
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
                            <span className={'fs-3 me-3 text-primary'}>참가비용</span> <span className={'ms-5 text-danger'}>{proData[0][0].P_CAUTION}</span>
                            <div className={'mt-2'} id={'priceTableContainer'}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>구 분</th>
                                        {proData[2].map(clas =>(
                                            <th key={shortid.generate()}>{clas.PR_CLASS}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{proData[2][0].DIVISION}</td>
                                        {proData[2].map(pri =>(
                                            <td key={shortid.generate()}>{pri.PRICE}</td>
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
                    <p> <span className={'text-warning fs-4'}> {proData[2][0].DIVISION}</span>&nbsp;{proData[0][0].P_INTRO}</p>
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
                        {proData[4].map(day => (
                            <Row key={shortid.generate()}>

                                <Col key={shortid.generate()}>
                                    <p className={'fs-5 fw-bold'} key={shortid.generate()}>{day.P_DAY}</p>

                                    <Table key={shortid.generate()}>
                                        <thead key={shortid.generate()}>
                                        <tr key={shortid.generate()}>
                                            <th style={{width:'50%'}} key={shortid.generate()}>시작시간</th>
                                            <th key={shortid.generate()}>일정명</th>
                                        </tr>
                                        </thead>
                                        <tbody key={shortid.generate()}>

                                        {day.P_INFO.map(sch => (
                                            <tr key={shortid.generate()}>
                                                <td style={{width:'50%'}} key={shortid.generate()}>{sch.P_TIME}</td>
                                                <td key={shortid.generate()}>{sch.P_CONTENT}</td>
                                            </tr>
                                        ))}

                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        )
                        )}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{marginTop:`${unit*2}px`, marginBottom:`${unit*5}px`}} id={'otherProWrapper'}>

                <div id="programContainer">
                    <p className={'fs-3 fw-bold text-secondary'} id="programTitle">다른 프로그램</p>
                    <Container style={{marginTop:`${unit}px`}} id={'cardContainer'}>
                        <Row>
                            {proData[5].map(program => (
                                <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>
                                    <Card style={{ width: '100%' }} key={shortid.generate()}>
                                        <Card.Img variant="top" src={program.P_PICLINK} style={{height: '280px'}} key={shortid.generate()}/>
                                        <Card.Body key={shortid.generate()}>
                                            <Card.Title style={{height:`70px`}} key={shortid.generate()}>
                                                {program.P_NAME}
                                            </Card.Title>
                                            <Button variant="primary" key={shortid.generate()}><NavLink href={`/program?pid=${program.PID}`} key={shortid.generate()}>예약하러 가기</NavLink></Button>
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
Program.getLayout = (page) => (
    <Layout meta={{title: '프로그램 페이지'}}>
        <Nav />
        {page}
    </Layout>
)