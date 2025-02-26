import { getAllFlights } from "@/lib/airtable";
import Session from "@/lib/sessions";

export default async function handler(req, res) {
  const session = await Session.from(req, res);

  if (!session.authorized || !session.organizer)
    return res.json({ authorized: false });

  const flights = await getAllFlights();

  res.json({ data: flights });
}
