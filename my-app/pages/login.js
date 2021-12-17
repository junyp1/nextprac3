import { Form, Button } from "semantic-ui-react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  function login() {
    axios.post("/api/login").then((res) => {
      if (res.status === 200) {
        //로그인 성공
        router.push("/admin");
      }
    });
  }

  return (
    <div style={{ padding: "100px 0", textAlign: "center" }}>
      <Form>
        <Form.Field>
          <input placeholder="ID" />
        </Form.Field>
        <Form.Field>
          <input placeholder="Password" />
        </Form.Field>

        <Button color="blue" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
}
