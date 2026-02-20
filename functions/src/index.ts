import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import * as nodemailer from 'nodemailer'

admin.initializeApp()

const sendRevConfirmationMail = (email: string, name: string) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  let template = `
    <html>
      <body>
        <p>
          Please avoid this email if already received.
          <br />
          ----------------------
          <br />
        </p>
        <p>
          Dear ${name},
          <br />
          Greetings!
          
          <br /><br />
          On behalf of the Sir Syed Global Scholar Award (SSGSA), we sincerely
          appreciate your support to our program to empower aspiring students
          for higher education abroad.

          <br /><br />
          We are reaching out to invite you to serve as a reviewer for the 
          upcoming SSGSA application cycle for the session 2026. Applications 
          for this session are currently open and will close on March 06, 2026. 
          We plan to distribute applications for review by March 16, 2026, and 
          your participation in this process would be greatly valued.
          
          <br /><br />
          To confirm your willingness to serve as a reviewer, please click 
          on the link below:

          <br /><br />
          <b>Reviewer ConfirmationLink: https://www.ssgsa.us/reviewer/confirmation/${email}</b>
                    
          <br /><br />
          Review Process:
          <br />
          1. You will be assigned approximately 10-12 applications at most. It should not take more than 3 hours in total to review all the applications.
          <br /> 
          2. You will have around 15 days to review the applications.
          <br />
          3. The SSGSA Applications Team will provide you with detailed guidelines via a separate email once you confirm your participation.
          <br />
          
          <br /><br />
          If you have any questions or need further clarification regarding the review process,
          please feel free to reach out to us at application.ssgsa@gmail.com or chair@ssgsa.us. 

          <br /><br /> 
          Thank you for considering our invitation. Your support as a reviewer would be 
          invaluable to both SSGSA and the students we serve.

          <br /><br />
          Warm regards,
          <br />
          Dr. Sabahuddin Ahmad & Ms. Rabia Omar
          <br />
          Co-Chairs SSGSA
        </p>
      </body>
    </html>
  `

  let mailDetails = {
    from: 'devs.ssgsa@gmail.com',
    to: email,
    cc: 'chair@ssgsa.us',
    replyTo: 'chair@ssgsa.us',
    subject: '[SSGSA] Request to Review Applications',
    html: template,
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      functions.logger.info(`Error Occurs, ${err}`, { structuredData: true })
    }
  });
}


const sendRevSetsMail = (email: string, name: string, sets: string) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    }
  });

  let template = `
    <html>
      <body>
        <p>
          ------------------------------------------------------------------
          <br />
          This is an auto-generated email from the SSGSA Application Portal.
          Please write to us at contact@ssgsa.us or chair@ssgsa.us if you have
          questions.
          <br />
          ------------------------------------------------------------------
          <br />
        </p>
        <p>
          Dear ${name},
          <br />
          Greetings!
          
          <br /><br />
          We thank you again for agreeing to review the applications for the
          SSGSA Application Cycle 2026-27. We have allotted 10 to 15
          applications for you to review.

          <br /><br />
          If you have reviewed the SSGSA applications in the past, you will
          mostly know the drill but there are a few updates that you must take
          note of. We held an orientation session for the same on Feb 18, 2023
          and we are providing the link to the slides and recording from our
          orientation for your reference.

          <br /><br />
          <b>Video:
          https://drive.google.com/file/d/1LyHx2Ey55Yd5InmFJwUSdL7OrQI-W_El/view?usp=sharing
          </b>

          <br /><br />
          <b>Slides:
          https://docs.google.com/presentation/d/1lU7OPCbw1oifRJLxrwj7I5_FmyIs8C28/edit?usp=sharing&ouid=117039052523548927361&rtpof=true&sd=true
          </b>

          <br /><br />
          <b>We strongly encourage you to have a look at orientation slides and
          recording before you start reviewing.</b>

          <br /><br />
          We have minor revisions to the grading rubric with details to bring
          more consistency in grading. You can download the rubric by logging
          in to the portal. Then, there are specific columns for entering the
          grades from each section as per the rubric.

          <br /><br />
          <b>Link to the portal: https://www.ssgsa.us/reviewer</b>
          
          <br /><br />
          <b>Username:</b> ${email}
          <br />
          <b>Password:</b> The password you created at the time of signup. If
          you don’t remember that, you have an option to reset it when you
          click on portal

          <br /><br />
          <b>Deadline:</b> March 10, 2022

          <br /><br />
          You have been allotted <b>Set ${sets}</b>. Please let us know if
          it is different from the set in the portal or have any issues, please
          do not hesitate to contact us at : contact@ssgsa.us or chair@ssgsa.us.
          
          <br /><br />
          Please try to complete the reviews before the deadline. If for any
          reason, you are unable to review the allotted applications, <b>please
          reach out to us at least a week before the deadline</b>. It becomes
          difficult to arrange for alternate reviewers at the last moment,
          causing issues in the review quality and inordinate delays in our
          decisions.

          <br /><br />
          Best Regards,
          <br />
          SSGSA Applications Team
        </p>
      </body>
    </html>
  `

  let mailDetails = {
    from: 'SSGSA Admin <devs.ssgsa@gmail.com>',
    to: email,
    cc: 'chair@ssgsa.us',
    replyTo: 'chair@ssgsa.us',
    subject: '[SSGSA] Credentials for Reviewing Applications',
    html: template,
  };
  
  return mailTransporter.sendMail(mailDetails);
}

export const sendReviewerConfirmationMail =
  functions.firestore.document("reviewer_invites/{email}").onWrite((change, context) => {
    if (change.after.exists) {
      const newData = change.after.data()
      if (change.before.exists) {
        const prevData = change.before.data()
        if (newData && prevData && newData.reminder !== prevData.reminder)
          sendRevConfirmationMail(context.params.email, newData.name)
      } else if (newData) sendRevConfirmationMail(context.params.email, newData.name)
    }
  })

export const sendReviewerSetsMail =
  functions.https.onRequest((request, response) => {
    const email = request.query.email
    const name = request.query.name
    let sets = request.query.sets

    functions.logger.info(
      'Sending sets mail to reviewer ' +
      email + ' with data as (Name: ' +
      name + ' and Sets: ' +
      sets + ')',
      { structuredData: true }
    )
    sendRevSetsMail(String(email), String(name), String(sets))
      .then(() => response.status(200).send("Mail Sent to " + name))
      .catch(() => response.status(400).send("Error occured while sending mail to " + name))
  })
