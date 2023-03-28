import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import {Button, Form, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import MyinfoCommon from "./layout/MyinfoCommon";
import {getSession} from "next-auth/client";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import {TbCircleNumber1, TbCircleNumber2, TbCircleNumber3} from "react-icons/tb";
import Geocode from "react-geocode";

export async function getServerSideProps(ctx) {

    const session = await getSession(ctx);
    let email = session.user.email;
    let param = `?email=${email}`
    let url = `http://localhost:3000/api/likeslist${param}`;
    const res = await axios.get(url);
    const likes1 = await res.data[0];
    const likes2 = await res.data[1];
    const likes3 = await res.data[2];
    // const likesList1 = await res.data[1];
    // console.log('?', likesList1)
    console.log('likes1', likes1)
    console.log('likes2', likes2)
    console.log('likes3', likes3)

    return {props : {likes1: likes1, likes2: likes2, likes3: likes3}}
}
export default function Likes ({session, likes1, likes2, likes3}) {
    const [checkedState, setCheckedState] = useState( new Array(likes1.length).fill(false) );
    const [userinfo, setUserInfo] = useState({
        T_NAME: [],
        ADDR: [],
        P_NAME: [],
        PRICE: [],
        P_CONTENT: [],
        response: [],
    });

    let handleOnChange = async (position, e) => {
        if (checkedState.filter((i) => i).length >= 3 && e.target.checked) return;
        let updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        // allow only 3 elements
        if (updatedCheckedState.filter(v => v).length >= 4) {
            return
        }
        setCheckedState(updatedCheckedState);

        // 체크박스에 체크된 데이터 가져오기!
        const {value, checked} = e.target;

        const {T_NAME, ADDR, P_NAME, PRICE, P_CONTENT} = userinfo;

                // Case 1 : The user checks the box
                if (checked) {
                    setUserInfo({
                        T_NAME: [...T_NAME, value],
                        ADDR: [...ADDR],
                        P_NAME: [...P_NAME],
                        PRICE: [...PRICE],
                        P_CONTENT: [...P_CONTENT],
                        response: [...T_NAME, ...ADDR, ...P_NAME, ...PRICE, ...P_CONTENT, value],
                    });
                }

                // Case 2  : The user unchecks the box
                else {
                    setUserInfo({
                        T_NAME: T_NAME.filter((e) => e !== value),
                        ADDR: ADDR.filter((e) => e !== value),
                        P_NAME: P_NAME.filter((e) => e !== value),
                        PRICE: PRICE.filter((e) => e !== value),
                        P_CONTENT: P_CONTENT.filter((e) => e !== value),
                        response: [...T_NAME.filter((e) => e !== value), ...ADDR.filter((e) => e !== value), ...P_NAME.filter((e) => e !== value),
                            ...PRICE.filter((e) => e !== value), ...P_CONTENT.filter((e) => e !== value)],
                    });
                }
            };
    // console.log(`likes`, likes);


    const [show, setShow] = useState(false);
    const handleShow = () => {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let count = 0;

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                count++;
            }
        });

        if (count <= 1) {
            alert('비교할 대상을 2개 이상 선택해주세요!')
            setShow(false);
        } else {
            setShow(true);
        }
    }

    const handleClose = () => setShow(false);

    let go2bk = () => {
        handleClose()
        location.href = '/preBook?email=${email}';
    };

    console.log(`배열`, userinfo.response)

    // 구글맵 설정
    const googleMapsApiKey = "AIzaSyC5nBDG8jIWJwe02MZYhrmkhN22Fo81FTU";

    const modalMapStyles = [
        {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [ {visibility: "on"}, {color: "#e0efef"} ]
        },
        {
            featureType: "poi",
            elementType: "geometry.fill",
            stylers: [ {visibility: "on"}, {hue: "#1900ff"}, {color: "#c0e8e8"} ]
        },
        {
            featureType: "road",
            elementType: "geometry",
            stylers: [ {lightness: 100}, {visibility: "simplified"} ]
        },
        {
            featureType: "road",
            elementType: "labels",
            stylers: [ {visibility: "off"} ]
        },
        {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [ {visibility: "on"}, {lightness: 700} ]
        },
        {
            featureType: "water",
            elementType: "all",
            stylers: [{color: "#7dcdcd"}]
        }
    ];

    // 주소로 좌표 찾기
    Geocode.setApiKey("AIzaSyC5nBDG8jIWJwe02MZYhrmkhN22Fo81FTU");
    Geocode.setLanguage("ko");
    Geocode.setRegion("ko");
    Geocode.setLocationType("ROOFTOP");
    Geocode.enableDebug()

    let temloc1 = String(userinfo.response[0]).split(',')[1];
    let temloc2 = String(userinfo.response[1]).split(',')[1];
    let temloc3 = String(userinfo.response[2]).split(',')[1];

    let aa = String(userinfo.response[0]).split(',');
    let stdts = aa[aa.length-1];
    let stpr = aa[aa.length-2];
    let stpn = aa[aa.length-3];

    let bb = String(userinfo.response[1]).split(',');
    let nddts = bb[bb.length-1];
    let ndpr = bb[bb.length-2];
    let ndpn = bb[bb.length-3];

    let cc = String(userinfo.response[2]).split(',');
    let rddts = cc[cc.length-1];
    let rdpr = cc[cc.length-2];
    let rdpn = cc[cc.length-3];

    // Get latitude & longitude from address.
    const [coordinates, setCoordinates] = useState(null);
    let getCoordinates = (address) => {
        Geocode.fromAddress(address).then(
            (response) => {
                setCoordinates(response.results[0].geometry.location);
            },
            (error) => {
                console.error(error);
            }
        );
    }
    useEffect( () => {
        getCoordinates(`${temloc1}`);
    }, [`${temloc1}`]);
    console.log(`lat: `, coordinates?.lat, `lng: `, coordinates?.lng)

    const [coordinates2, setCoordinates2] = useState(null);
    let getCoordinates2 = (address) => {
        Geocode.fromAddress(address).then(
            (response) => {
                setCoordinates2(response.results[0].geometry.location);
            },
            (error) => {
                console.error(error);
            }
        );
    }
    useEffect( () => {
        getCoordinates2(`${temloc2}`);
    }, [`${temloc2}`]);
    console.log(`lat2: `, coordinates2?.lat, `lng2: `, coordinates2?.lng)

    const [coordinates3, setCoordinates3] = useState(null);
    let getCoordinates3 = (address) => {
        Geocode.fromAddress(address).then(
            (response) => {
                setCoordinates3(response.results[0].geometry.location);
            },
            (error) => {
                console.error(error);
            }
        );
    }
    useEffect( () => {
        getCoordinates3(`${temloc3}`);
    }, [`${temloc3}`]);
    console.log(`lat3: `, coordinates3?.lat, `lng3: `, coordinates3?.lng)

    let medianLat = (coordinates?.lat + coordinates2?.lat) / 2;
    let medianLng = (coordinates?.lng + coordinates2?.lng) / 2;

    // 구글맵1
    class GoogleMap1 extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                defaultProps: {
                    center: this.props.center || {
                        lat: this.props.lat || medianLat,
                        lng: this.props.lng || medianLng
                    },
                    zoom: this.props.zoom || 16,
                    styles: this.props.styles || [],
                    layerTypes: this.props.layerTypes || []
                }
            };
        }

        render() {
            return (
                <GoogleMapReact
                    bootstrapURLKeys={{ key: this.props.apiKey ? this.props.apiKey : "AIzaSyC5nBDG8jIWJwe02MZYhrmkhN22Fo81FTU" }}
                    defaultCenter={this.state.defaultProps.center}
                    defaultZoom={this.state.defaultProps.zoom}
                    layerTypes={this.state.defaultProps.layerTypes}
                    options={{ styles: this.state.defaultProps.styles }}
                >
                    <TbCircleNumber1 lat={coordinates?.lat} lng={coordinates?.lng} text={"Point 1"} size="30" color="#984C0C" />
                    <TbCircleNumber2 lat={coordinates2?.lat} lng={coordinates2?.lng} text={"Point 2"} size="30" color="#984C0C" />
                </GoogleMapReact>

            );
        }
    }   // 구글맵1 끝

    // 구글맵2
    let latArr = [coordinates?.lat, coordinates2?.lat, coordinates3?.lat]
    let lngArr = [coordinates?.lng, coordinates2?.lng, coordinates3?.lng]

    let latG = (coordinates?.lat + coordinates2?.lat + coordinates3?.lat) / 3;
    let lngG = (coordinates?.lng + coordinates2?.lng + coordinates3?.lng) / 3;

    class GoogleMap2 extends React.Component {

        constructor(props) {
            super(props);

            this.state = {
                defaultProps: {
                    center: this.props.center || {
                        lat: this.props.lat || latG,
                        lng: this.props.lng || lngG
                    },
                    zoom: this.props.zoom || 16,
                    styles: this.props.styles || [],
                    layerTypes: this.props.layerTypes || []
                }
            };
        }

        render() {
            return (
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: this.props.apiKey ? this.props.apiKey : "AIzaSyC5nBDG8jIWJwe02MZYhrmkhN22Fo81FTU"
                    }}
                    defaultCenter={this.state.defaultProps.center}
                    defaultZoom={this.state.defaultProps.zoom}
                    layerTypes={this.state.defaultProps.layerTypes}
                    options={{ styles: this.state.defaultProps.styles }}
                >
                    <TbCircleNumber1 lat={coordinates?.lat} lng={coordinates?.lng} text={"Point 1"} size="30" color="#984C0C" />
                    <TbCircleNumber2 lat={coordinates2?.lat} lng={coordinates2?.lng} text={"Point 2"} size="30" color="#984C0C" />
                    <TbCircleNumber3 lat={coordinates3?.lat} lng={coordinates3?.lng} text={"Point 3"} size="30" color="#984C0C" />
                </GoogleMapReact>
            );
        }
    }   // 구글맵2 끝

    // GoogleMap에서 두 좌표간 거리 구하는 함수
    function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        let r = 6371; //지구의 반지름(km)
        let dLat = deg2rad(lat2-lat1);
        let dLon = deg2rad(lng2-lng1);
        let a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        let d = r * c; // Distance in km
        return Math.round(d*1000);
    }
    let Distance = getDistanceFromLatLonInKm(coordinates?.lat, coordinates?.lng, coordinates2?.lat, coordinates2?.lng)

    // GoogleMap2에서 두 좌표간 거리 구하는 함수
    let maxLat = Math.max(...latArr)
    let minLat = Math.min(...latArr)
    let maxLng = Math.max(...lngArr)
    let minLng = Math.min(...lngArr)

    let Distance2 = getDistanceFromLatLonInKm(maxLat, maxLng, minLat, minLng)

    // GoogleMap1에서 거리에 따른 줌 설정 함수
    let changeZoom = (dt) => {
        if (dt > 320000) {
            return 7
        } else if ((320000 >= dt) && (dt > 180000)) {
            return 8
        } else if ((180000 >= dt) && (dt > 80000)) {
            return 9
        } else if ((80000 >= dt) && (dt > 50000)) {
            return 10
        } else if ((50000 >= dt) && (dt > 25000)) {
            return 11
        } else if ((25000 >= dt) && (dt > 10000)) {
            return 12
        } else return 14
    }

    function SelectCompareCnt() {
        let checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let comCnt = 0;

        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                comCnt++;
            }
        });

        if (comCnt === 2) {
            return (
                <Table style={{textAlign: "center", border: "1px solid #331904"}}>
                    <thead>
                    <tr style={{height: "40px"}}>
                        <th>비교1</th>
                        <th>비교2</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[0]}</td>
                        <td>{String(userinfo.response[1]).split(',')[0]}</td>
                    </tr>
                    <tr style={{height: "750px"}}>
                        <td colSpan="2" id="map" style={{height: "100%", width: "100%"}}>
                            <GoogleMap1
                                apiKey={googleMapsApiKey}
                                center={[medianLat, medianLng]}
                                styles={modalMapStyles}
                                zoom={changeZoom(Distance)}>
                            </GoogleMap1>
                        </td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{stpn}</td>
                        <td>{ndpn}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{stpr}</td>
                        <td>{ndpr}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{stdts}</td>
                        <td>{nddts}</td>
                    </tr>
                    <tr className="gobkbtn">
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            );
        } else if(comCnt === 3) {
            return (
                <Table style={{textAlign: "center", border: "1px solid #331904"}}>
                    <thead>
                    <tr>
                        <th>비교1</th>
                        <th>비교2</th>
                        <th>비교3</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[0]}</td>
                        <td>{String(userinfo.response[1]).split(',')[0]}</td>
                        <td>{String(userinfo.response[2]).split(',')[0]}</td>
                    </tr>
                    <tr style={{height: "750px"}}>
                        <td colSpan="3" id="map" style={{height: "100%", width: "100%"}}>
                            <GoogleMap2
                                apiKey={googleMapsApiKey}
                                styles={modalMapStyles}
                                zoom={changeZoom(Distance2)}>
                            </GoogleMap2>
                        </td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{stpn}</td>
                        <td>{ndpn}</td>
                        <td>{rdpn}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{stpr}</td>
                        <td>{ndpr}</td>
                        <td>{rdpr}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{stdts}</td>
                        <td>{nddts}</td>
                        <td>{rddts}</td>
                    </tr>
                    <tr className="gobkbtn">
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                        <td style={{border: "1px solid white", borderTop: "1px solid #331904", paddingTop: "10px"}}><Button onClick={go2bk}>예약하러 가기</Button></td>
                    </tr>
                    </tbody>
                </Table>
            );
        }
    }

    return (
        <main>
            <Container fluid>
                <MyinfoCommon session={session} />
                <Row className="lnm">
                    <Col className="likesmenu1 col-6">좋아요</Col>
                    <Col className="bar1 col-1">|</Col>
                    <Col className="infomenu1 col-5"><Link href='/myinfo'>예약정보</Link></Col>
                </Row>
                <Row className="likesncom">
                    <Col className="temples col-5 offset-1" style={{fontSize: "25px"}}>좋아요를 누른 사찰</Col>
                    <Col className="col-5">
                        <>
                            <Button letiant="primary" className="combtn" onClick={handleShow}>비교하기</Button>
                            <React.Fragment id="myModal" className="modal">
                                <Modal size="xl" show={show} onHide={handleClose} likes1={likes1}>
                                    <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}} closeButton>
                                        <Modal.Title></Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="comtab">
                                        <SelectCompareCnt likes1={likes1} />
                                    </Modal.Body>
                                </Modal>
                            </React.Fragment>
                        </>
                    </Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <ul className="temples-list" style={{padding: "0"}}>
                            {/*{likes.map((lk, index) => (*/}
                            {/*    <Row key={index}>*/}
                            {/*            <li key={index} className="temples-list-item">*/}
                            {/*                <Col className="col-3" style={{display: "flex", paddingLeft: "1%"}}>*/}
                            {/*                    <Col className="col-5" style={{display: "flex", alignItems: "center"}}>*/}
                            {/*                        <Form.Check type="checkbox" className="checkbox" id={`custom-checkbox-${index}`} namd={lk.T_NAME} value={[lk.T_NAME, lk.ADDR, lk.P_NAME, lk.PRICE, lk.P_CONTENT]}*/}
                            {/*                                    checked={checkedState[index]} onChange={ (e) => handleOnChange(index, e) }></Form.Check>*/}
                            {/*                        <img src="/img/temple.png" width="32" height="32" />*/}
                            {/*                    </Col>*/}
                            {/*                    <Col className="col-7" style={{display: "flex", alignItems: "center"}}>{lk.T_NAME}</Col>*/}
                            {/*                    <Col className="col-7" style={{display: "flex", alignItems: "center"}}>{lk.P_NAME}</Col>*/}
                            {/*                </Col>*/}
                            {/*                <Col className="col-4">{lk.ADDR}</Col>*/}
                            {/*                <Col className="col-5">{lk.P_NAME}</Col>*/}
                            {/*            </li>*/}
                            {/*        </Row>*/}
                            {/*    ))*/}
                            {/*}*/}
                            {likes1.map((llk, index) => (
                                <Row key={index}>
                                    <li key={index} className="temples-list-item">
                                        <Col className="col-3" style={{display: "flex", paddingLeft: "1%"}}>
                                            <Col className="col-5" style={{display: "flex", alignItems: "center"}}>
                                                <Form.Check type="checkbox" className="checkbox" id={`custom-checkbox-${index}`} namd={llk.T_NAME} value={[llk.T_NAME, llk.ADDR, llk.P_NAME]}
                                                            checked={checkedState[index]} onChange={ (e) => handleOnChange(index, e) }></Form.Check>
                                                <img src="/img/temple.png" width="32" height="32" />
                                            </Col>
                                            <Col className="col-7" style={{display: "flex", alignItems: "center"}}>{llk.T_NAME}</Col>
                                            {/*<Col className="col-7" style={{display: "flex", alignItems: "center"}}>{lk.P_NAME}</Col>*/}
                                        </Col>
                                        <Col className="col-4">{llk.ADDR}</Col>
                                        <Col className="col-5">{llk.P_NAME}</Col>
                                    </li>
                                </Row>
                            ))
                            }
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}