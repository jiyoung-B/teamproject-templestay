import {NavLink} from "react-bootstrap";
import Link from "next/link";


const ToIntro = () => {
    return (
        <div className={"bg-primary"}>
                <NavLink href="/intro" className={"text-center pb-1"} style={{color: "white"}}>
                    Temple, For you
                </NavLink>
        </div>

    )
}

export default ToIntro
