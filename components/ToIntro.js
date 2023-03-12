import React from 'react'
import Link from 'next/link'


const ToIntro = () => {
    return (
        <div>

        <style jsx>{`
        div {
            background: #8B4513;
            color: white;
            text-align: center;
        }`}</style>

            <Link href="/intro">
                <div>Temple, For you</div></Link>
            <hr/>
        </div>

    )
}

export default ToIntro