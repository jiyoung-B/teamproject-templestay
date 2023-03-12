import React from "react"
import Header from '../components/Header';
import Footer from "../components/Footer";
import ToIntro from "../components/ToIntro";
// import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div/* className={styles.container}*/>
        <title>Temfo,</title>
        <ToIntro />
        <Header />
        <h1> Welcome to Temfo, </h1>
        <Footer />
    </div>
  )
}
