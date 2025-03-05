import userModel from "../../../models/userModel";
import connectDB from "../../../lib/mongodb";

export async function GET(request, { params }) {
  await connectDB();

  // Fetch all users
  const users = await userModel.find({});

  // Get current system date (remove time for accurate comparison)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Map users to include order status based on createdAt
  const updatedUsers = users.map((user) => {
    const orderDate = new Date(user.createdAt);
    orderDate.setHours(0, 0, 0, 0);

    const differenceInDays = (currentDate - orderDate) / (1000 * 60 * 60 * 24); // Convert ms to days

    let status = "In Progress"; // Default status
    if (differenceInDays === 1) {
      status = "Dispatched";
    } else if (differenceInDays >= 2) {
      status = "Delivered";
    }

    // console.log(`Order Date: ${orderDate}, Current Date: ${currentDate}, Difference: ${differenceInDays}, Status: ${status}`);

    return { ...user.toObject(), status }; // Convert Mongoose document to plain object
  });

  return new Response(
    JSON.stringify({
      status: 1,
      message: "Data received successfully",
      data: updatedUsers,
    }),
    { status: 200 }
  );
}
