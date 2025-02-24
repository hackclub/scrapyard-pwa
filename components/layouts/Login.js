import $ from "@/utils/animation";
import Head from "next/head";
import useBreakpoints from "@/utils/useBreakpoints";

export default function Login({
  pageName,
  children,
  limitedAnimations = false,
  onFlagClick,
  staff
}) {
  return (
    <main
      {...$["akaya"]({
        width: "100vw",
        height: "100vh",
        padding: "0px",
        margin: "0px",
        display: "flex",
        flexDirection: ["column-reverse", "row"]
      })}
    >
      <Head>
        <title>{pageName + " – Hack Club Scrapyard"}</title>
      </Head>
      <section
        {...$({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "start",
          width: ["100vw", "400px", "min(40vw, 600px)"],
          background: "url('https://scrapyard.hackclub.com/backgrounds/ripped-paper.png')",
          color: "var(--red)",
          padding: ["40px 24px", "24px"]
        })}
      >
        {children}
      </section>

      <aside
        {...$({
          // border: "6px solid var(--tan)",
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          height: "100vh",
          background: `url("https://scrapyard.hackclub.com/backgrounds/cutting-mat.png")`,
          backgroundPosition: "left",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        })}
      >
        <div
          {...$({
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "min(35vh, 310px)",
            gap: "30px"
          })}
        >
          <img
            {...$({
              maxWidth: "min(30vw, 180px)",
              ...(limitedAnimations
                ? {}
                : {
                    animate$fadeIn: {
                      args: ["fromBottom"],
                      delay: "0.5s"
                    }
                  })
            })}
            src={
              staff
                ? "https://icons.hackclub.com/api/icons/0x337D78/clubs-fill"
                : "https://assets.hackclub.com/flag-standalone.svg"
            }
            onClick={onFlagClick}
          />
          <h1
            {...$["cook"]({
              ...(limitedAnimations
                ? {}
                : {
                    animate$fadeIn: {
                      args: ["fromBottom"],
                      delay: "1s"
                    }
                  })
            })}
          >
            {staff ? "Scrapyard Organizers" : "Scrapyard"}
          </h1>
        </div>
      </aside>
    </main>
  );
}
