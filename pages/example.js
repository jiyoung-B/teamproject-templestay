// MyComponent.jsx

import React, {useState} from "react";
import { Col, Row } from "react-bootstrap";


export default function example() {

    let [onOff, seOnOff] = useState([false,false,false,false,false])
    console.log(onOff)


    const handleOver = (e) => {
        let index = e.target.getAttribute('idx');
        const newonOff = [...onOff]
        newonOff[index] = !onOff[index]
        seOnOff(newonOff)
    };
    const handleOut = (e) => {
        let index = e.target.getAttribute('idx');
        const newonOff = [...onOff]
        newonOff[index] = !onOff[index]
        seOnOff(newonOff)
    };

    let style1 = { backgroundColor:'red'}
    let style2 = { backgroundColor:'blue'}

    return (
        <Row>
            <Col md={6} className="scrollable-col" style={{marginTop:'200px'}}>
                <h1 idx={0} onMouseOver={handleOver} onMouseOut={handleOut} style={((onOff[0]) ? style1 : style2)}>hi</h1>
                <h1 idx={1} onMouseOver={handleOver} onMouseOut={handleOut} style={((onOff[1]) ? style1 : style2)}>hi</h1>
                <h1 idx={2} onMouseOver={handleOver} onMouseOut={handleOut} style={((onOff[2]) ? style1 : style2)}>hi</h1>
                <h1 idx={3} onMouseOver={handleOver} onMouseOut={handleOut} style={((onOff[3]) ? style1 : style2)}>hi</h1>
                <h1 idx={4} onMouseOver={handleOver} onMouseOut={handleOut} style={((onOff[4]) ? style1 : style2)}>hi</h1>
            </Col>
            <Col md={6}>
                {/* 두 번째 열 */}
                {/* 내용 */}
            </Col>
        </Row>
    );
}
