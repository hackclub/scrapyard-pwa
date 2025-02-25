// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { findAttendeeByPassId } from "@/lib/airtable";
import { generateGoogleJWT } from "@/lib/googlePass";
import { generateTicket } from "../../attendee/generateTicket";

export default async function handler(req, res) {
  const { id } = req.query;

  const user = await findAttendeeByPassId(id);

  if (!user) {
    return res.send("Error, invalid link");
  }

  if (!user.fields.ticketing_ticketNumber) {
    await generateTicket(user);
  }

  const jwt = await generateGoogleJWT({ user });
  res.redirect(303, `https://pay.google.com/gp/v/save/${jwt}`);
}
