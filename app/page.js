import Feed from "@/components/Feed";

const HomePage = () => {
  return (
    <section className="w-full flex flex-col items-center mt-10">
      <h1 className="text-center text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl">
        Discover & Share <br /> <span className="text-center orange-gradient">AI-Powered Prompts</span>
      </h1>
      <p className="text-center text-lg sm:text-xl max-w-2xl w-full mt-5 text-gray-400">
        Prompt Hub is an open-source AI Prompting tool for modern world to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default HomePage;
