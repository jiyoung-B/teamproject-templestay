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
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {AiFillLike} from "react-icons/ai";
import {getSession} from "next-auth/client";
import {Button} from "react-bootstrap";

export async function getServerSideProps(ctx) {
        let {lid ,str,end} = ctx.query
        if(lid === undefined) lid = null;
        if(str === undefined) str = null;
        if(end === undefined) end = null;
        let sess = await getSession(ctx);

        // 세션 여부에 따라 email 값 분기
        let email;
        (sess?.user?.email !== undefined) ? email = sess.user.email : email = null

        // param 선언
        let searchParam = `?lid=${lid}&str=${str}&end=${end}`



        // URL
        let url = `http://localhost:3000/api/${searchParam}`
        const res = await axios.get(url)
        let result = res.data


        // likeData
        let likeData = null;

        if(email !== null) {
                let likeParam = `?email=${email}`
                let likeUrl = `http://localhost:3000/api/like/${likeParam}`
                const likeRes = await axios.get(likeUrl)

                likeData = likeRes.data
        }




        let searchInfo = result


        return {props:{searchInfo, likeData, email}}
}

export default function Home({searchInfo,likeData, email, session}) {
        let [addr,setAddr] =useState()

        const [likeOnoffArr, setLikeOnoffArr] = useState(Array(searchInfo.length).fill(false));


        if(email !== null) {
                useEffect(() => {
                        const updatedLikeOnoffArr = [...likeOnoffArr];
                        likeData.PID.forEach((pid) => {
                                const idx = searchInfo.findIndex((program) => program.PID === pid);
                                if (idx >= 0) {
                                        updatedLikeOnoffArr[idx] = true;
                                }
                        });
                        setLikeOnoffArr(updatedLikeOnoffArr);
                }, [likeData, searchInfo]);
        }


        // 마우스 오버에 따라 지도 변경
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


        const toggleLike = (e) => {
                if(email !== null) {
                        let btnPidValue = e.target.getAttribute('pid')
                        let index = e.target.getAttribute('value');
                        let likeInfo = [{email: email}, {btnPid: btnPidValue }]
                        let unlikeInfo = [{email: email},{btnPid: btnPidValue }]


                        if(likeOnoffArr[index] === true)
                        {

                                const process_unLike = async (unlikeInfo) => {


                                        const cnt = await fetch('/api/unlike', {
                                                method: 'POST', mode: 'cors',
                                                body: JSON.stringify(unlikeInfo),
                                                headers: {'Content-Type': 'application/json'}
                                        }).then(res => res.json());
                                        let result = false;
                                        if(await cnt  === true) result = true
                                        console.log(result)


                                        return {result};
                                }

                                process_unLike(unlikeInfo).then(result => result).then(({result}) =>{
                                        if( result === true) {
                                                const newLikeOnoffArr = [...likeOnoffArr];
                                                newLikeOnoffArr[index] = !newLikeOnoffArr[index]
                                                setLikeOnoffArr(newLikeOnoffArr);
                                        }
                                })

                        }
                        else if(likeOnoffArr[index] === false)
                        {
                                const process_Like = async (likeInfo) => {

                                        const cnt = await fetch('/api/plusLike', {
                                                method: 'POST', mode: 'cors',
                                                body: JSON.stringify(likeInfo),
                                                headers: {'Content-Type': 'application/json'}
                                        }).then(res => res.json());
                                        let result = false;
                                        if(await cnt  === true) result = true

                                        return {result};
                                }
                                process_Like(likeInfo).then(result => result).then(({result}) => {
                                        if( result === true) {
                                                const newLikeOnoffArr = [...likeOnoffArr];
                                                newLikeOnoffArr[index] = !newLikeOnoffArr[index]
                                                setLikeOnoffArr(newLikeOnoffArr)
                                        }
                                })
                        }


                } else if(email === null){
                        alert('로그인해주세요!')
                }
                }


        return (
        <div className="bg-white mt-3" id="wrapper">
                <Container fluid>

                        {/*<h1>당신의 이메일: {session.user.email}</h1>*/}
                        <Row className="likeslist tpl align-top">
                                <Col>
                                        { (searchInfo.length > 0 ) ? (      searchInfo.map((program,idx) => (


                                                        <Row className="tpl border border-2 border-danger rounded-2" onMouseOver={handleMouseOver} style={{height: '190px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>
                                                                <Link href={`/temple?id=${program.T_NAME}&pid=${program.PID}`} key={shortid.generate()}>
                                                                        <Col md={4} className={'d-flex justify-content-start'} style={{height:'100%'}} key={shortid.generate()}>
                                                                                <img src={program.P_PICLINK} alt="프로그램 이미지" style={{width: '100%', height:'100%',paddingTop:'13px',paddingBottom:'13px'}} key={shortid.generate()}/>
                                                                        </Col>
                                                                </Link>
                                                                <Col md={8} style={{height:'100%'}} key={shortid.generate()}>
                                                                        <Row style={{height:'140px'}} key={shortid.generate()}>
                                                                                <Col key={shortid.generate()}>
                                                                                        <Row key={shortid.generate()}>
                                                                                                <p className={"mb-0 pb-3 text-secondary text-center fw-bold fs-5"} key={shortid.generate()}>{program.P_NAME.substring(0, program.P_NAME.indexOf("[")) + program.P_NAME.substring(program.P_NAME.indexOf("]") + 1)}</p>
                                                                                        </Row>
                                                                                        <Row className={"pb-2"} key={shortid.generate()}>
                                                                                                <Col md={6} key={shortid.generate()}>
                                                                                                        <p className={"mb-0 fw-semibold text-primary text-center fs-6"} key={shortid.generate()}>{program.T_NAME}</p>
                                                                                                </Col>
                                                                                                <Col md={6} key={shortid.generate()}>
                                                                                                        <p className={"mb-0 text-start"} style={{fontSize: '14px'}} key={shortid.generate()}>{program.P_STRDATE} ~ {program.P_ENDDATE}</p>
                                                                                                </Col>
                                                                                        </Row>
                                                                                        <Row key={shortid.generate()}>
                                                                                                <p className={"mb-0 text-center ADDR"} style={{fontSize: '14px'}} key={shortid.generate()}>{program.ADDR}</p>
                                                                                        </Row>
                                                                                </Col>
                                                                        </Row>
                                                                        <Row key={shortid.generate()}>
                                                                                <Col key={shortid.generate()}>{ (program.E_PICKTF === 1) ?
                                                                                    <p className={'text-start ps-5'} key={shortid.generate()}>
                                                                                                <AiFillLike
                                                                                                    className={"text-success fs-3"} key={shortid.generate()}/></p> : <p></p> }
                                                                                </Col>
                                                                                <Col key={shortid.generate()}>
                                                                                        <div value={idx} pid={program.PID} onClick={toggleLike} style={{width:'48px',zIndex:'2',position: 'relative'}} className={'text-end pe-5'}>{(likeOnoffArr[idx]) ? (<FcLike className={"fs-3"} style={{zIndex:'-1',position: 'relative'}} key={shortid.generate()} />) : (<FcLikePlaceholder className={"fs-3"} style={{zIndex:'-2',position: 'relative'}} key={shortid.generate()} />)} </div>
                                                                                </Col>
                                                                        </Row>

                                                                </Col>
                                                        </Row>


                                            )
                                        )) : (
                                                    <Row className="tpl border border-2 border-danger rounded-2" style={{height: '150px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>
                                                           <p className={'h1'} key={shortid.generate()}>프로그램이 없습니다.</p>
                                                    </Row>
                                        )
                                          }
                                </Col>
                                <Col>
                                        <div id={'map'} style={{ width:'928px', height:'830px',position:"fixed",top:"129",left:"965",zIndex:"1"}}></div>
                                </Col>
                        </Row>

                </Container>

        </div>
    )
}