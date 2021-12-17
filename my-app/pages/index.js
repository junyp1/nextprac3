import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ItemList from "../src/component/ItemList";
import { Header, Divider, Loader } from "semantic-ui-react";

export default function Home({ list }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>HOME | JUN</title>
        <meta name="description" content="NextJsPrac"></meta>
      </Head>

      <>
        <Header as={"h3"} style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider></Divider>
        <ItemList list={list.slice(0, 9)}></ItemList>
        <Header as={"h3"} style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <Divider></Divider>
        <ItemList list={list.slice(9)}></ItemList>
      </>
    </div>
  );
}

export async function getStaticProps() {
  const apiUrl = process.env.apiUrl;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      list: data,
      name: process.env.name,
    },
  };
}
