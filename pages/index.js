import Layout from "./layout/Layout";
import ToIntro from "./layout/ToIntro";
import Nav from "./layout/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import img from "next/image";
import React from "react";

export default function Home() {
    return (
        <div className="bg-white" id="wrapper">
            <title>Temfo,</title>
            <h1 style={{ paddingTop: "100px" }}></h1>
                <Container fluid>
                <Row>

                </Row>

                        <Row className="tpl">
                                <Col className="likeslist col-12">
                                        <Col className="col-6">
                                                <Row className="tpl">
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>
                                                        <Col className="likeslist col-10 offset-1 pb-5 mt-5 mb-5">
                                                                <Col className="col-2">(이미지)</Col>
                                                                <Col className="col-3">주소</Col>
                                                                <Col className="col-2">날짜</Col>
                                                                <Col className="col-3">프로그램 이름</Col>
                                                                <Col className="col-1">인원 수</Col>
                                                        </Col>


                                                </Row></Col>
                                        <Col className="col-6"><img src="/img/sampleImg_1.png" alt="intro_img_1" width={"90%"} height={"90%"}/></Col>

                                </Col>
                        </Row>


                </Container>

        </div>
    )
}


Home.getLayout = (page) => (
    <Layout meta={{title: 'Temfo, 홈'}}>
        <>
        <nav className="fixed-top" style={{ position: "fixed", width: "100%", top: "0", left: "0", right: "0", height: "100px",bottom: "80px" }}>
        <ToIntro />
        <Nav />
        </nav>
        </>
        {page}
    </Layout>
)