import { getCookie } from "cookies-next";
import Link from "next/link";
import Navbar from "../../components/navbar";

export default function Images({ username }) {
  return <Navbar username={username} />;
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });
  if (username == undefined) {
    username = false;
  }
  return { props: { username } };
}
