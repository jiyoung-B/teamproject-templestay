import Link from 'next/link'
import img from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Card from 'react-bootstrap/Card';
import {Button, CardGroup, NavLink} from "react-bootstrap";
import axios from "axios";

export async function getServerSideProps(ctx) {
    console.log('씨티엑스 ??', ctx);

    let url = `http://localhost:3000/api/editorpick?id=1`

    const res = await axios.get(url)
    const edPicks = await res.data[0];
    console.log('edPicks? [0]??', edPicks);

    return {props:{edPicks}}
}

const Intro = ({edPicks}) => {

    return (
        <>
            <Container fluid>
                <Row style={{marginTop:'160px'}}>
                    <Col md={{ span: 6, offset: 1 }}>
                       <img src="https://noms.templestay.com/images/TiImage/H/L/3806.png"  className="rounded" alt="intro_img_1" width={"100%"} height={550}/>
                    </Col>
                    <Col>
                        <p className={"fs-1 fw-bold text-end mb-0"} style={{marginTop:'250px', marginRight:'123px', color:'#E5BA26'}}>세계문화유산 불국사, 천 년의 향기</p>
                    </Col>
                </Row>
                <Row style={{marginTop:'160px'}}>
                    <Col md={5}>
                        <p className={"fs-1 fw-bold text-end mb-0"} style={{marginTop:'250px', color:'#666D8A'}}>남해 쪽빛바다가 보이는 절</p>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={{ span: 6 }}>
                        <img src="https://noms.templestay.com/images/TiImage/H/L/9826.png"  className="rounded" alt="intro_img_1" width={"100%"} height={550}/>
                    </Col>
                </Row>
                <Row style={{marginTop:'160px'}}>
                    <Col md={{ span: 6, offset: 1 }}>
                        <img src="https://noms.templestay.com/images/TiImage/H/L/924.png"  className="rounded" alt="intro_img_1" width={"100%"} height={550}/>
                    </Col>
                    <Col>
                        <p className={"fs-1 fw-bold text-start mb-0"} style={{marginTop:'250px', marginLeft:'45px', color:'#AA9345'}}>오롯이 내면과 마주하는 시간</p>
                    </Col>
                </Row>
                <Row style={{marginTop:'160px'}}>
                    <Col md={5}>
                        <p className={"fs-1 fw-bold text-end text-primary mb-0"} style={{marginTop:'250px'}}>몸과 마음에 쉼표를 찾다,</p>
                    </Col>
                    <Col md={1}></Col>
                    <Col md={{ span: 6 }}>
                        <img src="https://noms.templestay.com/images/TiImage/H/L/11330.png"  className="rounded" alt="intro_img_1" width={"100%"} height={550}/>
                    </Col>
                </Row>

                <Row style={{marginTop:'160px'}}>
                    <Col className="offset-1 editorpick">
                        <Row className="pt-5">
                            <h1 className="fw-bold text-secondary ps-4 mt-3" id="programTitle" >에디터픽</h1>
                            <Col className="offset-2" style={{maxHeight : "500px"}}>
                                <div className="row align-items-center mt-10" style={{ display: "flex", overflowX: "scroll", scrollSnapType: "x mandatory" }}>
                                    <Carousel cols={3} rows={1} gap={7} loop autoplay={3000}>
                                        {edPicks.map(ep => (
                                        <Carousel.Item interval={1000} >
                                        <div key={ep.PID} className="col" style={{width: "300px", Height: "300px"}}>
                                            <NavLink href={`/program?pid=${ep.PID}`}>
                                                <CardGroup style={{width: "300px", height: "300px"}}>
                                                    <Card className="h-100">
                                                    <Card.Img variant="top" src={ep.P_PICLINK} style={{width: "300px", minHeight: "200px"}}/>
                                                    <Card.Body style={{width: "300px", height: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"}}>
                                                        <Card.Text>
                                                           <h6> #{ep.T_NAME}</h6>
                                                        </Card.Text>
                                                        <Card.Text className="pr-3">
                                                            {ep.P_NAME}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                                </CardGroup>
                                           </NavLink>
                                            </div>
                                        </Carousel.Item>
                                        ))}
                                    </Carousel>
                                    </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <div className={'d-flex align-items-center justify-content-center'} style={{marginTop:'150px',marginBottom:'100px'}}>
                    <Button size="lg" ><Link href={'/'}><p className={'fs-2 px-2 mb-0'}>지금, 여기</p></Link></Button>
                </div>
            </Container>

        </>
    )
};

export default Intro