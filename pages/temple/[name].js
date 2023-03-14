// 캐러셀에 들어갈 사진은 서버에서 불러온 다음에 제공되어야 한다. 만약 그렇지 않으면 페이지가 로드된 후에 다운받기 때문에 잘린 이미지나,
// 빈 화면이 표시 될 수 있다.

// css 단위 변수
import Carousel from "react-bootstrap/Carousel";
import {Button, Col, Container, Card, Row} from "react-bootstrap";

const unit = 28

const temple = () => {

    return(
        <div id="templeWrapper">
            <div id="carouselWrapper" style={{marginTop:`${unit*2}px`}}>
                <div id="carouseContainer">

                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://noms.templestay.com/images/TiImage/H/L/7311.png"
                                alt="First slide"
                                height="800px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://noms.templestay.com/images/TiImage/H/L/7322.png"
                                alt="Second slide"
                                height="800px"
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://noms.templestay.com/images/TiImage/H/L/1372.png"
                                alt="Third slide"
                                height="800px"
                            />
                        </Carousel.Item>
                    </Carousel>

                </div>
            </div>

            <div id="contentWrapper" style={{marginTop:`${unit*5}px`}}>
                <div id="contentContainer">
                    <h1 className="fw-bold text-secondary ps-4"
                        id="contentTitle">소중한 나, 연꽃 미소</h1>
                    <p className="fs-4 pt-3" style={{marginTop:`${unit*2}px`}}
                       id="content">
                        <span className="h1 text-primary">갑사 </span>
                        1,600여년의 역사와 문화를 간직한 계룡산 갑사에서의 템플스테이 !!! 갑사 용솟음 템플스테이는 여러분 마음 속 깊은
                        곳에 자리한 참된 꿈을 품고 희망차게 살 것을 제안합니다. 내안의 무거운 짐을 잠시 내려놓고 그 빈자리에 꿈과 당당함을 채워보세요.

                        계룡산 갑사는 420년(백제 구이신왕 원년)에 창건되었습니다. 통일신라시대에는 화엄십찰이 되어 국중대찰(國中大刹)로 번창했으며, 고려시대에도 이어졌습니다. 그렇다가 조선시대
                        정유재란(1957) 때 사찰이 소실되는 아픔을 겪었으나, 1604년(선조37)을 시작으로 1654년(효종5) 크게 중창하였으며,1875년(고종12) 다시 중건하여 오늘에 전해지고
                        있습니다.

                        임진왜란 때 승병장 영규대사를 배출한 호국불교 도량으로도 유명한 갑사는 현재 국보 1점, 보물 5점 등 수많은 문화재를 간직하고 있는 고찰입니다.

                        또한 갑사가 위치하고 있는 국립공원 계룡산(847m)은 통일신라시대에는 오악 중 서악(西嶽), 고려시대에는 묘향산 상악(上嶽), 지리산 하악(下嶽)과 더불어 3악중(三嶽中)
                        중악(中嶽)으로 일컬어지는 명산으로 조선건국 때 수도 후보에도 올랐던 곳입니다.

                        이러한 계룡산 갑사에서 진행되는 보물투어(사찰안내), 범종 체험, 명상, 108여의보주 만들기, 스님과의 차담, 계룡산 트레킹, 인경, 꿈 찾기, 무문관 수행 등 다양한 템플스테이 체험을
                        통해서, 내가 원하는 꿈을 찾아보시기 바랍니다.
                    </p>
                </div>
            </div>

            <div className="bg-light border-top border-bottom border-1 border-primary"style={{marginTop:`${unit*5}px`}} id="mapWrapper">
                <Container id="mapContainer">
                    <Row id="mapRow">

                        <Col sm={4}>
                            <div className="mapTextWrapper ">
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <p className="fs-4 text-center fw-bold">오시는길</p>
                                <p className="fs-5 text-center fw-bold">충청남도 공주시 계룡면 갑사로 567-3</p>
                            </div>

                        </Col>
                        <Col sm={8}>
                            <div id="mapWrap">
                                <img src="https://cis.seoul.go.kr/ko/totalalimi_new/images/map/map_0.png" className="img-thumbnail" height="860" width="100%"/>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>

            <div style={{marginTop:`${unit*5}px`}} id="programWrapper">

                <div style={{marginBottom:`${unit*5}px`}} id="programContainer">
                    <h1 className="fw-bold text-secondary ps-4" id="programTitle">프로그램</h1>
                    <Container style={{marginTop:`${unit*2}px`}} id={'cardContainer'}>
                        <Row>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="https://noms.templestay.com/images//RsImage/L_2231.png" style={{height: '280px'}}/>
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] 당일 템플스테이(단체 10명 이상 하루 체험)
                                    </Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="https://noms.templestay.com/images//RsImage/L_11381.png" style={{height: '280px'}} />
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] [2022 문화가있는날] 템플스테이</Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                            <Col md={4} style={{ flexBasis: '432px' }}><Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="https://noms.templestay.com/images//RsImage/L_2401.png" style={{height: '280px'}} />
                                <Card.Body>
                                    <Card.Title style={{height:`70px`}}>[갑사] 주말 휴일 템플스테이</Card.Title>
                                    <Button variant="primary">예약하러 가기</Button>
                                </Card.Body>
                            </Card></Col>
                        </Row>
                    </Container>
                </div>

            </div>

        </div>
    )
}



export default temple