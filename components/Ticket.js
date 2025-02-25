import Tilt from "react-parallax-tilt";

function Cutout({ side }) {
  return (
    <img
      src="/assets/cutout.png"
      className="absolute noselect nodrag"
      style={{
        top: "50%",
        [side]: "0px",
        transform:
          "translateY(-50%) " +
          (side === "right"
            ? "rotateY(180deg) translateX(-1px)"
            : "rotateY(0deg) translateX(-1px)"),
        height: "64px"
      }}
    />
  );
}
export function PreloadTicket({ user }) {
  const data = new Proxy(user.fields, {
    get: (target, prop) => {
      const newProp = prop.startsWith("_") ? "ticketing" + prop : prop;
      console.log(target, newProp);
      return target[newProp];
    }
  });
  return (
    <div
      style={{ width: "1px", height: "1px", opacity: 0, overflow: "hidden" }}
    >
      <img
        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://hack.af/${data._ticketNumber}`)}&ecc=M&color=337D78&bgcolor=ffffff&format=svg`}
        height="120px"
      />
      <img src="https://scrapyard.hackclub.com/favicon.png" height="50px" />
    </div>
  );
}

export default function Ticket({ user }) {
  const data = new Proxy(user.fields, {
    get: (target, prop) => {
      const newProp = prop.startsWith("_") ? "ticketing" + prop : prop;
      console.log(target, newProp);
      return target[newProp];
    }
  });

  console.log(user.fields, "A");

  return (
    <div
      className="nicescrollbar ns2"
      style={{
        width: "100vw",
        maxWidth: "100vw",
        margin: "0px calc(0px - max(calc((100vw - 1000px) / 2), 24px))",
        overflowX: "scroll",
        overflowY: "hidden",
        whiteSpace: "nowrap"
      }}
    >
      <div
        style={{
          margin: "40px max(calc((100vw - 1000px) / 2), 24px)",
          width: "max-content"
        }}
      >
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} glareEnable={false}>
          <div
            className="flex flex-row w-100 red-i relative"
            style={{
              width: "1000px"
            }}
          >
            <Cutout side="left" />
            <Cutout side="right" />
            <div
              className="flex bg-tan p3"
              style={{
                borderRadius: "16px",
                flex: "1",
                flexDirection: "column",
                gap: "8px",
                border: "3px dotted var(--red)",
                padding: "64px 48px",
                paddingTop: "48px",
                paddingRight: "16px",
                // backgroundImage: 'url(https://cloud-456eompb3-hack-club-bot.vercel.app/0big_ticket.png)',
                backgroundSize: "cover"
              }}
            >
              <div
                className="flex"
                style={{ alignItems: "center", gap: "32px" }}
              >
                <h1 className={"cook"}>Scrapyard</h1>
                <span
                  className={"space"}
                  style={{ fontWeight: "500", fontSize: "1.7em" }}
                >
                  {data._ticketNumber}
                </span>
              </div>
              <div className="flex" style={{ flexDirection: "column" }}>
                <span>Ticket issued to</span>
                <div
                  className="flex"
                  style={{ alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "1.7em" }}>
                    {data.first_name} {data.last_name}
                  </span>
                  <span>from {user.fields.travelingFrom}</span>
                </div>
              </div>
              <div
                className="grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "12px"
                }}
              >
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>Starts at</span>
                  <span style={{ fontSize: "1.4em" }}>12:00 03/01</span>
                </div>
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>Ends at</span>
                  <span style={{ fontSize: "1.4em" }}>15:00 03/02</span>
                </div>
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>Venue</span>
                  <span style={{ fontSize: "1.4em" }}>FUTO (Austin)</span>
                </div>
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>T-Shirt</span>
                  <span style={{ fontSize: "1.4em" }}>
                    {data["T-Shirt Size"]}
                  </span>
                </div>
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>Travel</span>
                  <span style={{ fontSize: "1.4em" }}>
                    {"Unknown" || data.transportMethod}
                  </span>
                </div>
                <div className="flex" style={{ flexDirection: "column" }}>
                  <span>Attributes</span>
                  <span style={{ fontSize: "1.4em" }}>
                    {user.fields.attributes || "N"}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex bg-tan p3"
              style={{
                borderRadius: "16px",
                width: "300px",
                border: "3px dotted var(--red)",
                borderLeft: "none",
                flexDirection: "column",
                gap: "8px"
              }}
            >
              <span style={{ fontSize: "1.7em" }}>
                {data.first_name} {data.last_name}
              </span>
              <div
                className="flex mt1 mb2"
                style={{ alignItems: "center", gap: "26px" }}
              >
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(`https://hack.af/${data._ticketNumber}`)}&ecc=M&color=337D78&bgcolor=ffffff&format=svg`}
                  height="120px"
                />
                <img
                  src="https://scrapyard.hackclub.com/favicon.png"
                  height="50px"
                />
              </div>
              <div
                className="flex"
                style={{ alignItems: "center", gap: "8px" }}
              >
                <div>T-Shirt Size</div>
                <div
                  style={{
                    flexGrow: "1",
                    height: "0.5px",
                    border: "0.5px solid var(--red)"
                  }}
                />
                <div>{data["T-Shirt Size"]}</div>
              </div>
              <div
                className="flex"
                style={{ alignItems: "center", gap: "8px" }}
              >
                <div>Travel</div>
                <div
                  style={{
                    flexGrow: "1",
                    height: "0.5px",
                    border: "0.5px solid var(--red)"
                  }}
                />
                <div>{"Unknown" || data.transportMethod}</div>
              </div>
              <div
                className="flex"
                style={{ alignItems: "center", gap: "8px" }}
              >
                <div>Hometown</div>
                <div
                  style={{
                    flexGrow: "1",
                    height: "0.5px",
                    border: "0.5px solid var(--red)"
                  }}
                />
                <div>{user.fields.travelingFrom}</div>
              </div>
              <div
                className="flex"
                style={{ alignItems: "center", gap: "8px" }}
              >
                <div>Attributes</div>
                <div
                  style={{
                    flexGrow: "1",
                    height: "0.5px",
                    border: "0.5px solid var(--red)"
                  }}
                />
                <div>{user.fields.attributes || "N"}</div>
              </div>
            </div>
          </div>
        </Tilt>
      </div>
    </div>
  );
}
