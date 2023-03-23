import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Link from "next/link";
import {Button, Form, Table} from "react-bootstrap";
import React, {useState} from "react";
import { temples } from "./utils/temples";
import MyinfoCommon from "./layout/MyinfoCommon";
import {getSession} from "next-auth/client";
import axios from "axios";
import GoogleMapReact from "google-map-react";
import {TbCircleNumber1, TbCircleNumber2, TbCircleNumber3} from "react-icons/tb";

export async function getServerSideProps(ctx) {
// 세션 객체 가져오기
//     const sess = await getSession(ctx);
//     let email = sess?.user?.email;
//     let url = email ? `http://localhost:3000/api/member/myinfo?email=${email}`:'';
//
//     if(url){
//         const res = await axios.get(url);
//         const member = await res.data[0];
//         console.log('pg myinfo common : ', await member);
//
//         return {props : {member: member, session: sess}}
//     } else {
//         return {props : {session: null}};
//     }

    // 세션 객체 가져오기
    const sess = await getSession(ctx);
    if(!sess) { // 로그인하지 않은 경우 로그인으로 이동
        return {
            redirect: {permanent: false, destination: '/'},
            props: {}
        }
    }
    // let userid = ctx.query.userid;
    // let userid = 'abc123';
    let email = sess.user.email; // 로그인한 사용자 아이디

    let url = `http://localhost:3000/api/member/myinfo?email=${email}`;

    const res = await axios.get(url);
    console.log('마이커먼인포res', res);
    const member = await res.data[0];
    console.log('인포커먼 멤버 myinfo : ', await member);

    return {props : {member: member, session: sess}}
}

