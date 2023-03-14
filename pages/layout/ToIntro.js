import Link from 'next/link'
import {NavLink} from "react-bootstrap";
import collapse from "bootstrap/js/src/collapse";




const ToIntro = () => {
    return (
        <div className={"bg-primary"}>
            <NavLink className={"text-center pb-1"} style={{color: "white"}} href="/intro">Temple, For you</NavLink>
        </div>

    )
}

export default ToIntro
