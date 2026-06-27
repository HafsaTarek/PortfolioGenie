import React from "react";
// import NavBar from "../../components/NavBar";
//import styles from './Overview.module.css';
import Hero from '../../components/Hero/Hero';
import Features from '../../components/Features/Features'
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import ReadyToBuild from "../../components/ReadyToBuild/ReadyToBuild";
export default function Overview() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <ReadyToBuild />
    </>
  );
}