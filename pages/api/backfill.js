import { updateAttendeeById, registrationsTable } from "@/lib/airtable";
import { ticketNumber } from "@/utils/ticketNumber";

export default async function handler (req, res) {
    const data = await registrationsTable.read({
        filterByFormula: `ticketing_ticketNumber = ""`,
    })
    const records = data.map(record => ({
        name: record.fields["Full Name"],
        email: record.fields["Email"],
        id: record.id,
        ticketNumber: record.fields["ticketing_ticketNumber"]
    }));

    for (let i = 0; i < records.length; i++) {
        const record = records[i];

    const number = await ticketNumber(
        record.name, record.email
      );
      await updateAttendeeById(record.id, { ticketing_ticketNumber: `${+number}` });
      
      console.log("Finished updating record", record.id, `(${i} / ${records.length})`);
      
    }

    res.status(200).json({
        message: "Backfilled records",
        count: records.length
    })
}