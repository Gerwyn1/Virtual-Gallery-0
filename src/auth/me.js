// import { verify } from "jsonwebtoken";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = cookies();

//   const token = cookieStore.get('jwt');

//   if (!token) {
//     throw Error('Unauthorized')
//   }

//   const { value } = token;

//   // Always check this
//   const secret = process.env.JWT_SECRET || "";

//   try {
//     verify(value, secret);

//     const response = {
//       user: "Super Top Secret User",
//     };

//     return new Response(JSON.stringify(response), {
//       status: 200,
//     });
//   } catch (e) {
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       {
//         status: 400,
//       }
//     );
//   }
// }