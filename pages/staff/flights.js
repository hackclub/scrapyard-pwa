import Flight from "@/components/Flight";
import Main from "@/components/layouts/Main";
import { getAllFlights } from "@/lib/airtable";
import Session from "@/lib/sessions";

export default function Flights({ flights }) {
  return (
    <Main pageName="Flights" red>
      <h1>Attendee Flight Board</h1>
      <h2>Arrivals</h2>
      <table
        style={{
          width: "80%",
          backgroundColor: "var(--green)",
          padding: "5px",
          border: "3px solid #296661",
          borderRadius: "5px"
        }}
      >
        <thead>
          <tr key="header">
            <th style={{ padding: "10px 0px" }}>Name</th>
            <th>Flight Number</th>
            <th>Arrival Time</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {flights
            .map((flightData) => {
              const { attendee, flight } = flightData;
              const legs = Object.keys(flight);

              const ausFlightLeg = legs.filter(
                (l) => flight[l].destinationAirport == "AUS"
              )[0];
              const ausFlight = flight[ausFlightLeg];

              if (!ausFlight) return;

              const time = ausFlight.liveData?.arrival?.scheduledTime?.local;

              return {
                attendee,
                flight: ausFlight,
                time
              };
            })
            .filter((f) => !!f?.time)
            .filter((f) => new Date(f.time) > new Date())
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((data) => (
              <Flight {...data} />
            ))}
        </tbody>
      </table>
      <br />
      <h2>Departures</h2>
      <table
        style={{
          width: "80%",
          backgroundColor: "var(--green)",
          padding: "5px",
          border: "3px solid #296661",
          borderRadius: "5px"
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "10px 0px" }}>Name</th>
            <th>Flight Number</th>
            <th>Departure Time</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {flights
            .map((flightData) => {
              const { attendee, flight } = flightData;
              const legs = Object.keys(flight);

              const ausFlightLeg = legs.filter(
                (l) => flight[l].originAirport == "AUS"
              )[0];
              const ausFlight = flight[ausFlightLeg];

              if (!ausFlight) return;

              const time = ausFlight.liveData?.departure?.scheduledTime?.local;

              return {
                attendee,
                flight: ausFlight,
                time
              };
            })
            .filter((f) => !!f?.time)
            .filter((f) => new Date(f.time) > new Date())
            .sort((a, b) => new Date(a.time) - new Date(b.time))
            .map((data) => (
              <Flight {...data} />
            ))}
        </tbody>
      </table>
    </Main>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  const session = await Session.from(req, res);

  if (!session.authorized || !session.organizer) {
    return {
      redirect: {
        destination: "/staff/login",
        permanent: false
      }
    };
  }

  const user = await session.currentUser();

  const flights = await getAllFlights();

  return {
    props: {
      user,
      flights
    }
  };
};
