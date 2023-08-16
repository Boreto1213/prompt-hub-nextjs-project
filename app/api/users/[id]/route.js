import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();
        
        const user = await User.findById(params.id);

        if (!user) return new Response("No user found!", { status: 404 });

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Could not get user!", { status: 500 });
    }
}