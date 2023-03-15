import Nav from "./Nav";
import Footer from "./Footer";
import ToIntro from "./ToIntro";


const Layout =({children}) =>{
    return(
        <div id="wrapper">
            <ToIntro />
            <Nav />
            <main className="container">{children}</main>
            <Footer />
        </div>
    )
}

export default Layout ;