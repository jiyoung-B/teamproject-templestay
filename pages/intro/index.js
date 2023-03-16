import Link from 'next/link'
import img from "next/image";
import Footer from "../layout/Footer";
import MyinfoCommon from "../layout/MyinfoCommon";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import IntroHead from "../layout/IntroHead";
import Home from "../index";
import Layout from "../layout/Layout";

const Intro = () => {

    return (
        <>
            <IntroHead />
            <Container fluid>
                <Row className="tpl2">
                    <Col className="introCard col-10 offset-1">
                        <Row className="tpl2">
                        <Col className="col-6"><img src="/img/sampleImg_1.png" alt="intro_img_1" width={"100%"} height={550}/></Col>

                        <Col className="col-5 ps-5">마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀밀마하반야바라밀마하반야바라밀마하반야바라밀밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀마하반야바라밀</Col>
                            </Row>
                    </Col>
                </Row>

            </Container>

            <div>
                중앙-소개
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
            </div>
            <div style={{width:1800}}>
                하단-에디터픽
                <ul style={{display: 'inline-block'}}>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                </ul>
            </div>
            <div>
                <img src="/img/sampleImg_1.png" alt="intro_img_1" width={1200} height={400}/>
                <Container fluid>
                    <Row className="fstr">
                        <Col className="col-5 offset-1">
                            <Col className="welcome">바꾸는중?</Col>

                        </Col>
                        <Col style={{textAlign: "right"}} className="buddhist col-5"><img src="/img/buddhist.png" /></Col>
                    </Row>
                </Container>
            </div>
            <Container fluid>
                <Row>
                    <Col className="temples col-11 offset-1" style={{fontSize: "25px"}}>좋아요를 누른 사찰</Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <Col className="col-1">(이미지)</Col>
                        <Col className="col-1">XX사</Col>
                        <Col className="col-3">주소</Col>
                        <Col className="col-2">날짜</Col>
                        <Col className="col-3">프로그램 이름</Col>
                        <Col className="col-1">인원 수</Col>
                    </Col>
                </Row>
            </Container>
            {/*<Footer />*/}

        </>
    )
}
Intro.getLayout = (page) => (
    <Layout meta={{title: 'Temfo, 인트로'}}>
        {page}
    </Layout>
)

// Intro.getLayout = (page) => <Footer>{page}</Footer>;

export default Intro