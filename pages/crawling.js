import {Button} from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {crawling} from "../module/CrawlingFunction"



export default function Crawling () {


    // const startCrawling = () => {
    //     crawling()
    // };
    return(
        <div className={'container'} style={{marginTop:'100px',marginBottom:'100px'}} >
            <h1>hi! 관리자페이지!</h1>
            <Row style={{marginTop:'100px'}}>
                <Col>
                    <Button
                    variant="warning"
                    // onClick={startCrawling}
                >크롤링 시작!</Button>
                </Col>

            </Row>
        </div>

    )
}
