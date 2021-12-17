import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Item from "../../src/component/Item";
import { Loader } from "semantic-ui-react";
import Head from "next/head";

const Post = ({ item, name }) => {
  const router = useRouter();

  console.log(router.isFallback);

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered"></Loader>
      </div>
    );
  }

  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="설명" content={item.description}></meta>
          </Head>
          {name}환경입니다.
          <Item item={item}></Item>
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const apiUrl = process.env.apiUrl;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    // paths: [
    //   { params: { id: "495" } },
    //   { params: { id: "488" } },
    //   { params: { id: "477" } },
    // ],
    paths: data.slice(0, 9).map((item) => ({
      params: { id: item.id.toString() },
    })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    props: {
      item: data,
      name: process.env.name,
    },
  };
}
