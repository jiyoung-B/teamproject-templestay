import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, {useEffect, useState} from "react";
import axios from "axios";
import shortid from 'shortid'
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {AiFillLike} from "react-icons/ai";
import {getSession} from "next-auth/client";
import {NavLink} from "react-bootstrap";
import {BsCalendarHeartFill, BsFillStarFill} from "react-icons/bs";
import {MdTempleBuddhist} from "react-icons/md";
import {GoGlobe} from "react-icons/go";

export async function getServerSideProps(ctx) {
        let {lid ,str,end,epic = '1'} = ctx.query
        if(lid === undefined) lid = null;
        if(str === undefined) str = null;
        if(end === undefined) end = null;
        if(epic === undefined) epic = null;
        let sess = await getSession(ctx);
        let searchInfo;
        let result;
        // 세션 여부에 따라 email 값 분기
        let email;
        (sess?.user?.email !== undefined) ? email = sess.user.email : email = null

        if(lid === null && str === null && end === null) {
                let param = `?epic=${epic}`
                let url = `http://localhost:3000/api/editorpick/${param}`
                const res = await axios.get(url)
                result = res.data

        } else {
                // param 선언
                let searchParam = `?lid=${lid}&str=${str}&end=${end}`
                // URL
                let url = `http://localhost:3000/api/${searchParam}`
                const res = await axios.get(url)
                result = res.data
        }

        // likeData
        let likeData = null;

        if(email !== null) {
                let likeParam = `?email=${email}`
                let likeUrl = `http://localhost:3000/api/like/${likeParam}`
                const likeRes = await axios.get(likeUrl)

                likeData = likeRes.data
        }

        searchInfo = result
        return {props:{searchInfo, likeData, email}}
}

