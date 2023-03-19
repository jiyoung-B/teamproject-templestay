import {NavLink} from "react-bootstrap";




const ToIntro = () => {
    return (
        <div className={"bg-primary"} style={{position: "fixed", width: "100%"}}>
            {/*position: 'fixed', top: "0", left: "0", right: "0"*/}
            <NavLink className={"text-center pb-1"} style={{color: "white"}} href="/intro">Temple, For you</NavLink>
        </div>

    )
}

export default ToIntro