export default function Likes ({member, session}) {
    console.log('라잌스 - ', session);
    console.log('라잌스멤버 넘어옴? - ', member);

    const [checkedState, setCheckedState] = useState(
        new Array(temples.length).fill(false)
    );
    const [userinfo, setUserInfo] = useState({
        name: [],
        program: [],
        price: [],
        details: [],
        lat: [],
        lng: [],
        response: [],
    });

    let handleOnChange = (position, e) => {
        if (checkedState.filter((i) => i).length >= 3 && e.target.checked) return;
        let updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        // allow only 3 elements
        if (updatedCheckedState.filter(v => v).length >= 4) {
            return
        }
        setCheckedState(updatedCheckedState);

        // 체크박스에 체크된 데이터 가져오기
        const { value, checked } = e.target;
        const { name, program, price, details, lat, lng } = userinfo;

        // Case 1 : The user checks the box
        if (checked) {
            setUserInfo({
                name: [...name, value],
                program: [...program],
                price: [...price],
                details: [...details],
                lat: [...lat],
                lng: [...lng],
                response: [...name, ...program, ...price, ...details, ...lat, ...lng, value],
            });
        }

        // Case 2  : The user unchecks the box
        else {
            setUserInfo({
                name: name.filter((e) => e !== value),
                program: program.filter((e) => e !== value),
                price: price.filter((e) => e !== value),
                details: details.filter((e) => e !== value),
                lat: lat.filter((e) => e !== value),
                lng: lng.filter((e) => e !== value),
                response: [...name.filter((e) => e !== value), ...program.filter((e) => e !== value), ...price.filter((e) => e !== value),
                    ...details.filter((e) => e !== value), ...lat.filter((e) => e !== value), ...lng.filter((e) => e !== value)],
            });
        }
    };

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
        location.href = '/book';
    };

    console.log(userinfo.response)

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

    let medianLat = (Number(String(userinfo.response[0]).split(',')[4]) + Number(String(userinfo.response[1]).split(',')[4])) / 2;
    let medianLng = (Number(String(userinfo.response[0]).split(',')[5]) + Number(String(userinfo.response[1]).split(',')[5])) / 2;

    let marker1lat = Number(String(userinfo.response[0]).split(',')[4]);
    let marker1lng = Number(String(userinfo.response[0]).split(',')[5]);

    let marker2lat = Number(String(userinfo.response[1]).split(',')[4]);
    let marker2lng = Number(String(userinfo.response[1]).split(',')[5]);

    let marker3lat = Number(String(userinfo.response[2]).split(',')[4]);
    let marker3lng = Number(String(userinfo.response[2]).split(',')[5]);

    console.log(`marker1lat: ${marker1lat}, marker3lng: ${marker1lng}`)
    console.log(`marker2lat: ${marker2lat}, marker3lng: ${marker2lng}`)
    console.log(`marker3lat: ${marker3lat}, marker3lng: ${marker3lng}`)

    // 구글맵1
    class GoogleMap1 extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                defaultProps: {
                    center: this.props.center || {
                        lat: this.props.lat || 37.48587156795423,
                        lng: this.props.lng || 126.89736789924702
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
                    <TbCircleNumber1 lat={marker1lat} lng={marker1lng} text={"Point 1"} size="30" color="#984C0C" />
                    <TbCircleNumber2 lat={marker2lat} lng={marker2lng} text={"Point 2"} size="30" color="#984C0C" />
                </GoogleMapReact>
            );
        }
    }   // 구글맵1 끝

    // 구글맵2
    let latArr = [marker1lat, marker2lat, marker3lat]
    let lngArr = [marker1lng, marker2lng, marker3lng]

    let latG = (marker1lat + marker2lat + marker3lat) / 3;
    let lngG = (marker1lng + marker2lng + marker3lng) / 3;
    console.log(`latG : ${latG}, lngG : ${lngG}`);

    class GoogleMap2 extends React.Component {

        constructor(props) {
            super(props);

            function getMedian(array) {
                if (array.length === 0) return NaN; // 빈 배열은 에러 반환(NaN은 숫자가 아니라는 의미임)
                let center = parseInt(array.length / 2); // 요소 개수의 절반값 구하기

                if (array.length % 2 === 1) { // 요소 개수가 홀수면
                    return array[center]; // 홀수 개수인 배열에서는 중간 요소를 그대로 반환
                } else {
                    return (array[center - 1] + array[center]) / 2.0; // 짝수 개 요소는, 중간 두 수의 평균 반환
                }
            }

            this.state = {
                defaultProps: {
                    center: this.props.center || {
                        // lat: this.props.lat || getMedian(latArr.sort()),
                        lat: this.props.lat || latG,
                        // lng: this.props.lng || getMedian(lngArr.sort())
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
                        key: this.props.apiKey ? this.props.apiKey : "you need an API key!"
                    }}
                    defaultCenter={this.state.defaultProps.center}
                    defaultZoom={this.state.defaultProps.zoom}
                    layerTypes={this.state.defaultProps.layerTypes}
                    options={{ styles: this.state.defaultProps.styles }}
                >
                    <TbCircleNumber1 lat={marker1lat} lng={marker1lng} text={"Point 1"} size="30" color="#984C0C" />
                    <TbCircleNumber2 lat={marker2lat} lng={marker2lng} text={"Point 2"} size="30" color="#984C0C" />
                    <TbCircleNumber3 lat={marker3lat} lng={marker3lng} text={"Point 3"} size="30" color="#984C0C" />
                </GoogleMapReact>
            );
        }
    }   // 구글맵2 끝

    // GoogleMap1에서 두 좌표간 거리 구하는 함수
    function getDistanceFromLatLonInKm() {
        let lat1 = marker1lat
        let lng1 = marker1lng;
        let lat2 = marker2lat;
        let lng2 = marker2lng;

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
    console.log('거리1 :', getDistanceFromLatLonInKm())

    // GoogleMap2에서 두 좌표간 거리 구하는 함수
    let maxLat = Math.max(...latArr)
    let minLat = Math.min(...latArr)
    let maxLng = Math.max(...lngArr)
    let minLng = Math.min(...lngArr)
    console.log(`maxLat : ${maxLat}, minLat : ${minLat}`)
    console.log(`maxLng : ${maxLng}, minLng : ${minLng}`)

    function getDistanceFromLatLonInKm2() {
        let lat1 = maxLat
        let lng1 = maxLng;
        let lat2 = minLat;
        let lng2 = minLng;

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
    console.log('거리2 :', getDistanceFromLatLonInKm2())

    // GoogleMap1에서 거리에 따른 줌 설정 함수
    let changeZoom = () => {
        if (getDistanceFromLatLonInKm() > 300000) {
            return 7
        } else if ((300000 >= getDistanceFromLatLonInKm()) && (getDistanceFromLatLonInKm() > 200000)) {
            return 8
        } else if ((200000 >= getDistanceFromLatLonInKm()) && (getDistanceFromLatLonInKm() > 100000)) {
            return 9
        } else return 10
    }
    console.log('changeZoom1 :', changeZoom())

    // GoogleMap2에서 거리에 따른 줌 설정 함수
    let changeZoom2 = () => {
        if (getDistanceFromLatLonInKm2() > 300000) {
            return 7
        } else if ((300000 >= getDistanceFromLatLonInKm2()) && (getDistanceFromLatLonInKm2() > 200000)) {
            return 8
        } else if ((200000 >= getDistanceFromLatLonInKm2()) && (getDistanceFromLatLonInKm2() > 100000)) {
            return 9
        } else return 10
    }
    console.log('changeZoom2 :', changeZoom2())

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
                    <tr style={{height: "800px"}}>
                        <td colSpan="2" id="map" style={{height: "100%", width: "100%"}}>
                            <GoogleMap1
                                apiKey={googleMapsApiKey}
                                center={[medianLat, medianLng]}
                                styles={modalMapStyles}
                                zoom={changeZoom()}>
                            </GoogleMap1>
                        </td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[1]}</td>
                        <td>{String(userinfo.response[1]).split(',')[1]}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[2]}</td>
                        <td>{String(userinfo.response[1]).split(',')[2]}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{String(userinfo.response[0]).split(',')[3]}</td>
                        <td>{String(userinfo.response[1]).split(',')[3]}</td>
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
                    <tr style={{height: "800px"}}>
                        <td colSpan="3" id="map" style={{height: "100%", width: "100%"}}>
                            <GoogleMap2
                                apiKey={googleMapsApiKey}
                                // center={[37.48587156795423, 126.89736789924702]}
                                styles={modalMapStyles}
                                zoom={changeZoom2()}>
                                <TbCircleNumber1 lat={marker1lat} lng={marker1lng} text={"Point 1"} size="30" color="#984C0C" />
                                <TbCircleNumber2 lat={marker2lat} lng={marker2lng} text={"Point 2"} size="30" color="#984C0C" />
                                <TbCircleNumber3 lat={marker3lat} lng={marker3lng} text={"Point 3"} size="30" color="#984C0C" />
                            </GoogleMap2>
                        </td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[1]}</td>
                        <td>{String(userinfo.response[1]).split(',')[1]}</td>
                        <td>{String(userinfo.response[2]).split(',')[1]}</td>
                    </tr>
                    <tr style={{height: "40px"}}>
                        <td>{String(userinfo.response[0]).split(',')[2]}</td>
                        <td>{String(userinfo.response[1]).split(',')[2]}</td>
                        <td>{String(userinfo.response[2]).split(',')[2]}</td>
                    </tr>
                    <tr style={{height: "400px"}}>
                        <td>{String(userinfo.response[0]).split(',')[3]}</td>
                        <td>{String(userinfo.response[1]).split(',')[3]}</td>
                        <td>{String(userinfo.response[2]).split(',')[3]}</td>
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

    console.log(medianLng, medianLat)
    console.log(Number(String(userinfo.response[0]).split(',')[4]))

    return (
        <main>
            <Container fluid>
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
                                <Modal size="xl" show={show} onHide={handleClose}>
                                    <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                        <Modal.Title>템플 스테이 비교</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="comtab">
                                        <SelectCompareCnt />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button letiant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                            닫기
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </React.Fragment>
                        </>
                    </Col>
                </Row>
                <Row className="tpl">
                    <Col className="likeslist col-10 offset-1">
                        <ul className="temples-list" style={{padding: "0"}}>
                            {temples.map(({ name, location, day, program, number, price, details, lat, lng }, index ) => {   // temples에서 정보 가져오기
                                return (
                                    <Row>
                                        <li key={index} className="temples-list-item">
                                            <Col className="col-3" style={{display: "flex", paddingLeft: "1%"}}>
                                                <Col className="col-5" style={{display: "flex", alignItems: "center"}}>
                                                    <Form.Check type="checkbox" className="checkbox" id={`custom-checkbox-${index}`} namd={name} value={[name, program, price, details, lat, lng]}
                                                                checked={checkedState[index]} onChange={ (e) => handleOnChange(index, e) }></Form.Check>
                                                    <img src="/img/temple.png" width="32" height="32" />
                                                </Col>
                                                <Col className="col-7" style={{display: "flex", alignItems: "center"}}>{name}</Col>
                                            </Col>
                                            <Col className="col-3">{location}</Col>
                                            <Col className="col-2">{day}</Col>
                                            <Col className="col-3">{program}</Col>
                                            <Col className="col-1">{number}</Col>
                                        </li>
                                    </Row>
                                )
                            } )}
                        </ul>
                    </Col>
                </Row>
            </Container>
        </main>
    )
}