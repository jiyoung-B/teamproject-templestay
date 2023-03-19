import Layout from "./layout/Layout";
import ToIntro from "./layout/ToIntro";
import Nav from "./layout/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import React from "react";
import axios from "axios";
import * as PropTypes from "prop-types";

export async function getServerSideProps(ctx) {
        let {lid = '서울'} = ctx.query



        let param = `?lid=${lid}`
        let url = `http://localhost:3000/api/${param}`

        const res = await axios.get(url)
        let indexInfo = res.data



        return {props:{indexInfo}}

}

export default function Home({indexInfo}) {
    return (
        <div className="bg-white" id="wrapper">
                <Container fluid>
                        <Row style={{height: '100px'}}></Row>
                        <Row className="likeslist tpl align-top">
                                <Col>
                                        {indexInfo.map(program => (

                                            <Link href={`/temple?id=${program.T_NAME}&pid=${program.PID}`}>
                                                    <Row className="tpl border border-2 border-danger rounded-2" style={{height: '150px'}}>
                                                            <Col>
                                                                <img src={program.P_PICLINK} alt="프로그램 이미지" className={""} style={{width: '100%', height:'135px',paddingTop:'9px'}}/>
                                                            </Col>
                                                            <Col>
                                                                <p className={"text-center fs-6"}>{program.ADDR}</p>
                                                            </Col>
                                                            <Col>
                                                                 <p className={"text-center  fs-6"}>{program.P_STRDATE} ~ {program.P_ENDDATE}</p>
                                                            </Col>
                                                            <Col>
                                                                <p className={"text-center  fs-6"}>{program.P_NAME}</p>
                                                            </Col>
                                                    </Row>
                                            </Link>

                                        )
                                        )}
                                </Col>
                                <Col>
                                        <Row>
                                                <Link href={"/?lid=인천"}>인천</Link>
                                                <Link href={"/?lid=서울"}>서울</Link>
                                                <Link href={"/?lid=강원"}>강원</Link>
                                                <Link href={"/?lid=충남"}>충남</Link>
                                                <Link href={"/?lid=경기"}>경기</Link>
                                                <Link href={"/?lid=충북"}>충북</Link>
                                                <Link href={"/?lid=세종"}>세종</Link>
                                                <Link href={"/?lid=경북"}>경북</Link>
                                                <Link href={"/?lid=전북"}>전북</Link>
                                                <Link href={"/?lid=대구"}>대구</Link>
                                                <Link href={"/?lid=인천"}>광주</Link>
                                                <Link href={"/?lid=광주"}>전남</Link>
                                                <Link href={"/?lid=경남"}>경남</Link>
                                                <Link href={"/?lid=부산"}>부산</Link>
                                                <Link href={"/?lid=제주"}>제주</Link>
                                        </Row>
                                </Col>
                        </Row>

                </Container>

        </div>
    )
}


Home.getLayout = (page) => (
    <Layout meta={{title: 'Temfo, 홈'}}>
        <>
        <ToIntro style={{position: "fixed", top:0}}/>
        <Nav />
        </>
        {page}
    </Layout>
)