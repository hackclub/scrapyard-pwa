import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_KEY);

export default sendgrid;

export function loginCodeEmail(loginCode) {
  return { html: `
  <html>
  <head>
  <style>
    .wrapper {
      padding: 1rem;
      margin: 0 auto;
      max-width: 600px;
      font-family: 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Fira Sans', 'Oxygen', 'Ubuntu', 'Helvetica Neue', sans-serif;
    }

    .container {
      padding: 0;
      margin: 0;
      width: 100%;
      max-width: 100%;
    }

    a {
      color: #8492a6;
    }

    .section {
      padding: 0.5rem 1rem;
    }

    .footer {
      font-size: 0.8rem;
      line-height: 1.2rem;
      color: #606a79;

      background-position: center;
      background-size: cover;
      background-repeat: repeat-x;
    }

    .footer p {
      margin-block-start: 0.5rem;
      margin-block-end: 0.5rem;
    }

    .footer a {
      color: #646464;
    }
  </style>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  </head>
  <body>
  <div class="wrapper">
    <div class="container">
      <table>
        <thead>
        <tr>
          <th>
            <div class="section" style="text-align: left;">
              <a
                href="https://hackclub.com"
                target="_blank"
              >
                <img
                  src="https://assets.hackclub.com/icon-rounded.png"
                  alt="Hack Club Logo"
                  style="width: 2.5rem"
                />
              </a>
            </div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>
            <div
              class="section"
            >
            <p>Hi 👋,</p>
            <p>You requested a login code for The Summit. It's here:</p>
            <pre style="text-align:center;background-color:#ebebeb;padding:8px;font-size:1.5em;border-radius:4px">${loginCode}</pre>
            <p>- Hack Club</p>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div
              class="footer section"
              style="background-image: url('https://hackclub.com/pattern.svg');"
            >
              <p>
                Hack Club |
                <a href="mailto:team@hackclub.com">team@hackclub.com</a>
                |
                <a href="tel:+1855625HACK">1-855-625-HACK</a>
              </p>
              <p>
                Hack Club is an
                <a href="https://hackclub.com/opensource" target="_blank">open source</a>
                and
                <a href="https://hcb.hackclub.com/hq" target="_blank"
                  >financially transparent</a
                >
                501(c)(3) nonprofit. Our EIN is 81-2908499. By the students, for the
                students.
              </p>
            </div>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
  
  </body>
  </html>
`,
text: `Hi 👋, \n\n

You requested a login code for The Summit. Here it is: ${loginCode}. \n\n

- Hack Club`}
}