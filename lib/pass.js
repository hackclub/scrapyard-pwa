import { Template } from "@walletpass/pass-js";
import fs from "fs/promises";
import { applyKeys } from "./keys.js";
import { resizeImage } from "./image.js";

const assetsPath =
  process.env.NODE_ENV == "development"
    ? "http://localhost:" + process.env.PORT + "/assets/apple-wallet-pass"
    : "https://scrapyard-ticketing.hackclub.dev/assets/apple-wallet-pass";

async function addAsset(template, name, bufferOrPath, smallestScale) {
  let buffer = bufferOrPath;

  if (typeof bufferOrPath === "string") {
    buffer = await fs.readFile(bufferOrPath);
  }

  const x1 = await resizeImage(buffer, smallestScale, smallestScale);
  const x2 = await resizeImage(buffer, smallestScale * 2, smallestScale * 2);
  const x3 = await resizeImage(buffer, smallestScale * 3, smallestScale * 3);

  await template.images.add(name, x1, "1x");
  await template.images.add(name, x2, "2x");
  await template.images.add(name, x3, "3x");
}

export async function generatePass({ user }) {
  const template = new Template("eventTicket", {
    passTypeIdentifier: "pass.com.hackclub.scrapyard",
    teamIdentifier: "P6PV2R9443",
    organizationName: "Scrapyard",
    sharingProhibited: true,
    barcodes: [
      {
        message: `https://sy.hack.af/${user.fields.ticketing_ticketNumber}`,
        format: "PKBarcodeFormatQR",
        messageEncoding: "iso-8859-1"
      }
    ],
    serialNumber: user.fields.ticketing_ticketNumber,
    appLaunchURL: "https://scrapyard.hackclub.app"
    // locations: [
    //   {
    //     latitude: 37.75888471463502,
    //     longitude: -122.4255812955357
    //   }
    // ],
    // relevantDate: new Date('March 2, 2025 18:00:00 GMT-0800'),
  });

  const [icon, strip, logo] = await Promise.allSettled(
    ["/hackclub.png", "/banner.png", "/scrapyard.png"].map((fileName) => {
      return (async () => {
        const url = assetsPath + fileName;
        const arrayBuffer = await fetch(url).then((res) => res.arrayBuffer());

        console.log({
          url,
          fileName,
          arrayBuffer
        });

        return Buffer.from(arrayBuffer);
      })();
    })
  );

  await template.images.add("icon", icon.value);
  await template.images.add("strip", strip.value, "3x");

  await addAsset(template, "logo", logo.value, 160);

  console.log(template);
  applyKeys(template);

  const pass = template.createPass({
    serialNumber: "123456",
    description: "Pass",
    foregroundColor: "rgb(255, 255, 255)",
    backgroundColor: "rgb(51, 125, 120)",
    labelColor: "rgb(240, 240, 240)",
    logoText: "Scrapyard"
  });

  // pass.headerFields.add({
  //   key: "date",
  //   value: new Date('February 28, 2025 18:00:00 GMT-0800'),
  //   dateStyle: "PKDateStyleMedium",
  //   //"dataDetectorTypes": "PKDataDetectorTypeCalendarEvent",
  //   label: "Date"
  // });

  pass.secondaryFields.add({
    key: "name",
    value: `${user.fields.first_name} ${user.fields.last_name}`,
    label: "Attendee"
  });

  // pass.secondaryFields.add({
  //   key: "location",
  //   value: "Austin, TX",
  //   "attributedValue": "http://maps.apple.com/?address=1044+Liberty+Park+Dr,+Austin,+TX+78746",
  //   label: "Location",
  //   "textAlignment" : "PKTextAlignmentRight"
  // });

  // pass.relevantDate = new Date("2-28-2025");

  pass.auxiliaryFields.add({
    key: "waiver",
    value: user.fields.ticketing_waiverStatus
      .split("")
      .map((c, i) => (i == 0 ? c.toUpperCase() : c))
      .join(""),
    label: "Waiver"
  });

  pass.auxiliaryFields.add({
    key: "t_shirt",
    value: `Unisex ${user.fields["T-Shirt Size"]}`,
    label: "T-Shirt Size",
    textAlignment: "PKTextAlignmentRight"
  });

  const buf = await pass.asBuffer();

  return buf;
}
