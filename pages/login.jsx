import Navbar from "../components/Navbar";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

export default function LoginPage({ username }) {
  const router = useRouter();
  const { msg } = router.query;
  return (
    <Navbar>
      {msg ? <h3 className="red">{msg}</h3> : <></>}
      <form
        action="/api/login"
        method="POST"
        className="relative space-y-3 rounded-md bg-white p-6 shadow-xl lg:p-10 border border-gray-100 m-20 max-w-lg mx-auto"
      >
        <h1 className="text-xl font-semibold lg:text-2xl">Login</h1>
        <p className="pb-4 text-gray-500">Sign in to access your account</p>
        <div>
          <label className=""> Username </label>
          <input
            minLength="3"
            name="username"
            id="username"
            type="text"
            placeholder="Username"
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
            required
          />
        </div>
        <div>
          <label className=""> Password </label>
          <input
            minLength="5"
            name="password"
            id="password"
            type="password"
            placeholder="password"
            required
            className="mt-2 h-12 w-full rounded-md bg-gray-100 px-3 outline-none focus:ring"
          />
        </div>
        <div>
          <input
            type="submit"
            value="Login"
            className="mt-5 w-full rounded-md bg-blue-600 p-2 text-center font-semibold text-white outline-none focus:ring"
          />
        </div>
        <br />
        Don't have Account, Click Here to
        <Link href="/signup" className="ml-2">
          Sign Up
        </Link>
      </form>
    </Navbar>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });
  if (username != undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { username: false } };
}