export default function Home({searchInfo,likeData, email}) {
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
        const handleMouseOver = (e,ADDR) => {
                if (ADDR) {
                        setAddr(ADDR)
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

        const toggleLike = (e,idx,pid) => {
                if(email !== null) {
                        let btnPid = e.target
                        let btnPidValue = btnPid.id
                        let index = e.target.dataset.key;
                        let likeInfo = [{email: email}, {btnPid: pid }]
                        let unlikeInfo = [{email: email},{btnPid: pid }]

                        if(likeOnoffArr[idx] === true)
                        {

                                const process_unLike = async (unlikeInfo) => {


                                        const cnt = await fetch('/api/unlike', {
                                                method: 'POST', mode: 'cors',
                                                body: JSON.stringify(unlikeInfo),
                                                headers: {'Content-Type': 'application/json'}
                                        }).then(res => res.json());
                                        let result = false;
                                        if(await cnt  === true) result = true


                                        return {result};
                                }

                                process_unLike(unlikeInfo).then(result => result).then(({result}) =>{
                                        if( result === true) {
                                                const newLikeOnoffArr = [...likeOnoffArr];
                                                newLikeOnoffArr[idx] = !newLikeOnoffArr[idx]
                                                setLikeOnoffArr(newLikeOnoffArr);
                                        }
                                })

                        }
                        else if(likeOnoffArr[idx] === false)
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
                                                newLikeOnoffArr[idx] = !newLikeOnoffArr[idx]
                                                setLikeOnoffArr(newLikeOnoffArr)
                                        }
                                })
                        }

                } else if(email === null){
                        alert('로그인해주세요!')
                }
        }


        return (
            <div className="bg-white" id="wrapper" style={{marginTop:'65px'}}>
                    <Container fluid>
                            <Row>
                                    <Col>
                                            <Row>
                                                    <Col>
                                                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                                                    <NavLink href={'/?epic=1'}> <AiFillLike
                                                                        className={"text-success fs-3"} key={shortid.generate()}/> </NavLink> </div>
                                                    </Col>
                                                    <Col>
                                                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                                                    <NavLink href={'/?epic=2'}> <MdTempleBuddhist
                                                                        className={"text-dark fs-3"} key={shortid.generate()}/> </NavLink> </div>

                                                    </Col>
                                                    <Col>
                                                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                                                    <NavLink href={'/?epic=3'}> <BsCalendarHeartFill
                                                                        className={"text-danger fs-3"} key={shortid.generate()}/> </NavLink> </div>
                                                    </Col>
                                                    <Col>
                                                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                                                    <NavLink href={'/?epic=4'}> <GoGlobe
                                                                        className={"fs-3"} style={{color:'0D6EFD'}} key={shortid.generate()}/> </NavLink> </div>
                                                    </Col>
                                            </Row>

                                    </Col>
                                    <Col></Col>
                            </Row>
                            <Row className="likeslist tpl align-top">
                                    <Col md={6} className={'scrollable-col' }style={{ height: '830px'}}>
                                            { (searchInfo.length > 0 ) ? (      searchInfo.map((program,idx) => (


                                                    <Row className="tpl border border-2 border-danger rounded-2" onMouseOver={(e) => handleMouseOver(e,program.ADDR)} style={{height: '190px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>

                                                                    <Col md={4} className={'d-flex justify-content-start'} style={{height:'100%'}} key={shortid.generate()}>
                                                                            <NavLink href={`/temple?id=${program.T_NAME}&pid=${program.PID}`} key={shortid.generate()}>
                                                                            <img src={program.P_PICLINK} alt="프로그램 이미지" width={'157px'} style={{ height:'100%',paddingTop:'13px',paddingBottom:'13px'}} key={shortid.generate()}/>
                                                                            </NavLink>
                                                                    </Col>

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
                                                                            <Col key={shortid.generate()}>{(() => {
                                                                                    switch (program.E_PICKTF) {
                                                                                            case 1:
                                                                                                    return (
                                                                                                        <p className={'text-start ps-5'} key={shortid.generate()}>
                                                                                                                <AiFillLike className={"text-success fs-3"} key={shortid.generate()}/>
                                                                                                        </p>
                                                                                                    );
                                                                                            case 2:
                                                                                                    return (
                                                                                                        <p className={'text-start ps-5'} key={shortid.generate()}>
                                                                                                                <MdTempleBuddhist className={"text-dark fs-3"} key={shortid.generate()}/>
                                                                                                        </p>
                                                                                                    );
                                                                                            case 3:
                                                                                                    return (
                                                                                                        <p className={'text-start ps-5'} key={shortid.generate()}>
                                                                                                                <BsCalendarHeartFill className={"text-danger fs-3"} key={shortid.generate()}/>
                                                                                                        </p>
                                                                                                    );
                                                                                            case 4:
                                                                                                    return (
                                                                                                        <p className={'text-start ps-5'} key={shortid.generate()}>
                                                                                                                <GoGlobe className={"fs-3"} style={{color:'0D6EFD'}} key={shortid.generate()}/>
                                                                                                        </p>
                                                                                                    );
                                                                                            default:
                                                                                                    return <p></p>;
                                                                                    }
                                                                            })()}
                                                                            </Col>
                                                                            <Col key={shortid.generate()}>
                                                                                    <div className={'me-0'} data-key={idx} data-id={program.PID} id={program.PID} onClick={(e) =>toggleLike(e,idx,program.PID)} style={{width:'48px',zIndex:'2',position: 'relative'}} className={'text-end pe-5'} key={shortid.generate()}>{(likeOnoffArr[idx]) ? (<FcLike className={"fs-3"} style={{zIndex:'-1',position: 'relative'}} />) : (<FcLikePlaceholder className={"fs-3"} style={{zIndex:'-2',position: 'relative'}} key={shortid.generate()} />)} </div>
                                                                            </Col>
                                                                            <Col>
                                                                                    <div key={shortid.generate()}>{
                                                                                            (program.REVIEWCNT >= 2000) ?
                                                                                                (<div><BsFillStarFill className={'text-warning'} /><BsFillStarFill className={'text-warning'} /><BsFillStarFill className={'text-warning'} /></div>)
                                                                                                : (program.REVIEWCNT >= 1000) ? (<div><BsFillStarFill className={'text-warning'} /><BsFillStarFill className={'text-warning'} /></div>)
                                                                                                : (program.REVIEWCNT >= 500) ? (<div><BsFillStarFill className={'text-warning'} /><BsFillStarFill className={'text-warning'} /></div>)
                                                                                                : (<div></div>)
                                                                                    }</div>
                                                                            </Col>
                                                                    </Row>

                                                            </Col>
                                                    </Row>


                                                )
                                            )) : (
                                                <Row className="tpl border border-2 border-danger rounded-2" style={{height: '150px',backgroundColor:'#FCF5EB'}} key={shortid.generate()}>
                                                        <p className={'h1'} key={shortid.generate()}>예약 가능한 프로그램이 없습니다.</p>
                                                </Row>
                                            )
                                            }
                                    </Col>
                                    <Col md={6} className={'media414'}>
                                            <div id={'map'} style={{ width:'870px', height:'830px'}}></div>
                                    </Col>
                            </Row>

                    </Container>

            </div>
        )
}