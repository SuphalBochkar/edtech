// import BuyCourseEmailTemplate from "@/components/Email/BuyCourse";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// interface BuyCourseEmailProps {
//   name: string;
//   email: string;
// }

// export default async function buyCourseMail({
//   name,
//   email,
// }: BuyCourseEmailProps) {
//   try {
//     const mailData = await resend.emails.send({
//       from: "Edtech <edtech@resend.dev>",
//       to: [email],
//       subject: "Thank you for purchasing our course!",
//       react: BuyCourseEmailTemplate({ name: name }),
//     });

//     return mailData;
//   } catch (error) {
//     console.error("Failed to send email:", error);
//     if (error instanceof Error) {
//       return { success: false, error: error.message };
//     } else {
//       return { success: false, error: String(error) };
//     }
//   }
// }
