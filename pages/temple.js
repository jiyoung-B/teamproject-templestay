import Carousel from 'react-bootstrap/Carousel';
import {Button, Card, Col, Container, NavLink, Row} from "react-bootstrap";
import axios from 'axios'
import {useEffect} from "react";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import shortid from "shortid";
import {handleImgError} from "../components/Util";

// 캐러셀에 들어갈 사진은 서버에서 불러온 다음에 제공되어야 한다. 만약 그렇지 않으면 페이지가 로드된 후에 다운받기 때문에 잘린 이미지나,
// 빈 화면이 표시 될 수 있다.

export async function getServerSideProps(ctx) {

    let {id, pid = null} = ctx.query

    let param = `?id=${id}`
    let url = `http://localhost:3000/api/temple${param}`

    const res = await axios.get(url)

    let {temple, templePic, distinctProPic} = await res.data;

    return {props:{temple,templePic,distinctProPic,pid}}
}


// css 단위 변수
const unit = 28

export default function temple ({temple,templePic,distinctProPic,pid}) {

    useEffect(() => {
        const script = document.createElement('script');

        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=89da95ceb6fd3e9c3e590a9f8786d5e8&libraries=services&autoload=false`;

        document.head.appendChild(script);

        const onLoadKakaoMap = () => {
            kakao.maps.load(() => {
                let mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption);

                let geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(temple[0].ADDR, function(result, status) {

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
                    }
                });
            });
        };
        script.addEventListener('load', onLoadKakaoMap);
    }, []);

    return(
        <div id="templeWrapper">
            <div id="carouselWrapper" style={{marginTop:`${unit*2}px`}}>
                <div id="carouseContainer">
                    <Carousel>
                        {templePic.map(pic => (
                            <Carousel.Item key={shortid.generate()}>
                                <img
                                    className="d-block w-100"
                                    src={pic.T_PICTURE}
                                    onError={handleImgError}
                                    key={shortid.generate()}
                                    alt="First slide"
                                    height="800px"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>
            </div>

            <div id="contentWrapper" style={{marginTop:`${unit*4}px`}}>
                <div id="contentContainer">
                    <h1 className="fw-bold text-primary ps-4 mb-1"
                        id="contentTitle" key={shortid.generate()} >{temple[0].T_NAME}</h1>
                    <p className={'mb-0 text-primary fs-2 ps-4'}>{temple[0].T_COPY}</p>
                    <p className="fs-4 pt-1 ps-4 " style={{marginTop:`${unit*1}px`}}
                       id="content" >
                        {temple[0].T_DES}
                    </p>
                </div>
            </div>

            <div className="bg-light border-top border-bottom border-1 border-primary"style={{marginTop:`${unit*4}px`}} id="mapWrapper">
                <Container id="mapContainer">
                    <Row id="mapRow">

                        <Col sm={4}>
                            <div className="mapTextWrapper ">
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <p className="fs-4 text-center fw-bold">오시는길</p>
                                <p className="fs-5 text-center fw-bold" key={temple[0].ADDR}>{temple[0].ADDR}</p>
                                <p className="fs-5 text-center fw-bold" key={temple[0].T_PHONE}>{temple[0].T_PHONE}</p>
                            </div>

                        </Col>
                        <Col sm={8}>
                            <div id="mapWrap" key={'mapWrap'}>
                                <div style={{width: '100%', height: '600px'}} id='map' key={'map'} />
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>

            <div style={{marginTop:`${unit*5}px`}} id="programWrapper">

                <div style={{marginBottom:`${unit*5}px`}} id="programContainer">
                    <h1 className="fw-bold text-secondary ps-4" id="programTitle">프로그램</h1>
                    <Container style={{marginTop:`${unit}px`}} id={'cardContainer'}>
                        <Row>
                            {
                                distinctProPic.map((program)=>(
                                <Col md={4} className={pid === program.PID ? 'border border-2 border-danger' : ''} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>
                                    <Card style={{ width: '100%' }} key={shortid.generate()}>
                                        <Card.Img variant="top" src={program.P_PICLINK} onError={handleImgError} style={{height: '280px'}} key={shortid.generate()}/>
                                        <Card.Body key={shortid.generate()}>
                                            <Card.Title style={{height:`70px`}} key={shortid.generate()}>{program.P_NAME}
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
        </div>
    )
}
temple.getLayout = (page) => (
    <Layout meta={{title: '사찰 페이지'}}>
        <Nav />
        {page}
    </Layout>
)