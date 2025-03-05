import connectDB from "../../../lib/mongodb";
import userModel from "../../../models/userModel";

export async function POST(request) {
  await connectDB();
  try {
    const body = await request.json();
    const isExits = await userModel.findOne({ email: body.email });

    if (isExits) {
      return new Response(JSON.stringify({ status: 0, message: "Email already exists" }, { status: 404 }));
    }

    const user = new userModel(body);
    await user.save();
    return new Response(JSON.stringify({ message: "user is successfully created.", user }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
}
