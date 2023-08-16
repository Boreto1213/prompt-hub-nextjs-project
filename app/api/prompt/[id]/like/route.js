import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();
    const userId = await req.json();

    const prompt = await Prompt.findOne({
      _id: params.id,
    });

    if (!prompt) {
      return new Response("Prompt not found!", {
        status: 404,
      });
    }

    if (prompt.likes.includes(userId)) {
        console.log("Check is correct!")
      prompt.likes = prompt.likes.filter((id) => id.toString() !== userId);
      console.log(prompt.likes);
    } else {
      prompt.likes.push(userId);

      if (prompt.dislikes.includes(userId)) {
        prompt.dislikes = prompt.dislikes.filter((id) => id.toString() !== userId);
      }
    }

    await prompt.save();

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong! Could not change like status!", {
      status: 500,
    });
  }
};
