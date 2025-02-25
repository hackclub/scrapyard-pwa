// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { findAttendeeByPassId } from "@/lib/airtable";
import { generateApplePass } from "@/lib/applePass";

export default async function handler(req, res) {
  const { id } = req.query;

  const user = await findAttendeeByPassId(id);

  if (!user) {
    return res.send("Error, invalid link");
  }

  if (!user.fields.ticketing_ticketNumber) {
    await generateTicket(user);
  }

  res.setHeader("Content-Type", "application/vnd.apple.pkpass");

  res.send(await generateApplePass({ user }));
}
