const nodeMailer = require('nodemailer');

const sendEmail = async(options)=>{
    // const transporter = nodeMailer.createTransport({
    //     host:process.env.SMPT_HOST,
    //     port:465,
    //     service:process.env.SMPT_SERVICE,
    //     auth:{
    //         user:"vermaamulya666@gmail.com",
    //         pass:"amulyak@123"
    //     }
    // });
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: "vermaamulya666@gmail.com",
            pass: "juhlncygcdviyzsx"
        }
    });
    const mailOptions = {
        from:process.env.SMPT_MAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    };

   await transporter.sendMail(mailOptions)
};

module.exports = sendEmail;