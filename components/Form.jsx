import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section>
      <h1 className="text-left mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-white">
        <span className="orange-gradient">{type}</span> Post
      </h1>
      <p className="maw-w-md text-left mt-5 text-lg text-gray-100 sm:text-xl">
        {type} and share amazing prompts with others, and let youe imagination
        run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full maw-w-2xl flex flex-col gap-4"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-100">
            Your AI prompt
          </span>
        </label>
        <textarea
          name="prompt"
          cols="30"
          rows="10"
          placeholder="Write your prompt here..."
          required
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          className="w-full rounded-lg h-[200px] mt-2 p-3 text-sm text-white/90 outline-0 bg-neutral-700"
        />

        <label className="mt-7">
          <span className="font-satoshi font-semibold text-base text-gray-100">
            Tag <span>(#webdevelopment, #product, #idea)</span>
          </span>
        </label>
        <input
          name="prompt"
          cols="30"
          rows="10"
          placeholder="Write your tag here..."
          required
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          className="w-full rounded-lg mt-2 p-3 text-sm text-white/90 outline-0 bg-neutral-700"
        />

        <div className="flex justify-end items-center mx-3 mb-5 gap-4 w-full">
          <Link href="/" className="text-gray-300 text-lg">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-lg bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
