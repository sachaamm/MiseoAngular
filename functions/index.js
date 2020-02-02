const functions = require("firebase-functions");

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

const PDFDocument = require("pdfkit");
const fs = require("fs");

const blobStream = require("blob-stream");

const userMail = "informaservices.dev@gmail.com";
const userPassword = "M1Se0@!12345";

/**
 * Here we're using Gmail to send
 */
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: userMail,
    pass: userPassword
  }
});

exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dest = "sachaamm@gmail.com";

    const mailOptions = {
      from: "MiseoSolutions <" + userMail + ">", // Something like: Jane Doe <janedoe@gmail.com>
      to: dest,
      subject: "Votre devis pour un site internet", // email subject
      html: `<p style="font-size: 16px;">Voici notre devis pour votre demande de site internet. </p>
                    <p style="font-size: 12px;">Vous avez . </p>
                <br />
                <img src="https://miseosolutions.com/miseoAngular/assets/img/logo/miseo.png" />
            ` // email content in HTML
      // An array of attachments
      /*
        attachments: [
          // String attachment
          {
            filename: "output.pdf",
            content: "new important notes",
            contentType: "application/pdf" // optional, would be detected from the filename
          }
        ]
        */
    };

    // returning result
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});

exports.createPDF = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    // Create a document
    const doc = new PDFDocument();

    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream("output.pdf"));

    // Embed a font, set the font size, and render some text
    doc
      .font("fonts/Gayathri-Regular.ttf")
      .fontSize(25)
      .text("Some text with an embedded font!", 100, 100);

    // Add an image, constrain it to a given size, and center it vertically and horizontally
    doc.image("img/miseo.png", {
      fit: [250, 300],
      align: "center",
      valign: "center"
    });

    // Add another page
    doc
      .addPage()
      .fontSize(25)
      .text("Here is some vector graphics...", 100, 100);

    // Draw a triangle
    doc
      .save()
      .moveTo(100, 150)
      .lineTo(100, 250)
      .lineTo(200, 250)
      .fill("#FF3300");

    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    doc
      .scale(0.6)
      .translate(470, -380)
      .path("M 250,75 L 323,301 131,161 369,161 177,301 z")
      .fill("red", "even-odd")
      .restore();

    // Add some text with annotations
    doc
      .addPage()
      .fillColor("blue")
      .text("Here is a link!", 100, 100)
      .underline(100, 100, 160, 27, { color: "#0000FF" })
      .link(100, 100, 160, 27, "http://google.com/");

    // Finalize PDF file
    doc.end();

    return res.send("Created");
  });
});
