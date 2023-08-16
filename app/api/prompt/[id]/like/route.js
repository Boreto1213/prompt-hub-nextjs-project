import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

export const POST = async (req, { params }) => {
  try {
    await connectToDB();

    const { id: userId } = await req.json();
    const prompt = await Prompt.findOne({
      _id: params.id,
      likes: { $in: [userId] },
    });

    if (prompt) {
      await Prompt.findByIdAndUpdate(
        prompt._id,
        { $pull: { likes: userId } },
        (err, prompt) => {
          if (err)
            return new Response(
              "Something went wrong! Could not change like status!",
              { status: 500 }
            );
        }
      );
    } else {
        await Prompt.findByIdAndUpdate(
            prompt._id,
            { $push: { likes: userId } },
            (err, prompt) => {
              if (err)
                return new Response(
                  "Something went wrong! Could not change like status!",
                  { status: 500 }
                );
            }
          );
    }
  } catch (error) {
    return new Response("Something went wrong! Could not change like status!", {
      status: 500,
    });
  }
};
