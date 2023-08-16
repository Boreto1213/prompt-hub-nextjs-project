import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="text-left mt-5 text-5xl font-extrabold leading-[1.15] sm:text-6xl text-white/90">
        <span className="orange-gradient">{name}</span> Profile
      </h1>
      <p className="mt-5 text-lg text-gray-300 sm:text-xl max-w-2xl">{desc}</p>

      <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
        {data.map((post) => (
          <PromptCard
            key={post.id}
            post={post}
            handleTagClick={() => {}}
            handleDelete={() => handleDelete && handleDelete(post)}
            handleEdit={() => handleEdit && handleEdit(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
