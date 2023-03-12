import React from 'react'
import Link from 'next/link'
const Header = () => {

    return (
        <div>
            <Link href="/">Temfo,</Link>
            <Link href="/">지역</Link>
            <Link href="/">일정</Link>
            <Link href="/">로그인</Link>

            <hr />
            <div className="navBorder"></div>
        </div>
    )
}

export default Header