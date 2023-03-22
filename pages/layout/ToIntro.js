import {NavLink} from "react-bootstrap";
import Link from "next/link";




const ToIntro = () => {
    return (
        <div className={"bg-primary"}>
            <Link href="/intro">
                <NavLink className={"text-center pb-1"} style={{color: "white"}}>
                    Temple, For you
                </NavLink>
            </Link>
        </div>

    )
}

export default ToIntro
