function base64decode(base64) {
  console.log(base64, "to decode")
  return Buffer.from(base64, "base64").toString("utf8");
}

export function getKeys() {
  const [cert, key, password] = base64decode(process.env.APPLE_KEYS_CERTS).split(
    "@@@@@@@"
  );

  return {
    certBuffer: Buffer.from(cert, "utf8"),
    keyBuffer: Buffer.from(key, "utf8"),
    password
  };
}

export function applyKeys(template) {
  const { certBuffer, keyBuffer, password } = getKeys();

  template.setCertificate(certBuffer);
  template.setPrivateKey(keyBuffer, password);

  return template;
}
