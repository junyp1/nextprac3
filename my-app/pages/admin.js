import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "semantic-ui-react";

export default function Admin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  function checkLogin() {
    axios.get("/api/isLogin").then((res) => {
      console.log(res.data);
      if (res.status === 200 && res.data.name) {
        //로그인 성공
        setIsLogin(true);
      } else {
        //로그인 실패
        router.push("/login");
      }
    });
  }

  function logout() {
    axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        router.push("/");
      }
    });
  }

  useEffect(() => {
    checkLogin();
  }, []);
  return <div>{isLogin && <Button onClick={logout}>Logout</Button>}</div>;
}
