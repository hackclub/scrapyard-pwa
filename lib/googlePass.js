const { GoogleAuth } = require("google-auth-library");
const jwt = require("jsonwebtoken");

class ScrapyardGooglePass {
  constructor() {
    this.baseUrl = "https://walletobjects.googleapis.com/walletobjects/v1";
    this.batchUrl = "https://walletobjects.googleapis.com/batch";
    this.classUrl = `${this.baseUrl}/eventTicketClass`;
    this.objectUrl = `${this.baseUrl}/eventTicketObject`;
    this.classSuffix = "scrapyard";
    this.issuerID = process.env.GOOGLE_ISSUER_ID;

    this.auth();
  }

  auth() {
    this.credentials = JSON.parse(
      Buffer.from(process.env.GOOGLE_IS_DUMB, "base64")
    );

    this.httpClient = new GoogleAuth({
      credentials,
      scopes: "https://www.googleapis.com/auth/wallet_object.issuer"
    });
  }

  async createObject({ user }) {
    let response;

    const objectSuffix = user.fields.ticketing_ticketNumber;

    // Check if the object exists
    try {
      response = await this.httpClient.request({
        url: `${this.objectUrl}/${issuerId}.${objectSuffix}`,
        method: "GET"
      });

      console.log(`Object ${issuerId}.${objectSuffix} already exists!`);

      return `${issuerId}.${objectSuffix}`;
    } catch (err) {
      if (err.response && err.response.status !== 404) {
        // Something else went wrong...
        console.log(err);
        return `${issuerId}.${objectSuffix}`;
      }
    }

    // See link below for more information on required properties
    // https://developers.google.com/wallet/tickets/events/rest/v1/eventticketobject
    let newObject = {
      id: `${issuerId}.${this.objectSuffix}`,
      classId: `${issuerId}.${this.classSuffix}`,
      state: "ACTIVE",
      textModulesData: [
        {
          header: "Waiver",
          body: user.fields.ticketing_waiverStatus
            .split("")
            .map((c, i) => (i == 0 ? c.toUpperCase() : c))
            .join(""),
          id: "waiver"
        },
        {
          header: "T-Shirt Size",
          body: `Unisex ${user.fields["T-Shirt Size"]}`,
          id: "t_shirt"
        }
      ],
      barcode: {
        type: "QR_CODE",
        value: `https://sy.hack.af/${user.fields.ticketing_ticketNumber}`
      },
      ticketHolderName: `${user.fields.first_name} ${user.fields.last_name}`,
      ticketNumber: user.fields.ticketing_ticketNumber,
      hexBackgroundColor: "#337D78",
      ticketType: {
        defaultValue: {
          language: "en",
          value: "Attendee"
        }
      }
    };

    let claims = {
      iss: this.credentials.client_email,
      aud: "google",
      origins: [],
      typ: "savetowallet",
      payload: {
        eventTicketObjects: [newObject]
      }
    };
    let token = jwt.sign(claims, this.credentials.private_key, {
      algorithm: "RS256"
    });

    return token;
  }
}

export async function generateGoogleJWT({ user }) {
  const googleJWT = await new ScrapyardGooglePass().createObject({ user });

  return googleJWT;
}
