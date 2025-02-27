import $ from "@/utils/animation";
import Head from "next/head";
import Link from "next/link";
import Login from "@/components/layouts/Login";

export default function Register() {
  return (
    <Login pageName="Register" limitedAnimations={true}>
      <h1
        {...$({
          marginBottom: "16px",
          animate$fadeIn: {
            duration: "0.5s",
            delay: "0s",
            args: ["fromBottom"]
          }
        })}
      >
        Oops...
      </h1>

      <p
        {...$({
          marginBottom: "24px",
          animate$fadeIn: {
            duration: "0.5s",
            delay: "0.5s",
            args: ["fromBottom"]
          }
        })}
      >
        It looks like this email hasn't registered for the Scrapyard yet. You
        can register to join us, or you could try a different email address.
      </p>

      <div
        {...$({
          display: "flex",
          gap: "1rem"
        })}
      >
        <Link href="/">
          <button className="outlined">Back</button>
        </Link>

        <Link href="https://scrapyard.hackclub.com/#dream">
          <button className="red">Register →</button>
        </Link>
      </div>
    </Login>
  );
}
