import Layout from "./layout/Layout";
import ToIntro from "./layout/ToIntro";
import Nav from "./layout/Nav";

export default function Home() {
    return (
        <div>
            <title>Temfo,</title>
            <h1> Welcome to Temfo, </h1>

        </div>
    )
}
Home.getLayout = (page) => (
    <Layout meta={{title: 'Temfo, 홈'}}>
        <ToIntro />
        <Nav />
        {page}
    </Layout>
)