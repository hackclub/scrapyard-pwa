import { findAttendee, findOrganizer } from "@/lib/airtable";
import sendgrid, { loginCodeEmail } from "@/lib/email";
import Session from "@/lib/sessions";
import { setCookie } from "cookies-next";

const oneWeek = 60 * 60 * 24 * 7;

export default async function handler(req, res) {
  let email, name;

  if (req.body.admin) {
    const organizer = await findOrganizer(req.body.email);

    if (!organizer) return res.json({ registered: false });

    email = organizer.fields.email;
    name = organizer.fields.ticketing_firstName;
  } else {
    const attendee = await findAttendee(req.body.email);

    if (!attendee) return res.json({ registered: false });

    email = attendee.fields.email;
    name = attendee.fields.first_name;
  }

  const session = await Session.create(
    email,
    req.body.admin ? "organizer" : "attendee"
  );
  setCookie("session", session.id, { req, res, maxAge: oneWeek });

  const loginCode = await session.generateLoginCode();
  let codeSent = true;

  try {
    await sendgrid.send({
      to: email,
      from: `${process.env.SENDGRID_NAME} <${process.env.SENDGRID_EMAIL}>`,
      replyTo: "scrapyard@hackclub.com",
      subject: `Scrapyard Login Code: ${loginCode}`,
      ...loginCodeEmail(loginCode, name)
    });
  } catch (err) {
    codeSent = false;

    console.error(err);
    console.error(err.response.body.errors);
  }

  return res.json({ registered: true, codeSent });
}
