import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, Modal, NavLink, Row, Table, Form} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import axios from "axios";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import shortid from 'shortid'
import {handleImgError, dateFomatter, milliFomatter} from "../module/Utils";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
//shortid.generate()


export async function getServerSideProps(ctx) {

    let {pid} = ctx.query

    let param = `?pid=${pid}`
    let url = `http://localhost:3000/api/program${param}`

    const res = await axios.get(url)

    let proData = await res.data;

    proData.push(pid)

    return {props:{proData}}
}

// const tomorrow = new Date().setDate(new Date().getDate() + 1);
// let check = milliFomatter(tomorrow) // 확인 결과 tomorrow는 변환했을 때 내일을 가르킨다.
// console.log(check)

export default function Program ({proData}) {
    const unit = 28
    let PID = proData[6]

    // 예약하기 버튼 비활성화 state
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 내일의 날짜를 구하기
    const tomorrow = new Date().setDate(new Date().getDate() + 1);

    // state 보여주는 부분
    const [startDate, setStartDate] = useState(tomorrow);
    let [endDate, setEndDate] = useState(null);


    // 모달 on/off 해주는 함수
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //날짜가 선택되면 state를 변경해주는 함수
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // 인원 선택 관련 함수
    // 모달 on/off
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    // 선택 인원 관리 함수
    // 선택 가능 옵션의 종류는 동적으로 결정된다.
    // 이 스테이트에는 선택한 순서대로 저장된다.
    // 좀 이상한 것 같다.
    // 그동안 나는 설사 등장하지 않는 경우가 있더라도, 성인, 중고생, 초등생, 미취학 순으로 반드시 존재한다고 생각했고, 어떤 경우에도 성인은 포함된다고 생각했다.
    // 하지만 살펴보니 성인이 없고 오직 중고생만 있는 경우가 있었다.
    // 이 경우엔 배열의 첫번째 요소가 반드시 성인이라고 보장할 수 없다.
    const [selectedOptions, setSelectedOptions] = useState({"성인": 0,"중고생":0,"초등생":0,"미취학":0});

        // 예약정보에 키 추가.
        // 일단 객체로 만들었을때 값이 잘 들어오는 것을 일단 확인하였다.
        // 이제 선택지의 개수를 다르게 해보며 값을 확인한다.
        // 테스트 리스트를 뽑는다.
        // 4개 - 19326
        // 3개 - 16622
        // 중학생만 있는 곳을 찾을 수가 없다. 일단 넘어가 본다.
    const handleSelectChange = (e, clas) => {
        const selectedValue = e.target.value;
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = {...prevSelectedOptions};
            newSelectedOptions[clas] = selectedValue;
            return newSelectedOptions;
        });
    }

    // reservInfo의 기본값에 PID를 넣었다.
    // 예약 객체를 state로 관리 하였다.
    // 이유는 만약 사용자가 선택을 바꿀 경우 내용이 바뀌어야 하기 때문이다.
    const [reservInfo, setReservInfo] = useState({userId:'test', reservInfo :{pid:PID, people: {"성인":[0,0],"중고생":[0,0],"초등생":[0,0],"미취학":[0,0]}, dates:[]}})


    // handelReserve안에서 작동하는 함수 /api/preBook 에 post 요청을 한다.
    const process_reservation = async (data) => {

        // json 형식으로 전처리
        let preReservationDate = [
            {userId:data.userId},{PID:data.reservInfo.pid},{strDate:data.reservInfo.dates[0]},
            {endDate: (data.reservInfo.dates[1] === null) ? data.reservInfo.dates[0] : data.reservInfo.dates[1]},
            {adult: (data.reservInfo.people["성인"][0] === null) ? 0 : Number(data.reservInfo.people["성인"][0])},
            {middle: (data.reservInfo.people["중고생"][0] === null) ? 0 : Number(data.reservInfo.people["중고생"][0])},
            {young:(data.reservInfo.people["초등생"][0] === null) ? 0 : Number(data.reservInfo.people["초등생"][0])},
            {preschool:(data.reservInfo.people["미취학"][0] === null) ? 0 : Number(data.reservInfo.people["미취학"][0])}
        ]

        const cnt = fetch('/api/preBook', {
            method: 'POST', mode: 'cors',
            body: JSON.stringify(preReservationDate),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());
        let result = false;
        if(await cnt.cnt >0) result = true
        return result;
    }

    // 예약 버튼을 눌렀을 때 작동
    const handleReserve = async () => {

        // 클릭시 버튼 비활성화
        setIsSubmitting(true)

        setReservInfo((prevReservInfo) => {
            const newReservInfo = {...prevReservInfo}

            // people 객체에 입력값 전달 및 단위별 합계액 전달 부분. ex) 성인 : [수, 합계액]
            proData[2].map((clas) => {
                let sumPrice = selectedOptions[clas.PR_CLASS] * clas.PRICE
                newReservInfo.reservInfo.people[clas.PR_CLASS] = [(selectedOptions[clas.PR_CLASS] === undefined) ? null : selectedOptions[clas.PR_CLASS], isNaN(sumPrice) ? 0 : sumPrice]
            })
            // 현재 일정을 선택하지 않으면, 다음날이 시작 날짜로 지정되고 있다.
            // 일정을 선택하지 않으면 화면에 일정 표시가 되지 않는다.
            // 선택하지 않으면 일정을 선택하세요! 라는 경고 문구가 등장하게 해야 한다.
            let B_strDate = milliFomatter(startDate)
            let B_endDate = dateFomatter(endDate)

            if (B_endDate === null) {
                B_endDate = B_strDate
            }

            newReservInfo.reservInfo.dates = [B_strDate,B_endDate]

            // sum 계산 단위별 합계액 합산하여, 총액을 구한다.
            let sum = 0;
            for (let key in newReservInfo.reservInfo.people) {
                sum += newReservInfo.reservInfo.people[key][1];
            }

            // sum에 합계를 전달함.
            newReservInfo.reservInfo.sum = sum

            // api를 통해 db로 전달. 행이 추가되면 true를 리턴하고, url을 preBook 페이지로 변경 보낸다.
            if(process_reservation(newReservInfo)) {
               location.href = `/preBook?userid=${newReservInfo.userId}`;
            }

            return newReservInfo
        })
    }

    return(
        <div className={'container'} style={{marginTop:`${unit*2}px`}} id={'programWrapper'}>

            <div id={'titleWrapper'}>
                <h3 className={"text-primary ps-4"}>{proData[0][0].P_NAME}</h3>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'imgWrapper'}>
                <div id="carouseContainer">

                    <Carousel>

                        { (proData[1].length > 0) ? (proData[1].map(pic => (
                                <Carousel.Item key={shortid.generate()}>
                                    <img
                                        className="d-block w-100"
                                        src={(pic.length < 40) ? 'https://www.templestay.com/images/templeinfo-00.jpg' : pic}
                                        alt="First slide"
                                        height="800px"
                                        onError={handleImgError}
                                        key={shortid.generate()}
                                    />
                                </Carousel.Item>
                            ))) :
                            (
                                <Carousel.Item key={shortid.generate()}>
                                    <img
                                        className="d-block w-100"
                                        src={'https://www.templestay.com/images/templeinfo-00.jpg'}
                                        alt="First slide"
                                        height="800px"
                                        onError={handleImgError}
                                        key={shortid.generate()}
                                    />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>

                </div>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'selectWrapper'}>

                <Container id={'selectContainer'}>
                    <Row className={'d-flex justify-content-center'}>
                        <Col className={'d-flex  justify-content-end me-5' }>
                            <Row>
                                <Button className="calbtn" onClick={handleShow}><p className={'text-center m-0 fs-3 text-primary'}>일정 <BsCheck2 className={"mb-2"}/></p></Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                        <Modal.Title>날짜 선택</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="cal">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={onChange}
                                            inline
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={tomorrow}
                                            monthsShown={2}
                                            selectsRange
                                            dateFormat="yyyy-mm-dd"
                                            locale={ko}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                            닫기
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            선택
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>
                        </Col>
                        <Col className={'d-flex  justify-content-start ms-5'}>
                            <Button className="calbtn" onClick={handleShow2}><p className={'text-start m-0 fs-3 text-primary'}>인원 <BsCheck2 className={"mb-2"}/></p></Button>
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>인원 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="cal">

                                    {proData[2].map((clas) =>(
                                        <Form.Select value={selectedOptions[clas.PR_CLASS]} onChange={(e) => handleSelectChange(e,clas.PR_CLASS)} key={shortid.generate()} aria-label="Default select example">
                                            <option key={shortid.generate()} >{clas.PR_CLASS}</option>
                                            <option value="1"  key={shortid.generate()} >1명</option>
                                            <option value="2"  key={shortid.generate()} >2명</option>
                                            <option value="3"  key={shortid.generate()} >3명</option>
                                            <option value="4"  key={shortid.generate()} >4명</option>
                                            <option value="5"  key={shortid.generate()} >5명</option>
                                            <option value="6"  key={shortid.generate()} >6명</option>
                                            <option value="7"  key={shortid.generate()} >7명</option>
                                            <option value="8"  key={shortid.generate()} >8명</option>
                                            <option value="9"  key={shortid.generate()} >9명</option>
                                            <option value="10"  key={shortid.generate()} >10명</option>
                                            <option value="11"  key={shortid.generate()} >11명</option>
                                            <option value="12"  key={shortid.generate()} >12명</option>
                                            <option value="13"  key={shortid.generate()} >13명</option>
                                            <option value="14"  key={shortid.generate()} >14명</option>
                                            <option value="15"  key={shortid.generate()} >15명</option>
                                            <option value="16"  key={shortid.generate()} >16명</option>
                                            <option value="17"  key={shortid.generate()} >17명</option>
                                            <option value="18"  key={shortid.generate()} >18명</option>
                                            <option value="19"  key={shortid.generate()} >19명</option>
                                            <option value="20"  key={shortid.generate()} >20명</option>
                                            <option value="21"  key={shortid.generate()} >21명</option>
                                            <option value="22"  key={shortid.generate()} >22명</option>
                                            <option value="23"  key={shortid.generate()} >23명</option>
                                            <option value="24"  key={shortid.generate()} >24명</option>
                                            <option value="25"  key={shortid.generate()} >25명</option>
                                            <option value="26"  key={shortid.generate()} >26명</option>
                                            <option value="27"  key={shortid.generate()} >27명</option>
                                            <option value="28"  key={shortid.generate()} >28명</option>
                                            <option value="29"  key={shortid.generate()} >29명</option>
                                            <option value="30"  key={shortid.generate()} >30명</option>
                                        </Form.Select>
                                    ))}


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                    <Button variant="primary" onClick={handleClose2}>
                                        선택
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Col>
                    </Row>
                </Container>

            </div>
            <div id={'reservWrapper'}>

                <Container>
                    <Row>
                        <Col>
                            { dateFomatter(endDate) ? (<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight: '10px'}}>{(milliFomatter(startDate) === null) ? milliFomatter(tomorrow) : milliFomatter(startDate)}~{dateFomatter(endDate)}</p>):(<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight:'60px'}} >{milliFomatter(startDate)}</p>)}
                        </Col>
                        <Col>
                            <Row>
                                <Col><p className={'text-start pt-2 m-0'}>(2박) 2인</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div id={'priceInfoWrapper'}>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={11}>
                            <span className={'fs-3 me-3 text-primary'}>참가비용</span> <span className={'ms-5 text-danger'}>{proData[0][0].P_CAUTION}</span>
                            <div className={'mt-2'} id={'priceTableContainer'}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>구 분</th>
                                        {proData[2].map(clas =>(
                                            <th key={shortid.generate()}>{clas.PR_CLASS}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{proData[2][0].DIVISION}</td>
                                        {proData[2].map(pri =>(
                                            <td key={shortid.generate()}>{pri.PRICE}</td>
                                        ))}
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <div>
                        <Button
                            onClick={handleReserve}
                            disabled={isSubmitting}
                        >예약하기</Button>
                    </div>
                </Container>

            </div>
            <div  style={{marginTop:`${unit*4}px`}} id={'contentWrapper'}>
                <div id={'contentContainer'}>
                    <p className="fs-3 fw-bold text-secondary">프로그램 소개</p>
                    <p> <span className={'text-warning fs-4'}> {proData[2][0].DIVISION}</span>&nbsp;{proData[0][0].P_INTRO}</p>
                </div>
            </div>
            <div style={{marginTop:`${unit*2}px`}} id={'scheduleWrapper'}>
                <Container id={'scheduleContainer'}>
                    <Row>
                        <Col md={3}>
                            <p className={'fs-5 fw-bold'}>프로그램 일정</p>
                            <p>기타 코멘트</p>
                        </Col>
                        <Col md={9}>
                            {proData[4].map(day => (
                                    <Row key={shortid.generate()}>

                                        <Col key={shortid.generate()}>
                                            <p className={'fs-5 fw-bold'} key={shortid.generate()}>{day.P_DAY}</p>

                                            <Table key={shortid.generate()}>
                                                <thead key={shortid.generate()}>
                                                <tr key={shortid.generate()}>
                                                    <th style={{width:'50%'}} key={shortid.generate()}>시작시간</th>
                                                    <th key={shortid.generate()}>일정명</th>
                                                </tr>
                                                </thead>
                                                <tbody key={shortid.generate()}>

                                                {day.P_INFO.map(sch => (
                                                    <tr key={shortid.generate()}>
                                                        <td style={{width:'50%'}} key={shortid.generate()}>{sch.P_TIME}</td>
                                                        <td key={shortid.generate()}>{sch.P_CONTENT}</td>
                                                    </tr>
                                                ))}

                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                )
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
            <div style={{marginTop:`${unit*2}px`, marginBottom:`${unit*5}px`}} id={'otherProWrapper'}>

                <div id="programContainer">
                    <p className={'fs-3 fw-bold text-secondary'} id="programTitle">다른 프로그램</p>
                    <Container style={{marginTop:`${unit}px`}} id={'cardContainer'}>
                        <Row>
                            {(proData[5].length > 0 ) ? (proData[5].map(program => (
                                <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>

                                    <Card style={{ width: '100%' }} key={shortid.generate()}>
                                        <Card.Img variant="top" src={(program.P_PICLINK.length < 40) ? 'https://www.templestay.com/images/templeinfo-00.jpg' : program.P_PICLINK} onError={handleImgError} style={{height: '280px'}} key={shortid.generate()}/>
                                        <Card.Body className={'bg-light'} key={shortid.generate()}>
                                            <Card.Title style={{height:`70px`}} key={shortid.generate()}>
                                                {program.P_NAME}
                                            </Card.Title>
                                            <Button variant="primary" key={shortid.generate()}><NavLink href={`/program?pid=${program.PID}`} key={shortid.generate()}>예약하러 가기</NavLink></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))) : ( <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>

                            </Col>)
                            }
                        </Row>
                    </Container>
                </div>

            </div>

        </div>

    )
}
