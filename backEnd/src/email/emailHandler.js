import { CleintResend,sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email , name , CLIENT_URL)=>{
     const {data , error} = await CleintResend.emails.send({
     from: `${sender.name} <${sender.email}>`,
        to: email,
        subject : "Welcome  to chattify",
        html : createWelcomeEmailTemplate(name  , CLIENT_URL)
     })

     if (error) {
    console.error("Resend error:", error);
    throw new Error(error.message);
}

  console.log("Welcome email sent seccussfully " , data);
}