import { objectFilter } from "@/utils/objectIterationUtils";

const AirtablePlus = require("airtable-plus");
console.log(process.env.AIRTABLE_BASE, process.env.AIRTABLE_KEY);
export const registrationsTable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE,
  apiKey: process.env.AIRTABLE_KEY,
  tableName: "Flagship Attendees"
});

const organizersTable = new AirtablePlus({
  baseID: process.env.AIRTABLE_BASE,
  apiKey: process.env.AIRTABLE_KEY,
  tableName: "Flagship Organizers"
});

function recordFields(record) {
  const ticketingFields = objectFilter(record.fields, (_, key) =>
    key.startsWith("ticketing_")
  );

  return {
    email: record.fields.Email || record.fields.email || null,
    "T-Shirt Size": record.fields["T-Shirt Size"] || null,
    first_name: record.fields["Preferred Name"] || null,
    last_name:
      (record.fields["Full Name"] || "").split(" ").reverse()[0] || null,
    travelingFrom: record.fields["Address–City"] || null,
    transportation: null,
    attributes: record.fields["attributes"] || null,
    ...ticketingFields
  };
}

export async function findAttendee(email) {
  return await registrationsTable
    .read({
      filterByFormula: `Email = "${email}"`,
      maxRecords: 1
    })
    .then((records) =>
      records.length > 0
        ? {
            ...records[0],
            fields: recordFields(records[0])
          }
        : null
    );
}

export async function findAttendeeById(id) {
  return await registrationsTable.find(id).then((record) =>
    record
      ? {
          ...record,
          fields: recordFields(record)
        }
      : null
  );
}

export async function findAttendeeByNumber(number) {
  console.log(`ticketing_ticketNumber = ${number}`);
  return await registrationsTable
    .read({
      filterByFormula: `ticketing_ticketNumber = ${number}`,
      maxRecords: 1
    })
    .then((records) =>
      records.length > 0
        ? {
            ...records[0],
            fields: recordFields(records[0])
          }
        : null
    );
}

export async function findOrganizer(email) {
  return await organizersTable
    .read({
      filterByFormula: `email = "${email}"`,
      maxRecords: 1
    })
    .then((records) =>
      records.length > 0
        ? {
            ...records[0],
            fields: recordFields(records[0])
          }
        : null
    );
}

export async function findAttendeeByPassId(passId) {
  return await registrationsTable
    .read({
      filterByFormula: `ticketing_passId = "${passId}"`,
      maxRecords: 1
    })
    .then((records) =>
      records.length > 0
        ? {
            ...records[0],
            fields: recordFields(records[0])
          }
        : null
    );
}

export async function updateAttendeeById(id, data) {
  return await registrationsTable.update(id, data);
}

export async function getAllFlights() {
  const signedAttendees = await registrationsTable.read({
    filterByFormula: `ticketing_waiverStatus = "signed"`
  });

  const flights = [];
  for (const attendee of signedAttendees) {
    if (attendee.fields["Stipend Travel Info"]) {
      flights.push({
        attendee,
        flight: JSON.parse(attendee.fields["Stipend Travel Info"])
      });
    } else if (attendee.fields["Flagship Travel Info"]) {
      flights.push({
        attendee,
        flight: JSON.parse(attendee.fields["Flagship Travel Info"])
      });
    }
  }

  return flights;
}
