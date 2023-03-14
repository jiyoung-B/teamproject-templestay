import Nav from "./Nav";
import Footer from "./Footer";
import ToIntro from "./ToIntro";


const Layout =({children}) =>{
    return(
        <div className="container" id="wrapper">
            <ToIntro />
            <Nav />
            <main>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout ;