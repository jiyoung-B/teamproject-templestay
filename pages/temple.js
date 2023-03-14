import Carousel from 'react-bootstrap/Carousel';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import axios from 'axios'

// 캐러셀에 들어갈 사진은 서버에서 불러온 다음에 제공되어야 한다. 만약 그렇지 않으면 페이지가 로드된 후에 다운받기 때문에 잘린 이미지나,
// 빈 화면이 표시 될 수 있다.

export async function getServerSideProps(ctx) {

    let url = `http://localhost:3000/api/temple?id=갑사`
    const res = await axios.get(url)

    let {temple, templePic} = await res.data;
    console.log(templePic);

    return {props:{temple,templePic}}
}


// css 단위 변수
const unit = 28

const temple = ({temple,templePic}) => {

    return(
        <div id="templeWrapper">
            <div id="carouselWrapper" style={{marginTop:`${unit*2}px`}}>
                <div id="carouseContainer">
                    <Carousel>
                        {templePic.map(pic => (
                            <Carousel.Item key={pic.T_PICTURE}>
                                <img
                                    className="d-block w-100"
                                    src={pic.T_PICTURE}
                                    key={pic.T_NAME}
                                    alt="First slide"
                                    height="800px"
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>

                </div>
            </div>

            <div id="contentWrapper" style={{marginTop:`${unit*5}px`}}>
                <div id="contentContainer">
                    <h1 className="fw-bold text-primary ps-4"
                        id="contentTitle" key={temple[0].T_NAME} >{temple[0].T_NAME}</h1>
                    <p className="fs-4 pt-3" style={{marginTop:`${unit*2}px`}}
                       id="content" >
                        {temple[0].T_COPY}
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
                                <p className="fs-5 text-center fw-bold" key={temple[0].T_ADDR}>{temple[0].T_ADDR}</p>
                                <p className="fs-5 text-center fw-bold" key={temple[0].T_PHONE}>{temple[0].T_PHONE}</p>
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
                    <div className={''} style={{display: 'flex',
                        flexWrap: 'wrap'}} id={'cardContainer'}>
                        <div id={'card'}>
                            <Card style={{ width: '100%' }}>
                            <Card.Img variant="top" src="https://noms.templestay.com/images//RsImage/L_2231.png" style={{height: '280px'}}/>
                            <Card.Body>
                                <Card.Title style={{height:`70px`}}>[갑사] 당일 템플스테이(단체 10명 이상 하루 체험)
                                </Card.Title>
                                <Button variant="primary">예약하러 가기</Button>
                            </Card.Body>
                        </Card>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}



export default temple