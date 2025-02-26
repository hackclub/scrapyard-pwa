export default function Flight({ attendee, flight, time }) {
  return (
    <tr key={attendee.id}>
      <td>{attendee.fields["Preferred Name"]}</td>
      <td>
        {flight.airline}
        {flight.flightNumber}
      </td>
      <td>{time ? new Date(time).toLocaleString() : "No time data"}</td>
      <td>{attendee.fields["Phone"]}</td>
    </tr>
  );
}
