import Link from 'next/link'
import img from "next/image";
import Footer from "../layout/Footer";

const Intro = () => {

    return (
        <div>
            <div>
                <Link href="/">
                    <div style={{background: "grey"}}>
                        <h1> Temfo, </h1>
                        <p>마음챙김, 템포와 함께 떠나보아요.</p>
                        <img src="/img/sampleImg_1.png" alt="intro_img_1" width={1200} height={400}/>
                    </div>
                </Link>
            </div>
            <div>
                중앙-소개
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
                <div><img src="/img/sampleImg_2.png" alt="intro_img_2" width={500} height={400} /></div>
            </div>
            <div style={{width:1800}}>
                하단-에디터픽
                <ul style={{display: 'inline-block'}}>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                    <li><Link href="/temple"><img src="/img/sampleImg_2.png" alt="intro_img_2" width={200} height={150} /></Link></li>
                </ul>
            </div>
            <Footer />
        </div>

    )
}

export default Intro