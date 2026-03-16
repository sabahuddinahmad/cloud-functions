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

const sendIntConfirmationMail = (email: string, name: string) => {
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
          <b>Interviewer ConfirmationLink: https://www.ssgsa.us/interviewer/confirmation/${email}</b>
                    
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
    subject: '[SSGSA] Request to Interview Applications',
    html: template,
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      functions.logger.info(`Error Occurs, ${err}`, { structuredData: true })
    }
  });
}

const sendRevSetsMail = (email: string, name: string, password: string) => {
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
          Thank you for participating in the application review process for the
          SSGSA Application Cycle 2026. We appreciate your commitment to this
          holistic application review process.

          <br /><br />
          You have been allocated 12 to 15 applications for review. To assist you
          in this task, we have provided detailed instructions and a grading rubric
          in the SSGSA Reviewer Instructions.
          
          <br /><br />
          <b>SSGSA Reviewer Instructions:
          https://drive.google.com/file/d/1TjlBHooKsph6KvDq_MgIYSV-Iq3p65Q5/view?usp=sharing
          </b>

          <br /><br />
          We kindly request that you review these materials before beginning your evaluations
          to ensure consistency in our assessments. We would request you to dedicate at least 
          10-15 mins for the review of each application for ensuring the high standard of the 
          application review process.

          <b>Within the portal, there are specific columns designated for entering grades based
          on the rubric criteria.</b>

          <br /><br />
          <b>Link to the portal: https://www.ssgsa.us/reviewer</b>
          
          <br /><br />
          <b>Username:</b> ${email}
          <br />
          <b>Password:</b> ${password}

          <br /><br />
          <b>The deadline for completing your reviews is March 31, 2026.</b>
          Should you have any questions or require assistance, please do not
          hesitate to contact us at a chair@ssgsa.us or application.ssgsa@gmail.com. 

          <br /><br />
          We kindly ask that you complete your reviews before the deadline. In the
          event that you are unable to review the assigned applications, please
          notify us at least 1 week before the deadline. This advance notice allows
          us to arrange for alternative reviewers, ensuring the quality and timeliness
          of our decision-making process.
          
          <br /><br />
          Thank you once again for your valuable contribution to the SSGSA application
          review process.

          <br /><br />
          Warm Regards,
          <br />
          Dr. Sabahuddin Ahmad & Ms. Rabia Omar
          <br />
          Co-chairs SSGSA
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

const sendIntSetsMail = (email: string, name: string, password: string) => {
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
          Thank you for participating in the application review process for the
          SSGSA Application Cycle 2026. We appreciate your commitment to this
          holistic application review process.

          <br /><br />
          You have been allocated 12 to 15 applications for review. To assist you
          in this task, we have provided detailed instructions and a grading rubric
          in the SSGSA Reviewer Instructions.
          
          <br /><br />
          <b>SSGSA Interviewer Instructions:
          https://drive.google.com/file/d/1TjlBHooKsph6KvDq_MgIYSV-Iq3p65Q5/view?usp=sharing
          </b>

          <br /><br />
          We kindly request that you review these materials before beginning your evaluations
          to ensure consistency in our assessments. We would request you to dedicate at least 
          10-15 mins for the review of each application for ensuring the high standard of the 
          application review process.

          <b>Within the portal, there are specific columns designated for entering grades based
          on the rubric criteria.</b>

          <br /><br />
          <b>Link to the portal: https://www.ssgsa.us/interviewer</b>
          
          <br /><br />
          <b>Username:</b> ${email}
          <br />
          <b>Password:</b> ${password}

          <br /><br />
          <b>The deadline for completing your reviews is March 31, 2026.</b>
          Should you have any questions or require assistance, please do not
          hesitate to contact us at a chair@ssgsa.us or application.ssgsa@gmail.com. 

          <br /><br />
          We kindly ask that you complete your reviews before the deadline. In the
          event that you are unable to review the assigned applications, please
          notify us at least 1 week before the deadline. This advance notice allows
          us to arrange for alternative reviewers, ensuring the quality and timeliness
          of our decision-making process.
          
          <br /><br />
          Thank you once again for your valuable contribution to the SSGSA application
          review process.

          <br /><br />
          Warm Regards,
          <br />
          Dr. Sabahuddin Ahmad & Ms. Rabia Omar
          <br />
          Co-chairs SSGSA
        </p>
      </body>
    </html>
  `

  let mailDetails = {
    from: 'SSGSA Admin <devs.ssgsa@gmail.com>',
    to: email,
    cc: 'chair@ssgsa.us',
    replyTo: 'chair@ssgsa.us',
    subject: '[SSGSA] Credentials for Interviewing Applications',
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

export const sendInterviewerConfirmationMail =
  functions.firestore.document("interviewer_invites/{email}").onWrite((change, context) => {
    if (change.after.exists) {
      const newData = change.after.data()
      if (change.before.exists) {
        const prevData = change.before.data()
        if (newData && prevData && newData.reminder !== prevData.reminder)
          sendIntConfirmationMail(context.params.email, newData.name)
      } else if (newData) sendIntConfirmationMail(context.params.email, newData.name)
    }
  })

export const sendReviewerSetsMail =
  functions.https.onRequest((request, response) => {
    const email = request.query.email
    const name = request.query.name
    let password = request.query.password

    functions.logger.info(
      'Sending sets mail to reviewer ' +
      email + ' with data as (Name: ' +
      name + ')',
      { structuredData: true }
    )
    sendRevSetsMail(String(email), String(name), String(password))
      .then(() => response.status(200).send("Mail Sent to " + name))
      .catch(() => response.status(400).send("Error occured while sending mail to " + name + " (" + email + ")"))
  })


export const sendInterviewerSetsMail =
  functions.https.onRequest((request, response) => {
    const email = request.query.email
    const name = request.query.name
    let password = request.query.password

    functions.logger.info(
      'Sending sets mail to interviewer ' +
      email + ' with data as (Name: ' +
      name + ')',
      { structuredData: true }
    )
    sendIntSetsMail(String(email), String(name), String(password))
      .then(() => response.status(200).send("Mail Sent to " + name))
      .catch(() => response.status(400).send("Error occured while sending mail to " + name + " (" + email + ")"))
  })
