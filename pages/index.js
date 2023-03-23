import Layout from "./layout/Layout";
import ToIntro from "./layout/ToIntro";
import Nav from "./layout/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import axios from "axios";
import shortid from 'shortid'
import * as PropTypes from "prop-types";
import Myinfo from "./myinfo";
import {FcLikePlaceholder} from "react-icons/fc";
import {AiFillLike} from "react-icons/ai";

export async function getServerSideProps(ctx) {
        let {lid ,str = '2023-03-30',end} = ctx.query
        if(lid === undefined) lid = null;
        if(str === undefined) str = null;
        if(end === undefined) end = null;

        // param 선언
        let param = `?lid=${lid}&str=${str}&end=${end}`

        // URL
        let url = `http://localhost:3000/api/${param}`
        const res = await axios.get(url)
        let result = res.data
        let searchInfo = result


        return {props:{searchInfo}}
}

export default function Home({searchInfo, session}) {
        console.log('홈홈'+session);
        let [addr,setAddr] =useState()

        const handleMouseOver = (e) => {
                const addrElement = e.target.querySelector('.ADDR');
                if (addrElement) {
                        const text = addrElement.textContent;
                        setAddr(text) // ADDR 클래스를 가진 요소의 텍스트 정보
                }
        };

        useEffect(() => {


                const script = document.createElement('script');

                script.async = true;
                script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=89da95ceb6fd3e9c3e590a9f8786d5e8&libraries=services&autoload=false`;
                script.id = 'mapScript'
                document.head.appendChild(script);

                const onLoadKakaoMap = () => {
                        kakao.maps.load(() => {
                                let mapContainer = document.getElementById('map'), // 지도를 표시할 div
                                    mapOption = {
                                            center: new kakao.maps.LatLng(36.5632751279698, 127.917213230085), // 지도의 중심좌표
                                            level: 12 // 지도의 확대 레벨
                                    };
                                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                                let map = new kakao.maps.Map(mapContainer, mapOption);

                                let geocoder = new kakao.maps.services.Geocoder();
                                // 주소로 좌표를 검색합니다
                                geocoder.addressSearch(addr, function(result, status) {

                                        // 정상적으로 검색이 완료됐으면
                                        if (status === kakao.maps.services.Status.OK) {
                                                let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                                                // 결과값으로 받은 위치를 마커로 표시합니다
                                                let marker = new kakao.maps.Marker({
                                                        map: map,
                                                        position: coords
                                                });

                                                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                                                map.setCenter(coords);

                                                // script 태그 삭제
                                                const scriptTag = document.getElementById('mapScript');
                                                scriptTag.remove();
                                        }
                                });

                        });
                };
                script.addEventListener('load', onLoadKakaoMap);
        }, [addr]);

        return (
        <div className="bg-white" id="wrapper">
                <Container fluid>
                        <h1>당신의 이메일: {session.user.email}</h1>
                        <Row  style={{height: '100px'}} className={'fixed-top'}>
                                <Col>
                                        <Link href={"/?lid=인천"}>인천</Link>
                                        <Link href={"/?lid=서울"}>서울</Link>
                                        <Link href={"/?lid=강원"}>강원</Link>
                                        <Link href={"/?lid=충남"}>충남</Link>
                                        <Link href={"/?lid=경기"}>경기</Link>
                                </Col>
                                <Col>
                                        <Link href={"/?lid=충북"}>충북</Link>
                                        <Link href={"/?lid=세종"}>세종</Link>
                                        <Link href={"/?lid=경북"}>경북</Link>
                                        <Link href={"/?lid=전북"}>전북</Link>
                                        <Link href={"/?lid=대구"}>대구</Link>
                                </Col>
                                <Col>
                                        <Link href={"/?lid=인천"}>광주</Link>
                                        <Link href={"/?lid=광주"}>전남</Link>
                                        <Link href={"/?lid=경남"}>경남</Link>
                                        <Link href={"/?lid=부산"}>부산</Link>
                                        <Link href={"/?lid=제주"}>제주</Link>
                                </Col>

                        </Row>
                        <Row className="likeslist tpl align-top">
                                <Col>
                                        { (searchInfo.length > 0 ) ? (      searchInfo.map((program) => (

                                                <Link href={`/temple?id=${program.T_NAME}&pid=${program.PID}`} key={shortid.generate()}>
                                                        <Row className="tpl border border-2 border-danger rounded-2" onMouseOver={handleMouseOver} style={{height: '190px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>
                                                                <Col md={4} className={'d-flex justify-content-start'} style={{height:'100%'}} key={shortid.generate()}>
                                                                        <div style={{width:'100%',borderRadius: '50%',overflow:'hidden'}}>
                                                                                <img src={program.P_PICLINK} alt="프로그램 이미지" className={"rounded"} style={{width: '100%', height:'100%',paddingTop:'13px',paddingBottom:'13px'}} key={shortid.generate()}/>
                                                                        </div>
                                                                </Col>
                                                                <Col md={8} style={{height:'100%'}} key={shortid.generate()}>
                                                                        <Row style={{height:'140px'}}>
                                                                                <Col>
                                                                                        <Row>
                                                                                                <p className={"mb-0 pb-3 text-secondary text-center fw-bold fs-5"} key={shortid.generate()}>{program.P_NAME.substring(0, program.P_NAME.indexOf("[")) + program.P_NAME.substring(program.P_NAME.indexOf("]") + 1)}</p>
                                                                                        </Row>
                                                                                        <Row className={"pb-2"}>
                                                                                                <Col md={6}>
                                                                                                        <p className={"mb-0 fw-semibold text-primary text-center fs-6"} key={shortid.generate()}>{program.T_NAME}</p>
                                                                                                </Col>
                                                                                                <Col md={6}>
                                                                                                        <p className={"mb-0 text-start"} style={{fontSize: '14px'}} key={shortid.generate()}>{program.P_STRDATE} ~ {program.P_ENDDATE}</p>
                                                                                                </Col>
                                                                                        </Row>
                                                                                        <Row>
                                                                                                <p className={"mb-0 text-center ADDR"} style={{fontSize: '14px'}} key={shortid.generate()}>{program.ADDR}</p>
                                                                                        </Row>
                                                                                </Col>
                                                                        </Row>
                                                                        <Row>
                                                                                <Col>{ (program.E_PICKTF === 1) ?
                                                                                    <p className={'text-start ps-5'}>
                                                                                                <AiFillLike
                                                                                                    className={"text-success fs-3"}/></p> : <p></p> }
                                                                                </Col>
                                                                                <Col>
                                                                                        <p className={'text-end pe-5'}><FcLikePlaceholder className={"text-danger fs-3"} /></p>
                                                                                </Col>
                                                                        </Row>



                                                                </Col>
                                                        </Row>
                                                </Link>

                                            )
                                        )) : (
                                                    <Row className="tpl border border-2 border-danger rounded-2" style={{height: '150px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>
                                                           <p className={'h1'} key={shortid.generate()}>프로그램이 없습니다.</p>
                                                    </Row>
                                        )
                                          }
                                </Col>
                                <Col>
                                        <div id={'map'} style={{ width:'50%', height:'830px',position:"fixed",top:"129",left:"965",zIndex:"0"}}></div>
                                </Col>
                        </Row>

                </Container>

        </div>
    )
}
