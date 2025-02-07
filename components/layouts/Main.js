import $ from "@/utils/animation";
import Head from "next/head";
import useBreakpoints from "@/utils/useBreakpoints";
import Link from "next/link"
import api from "@/lib/api";
import { useRouter } from "next/router";

const akaya = "akaya";
const cook = "cook";
const space = "space";

export default function Login({ pageName, children, limitedAnimations = false, red = false }) {
  const router = useRouter();
  return (
    <div
      {...$[akaya]({
        width: "100vw",
        padding: "0px",
        margin: "0px",
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      })}
    >
      <Head>
      <title>{pageName + " – Hack Club Scrapyard"}</title>
      </Head>
      <div style={{
        position: 'absolute',
        top: '55px',
        left: '0px',
        height: '1px',
        width: '100%',
        background: 'var(--tan)',
        zIndex: '10000000000'
      }} />
      <style>{`#nprogress .bar {
        top: 50px!important;
      }`}</style>
      <nav {...$[akaya]({
        display: 'flex',
        height: '56px',
        background: 'var(--red)',
        padding: '8px 24px',
        alignItems: 'center',
        gap: '16px',
        borderBottom: "6px solid var(--tan)"
      })}> 
        <img
          {...$({
            height: '32px'
          })}
          src="https://assets.hackclub.com/flag-standalone.svg"
        />
        <h2 {...$[cook]({display: ["none", "block"]})}>
          Scrapyard
        </h2>
        <div style={{flexGrow: 1}} /> 
        {/* <Link href="/dashboard" style={{ textDecoration: 'none'}}>
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            <span {...$({display: ["none", "inline-block"]})}>Your</span> Ticket
          </h3>
        </Link>
        <Link href="/schedule" style={{ textDecoration: 'none'}}>
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            Schedule
          </h3>
        </Link>
        <Link href="/photos" style={{ textDecoration: 'none'}}>
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            <span {...$({display: ["none", "inline-block"]})}>Photo & Video</span> Album
          </h3>
        </Link> */}
        <Link href="/dashboard" style={{ textDecoration: 'none'}}>
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            Dashboard
          </h3>
        </Link>
        <Link href="/schedule" style={{ textDecoration: 'none'}}>
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            Schedule
          </h3>
        </Link>
        <a
          href="/"
          {...$({ color: '#337D78', textDecoration: 'none' })}
          onClick={async (e) => {
            e.preventDefault();
            await api.auth.sessions.destroy.post();
            router.push("/");
          }}
        >
          <h3 {...$({color: '#337D78', textDecoration: 'none'})}>
            Sign Out
          </h3>
        </a>
      </nav>
      <div {...$[akaya.className]({
        background: 'var(--tan)',
        flexGrow: 1,
        color: 'var(--red)',
        ...(red ? {
          background: 'var(--red)',
          color: 'var(--tan)',
        } : {})
      })}>
        <div style={{
          maxWidth: 'min(1000px, 100vw - 48px)',
          // padding: 'max(calc((100vw - 1000px) / 2), 24px)',
          margin: '0 auto',
          paddingTop: '48px',
          paddingBottom: '24px',
          width: '100%',
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
