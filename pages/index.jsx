import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import { getCookie } from "cookies-next";

export default function HomePage({ username }) {
  return (
    <div class="min-h-screen flex flex-col">
      <div class="bg-white w-full sticky top-0 z-50">
        <Navbar username={username} />
      </div>

      <div class="flex">
        <div class="bg-gray-200 w-64 h-full sticky">
          <Sidebar />
        </div>

        <div class="flex"></div>
      </div>
    </div>
  );
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
