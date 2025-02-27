import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";

const BlogPage = () => {
  const blog = {
    title: "Virat Kohli hii nann hesru chandan shetty yantha madudh iga ",
    category: "Sports",
    about:
      "Virat Kohli is an Indian cricketer widely regarded as one of the best batsmen of his generation. Born on November 5, 1988, in Delhi, India, he is known for his aggressive playing style, exceptional batting technique, and remarkable consistency. Kohli has broken numerous cricketing records, including being one of the fastest to reach milestones in One Day Internationals (ODIs) and T20s. He served as the captain of the Indian cricket team, leading them to significant victories. Kohli has received numerous awards, including the prestigious ICC Player of the Year and the Padma Shri. His leadership, alongside his individual achievements, has solidified his place among the game's greats.",
    posterImage: "https://documents.iplt20.com/ipl/IPLHeadshot2024/2.png",
    data: [
      {
        type: "text",
        content: "hekllo",
      },
      {
        type: "url",
        content:
          "https://cricinformer.com/wp-content/uploads/2023/07/cover-virat-kohli.png",
      },
      {
        type: "desc",
        content:
          "Virat Kohli is an Indian cricketer widely regarded as one of the best batsmen of his generation. Born on November 5, 1988, in Delhi, India, he is known for his aggressive playing style, exceptional batting technique, and remarkable consistency. Kohli has broken numerous cricketing records, including being one of the fastest to reach milestones in One Day Internationals (ODIs) and T20s. He served as the captain of the Indian cricket team, leading them to significant victories. Kohli has received numerous awards, including the prestigious ICC Player of the Year and the Padma Shri. His leadership, alongside his individual achievements, has solidified his place among the game's greats.",
      },
      {
        type: "text",
        content: "weyfifud",
      },
      {
        type: "desc",
        content:
          "Virat Kohli is an Indian cricketer widely regarded as one of the best batsmen of his generation. Born on November 5, 1988, in Delhi, India, he is known for his aggressive playing style, exceptional batting technique, and remarkable consistency. Kohli has broken numerous cricketing records, including being one of the fastest to reach milestones in One Day Internationals (ODIs) and T20s. He served as the captain of the Indian cricket team, leading them to significant victories. Kohli has received numerous awards, including the prestigious ICC Player of the Year and the Padma Shri. His leadership, alongside his individual achievements, has solidified his place among the game's greats.",
      },
      {
        type: "url",
        content:
          "https://cricinformer.com/wp-content/uploads/2023/07/cover-virat-kohli.png",
      },
      {
        type: "desc",
        content:
          "Virat Kohli is an Indian cricketer widely regarded as one of the best batsmen of his generation. Born on November 5, 1988, in Delhi, India, he is known for his aggressive playing style, exceptional batting technique, and remarkable consistency. Kohli has broken numerous cricketing records, including being one of the fastest to reach milestones in One Day Internationals (ODIs) and T20s. He served as the captain of the Indian cricket team, leading them to significant victories. Kohli has received numerous awards, including the prestigious ICC Player of the Year and the Padma Shri. His leadership, alongside his individual achievements, has solidified his place among the game's greats.",
      },
      {
        type: "text",
        content: "weyfifud",
      },
      {
        type: "url",
        content:
          "https://cricinformer.com/wp-content/uploads/2023/07/cover-virat-kohli.png",
      },
      {
        type: "url",
        content:
          "https://cricinformer.com/wp-content/uploads/2023/07/cover-virat-kohli.png",
      },
      {
        type: "url",
        content:
          "https://cricinformer.com/wp-content/uploads/2023/07/cover-virat-kohli.png",
      },
    ],
  };
  return (
    <>
      <div className="px-2">
        <div
          className="absolute z-10 w-[98%] h-[90vh] overflow-hidden rounded-lg"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgb(34,34,34)24.95%,rgb(34,34,34)38.8% , rgba(34,34,34,0.04)97.47%, rgba(34,34,34,0)100%)",
          }}
        >
          <div className="absolute z-30 left-10 top-5 flex items-center gap-10">
            <div className="h-[82vh] max-w-[60vw] min-w-fit">
              <img
                src={blog.posterImage}
                alt="poster movie"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div
                id="scrollbar"
                className="text-white max-h-[70vh] flex flex-col gap-2 md:px-4 overflow-auto"
              >
                <h1 className="text-white font-extrabold text-5xl uppercase">
                  {blog.title}
                </h1>
                <h4>{blog.about}</h4>
              </div>
            </div>
          </div>
        </div>
        <img
          src={blog.posterImage}
          alt="Movie Backdrop poster"
          className="w-[99%] h-[90vh] object-cover object-center rounded-lg"
        />
      </div>

      <div className="m-2 font-serif">
        {blog.data.map((ele) => {
          if (ele.type == "text") {
            return (
              <div className="">
                <h1 className="font-bold text-3xl underline">{ele.content}</h1>
              </div>
            );
          } else if (ele.type == "url") {
            return (
              <div className="h-[60vh] overflow-hidden flex justify-center mb-2">
                <img
                  src={ele.content}
                  alt="invalid url"
                  className="h-full rounded-lg"
                />
              </div>
            );
          } else if (ele.type == "desc") {
            return (
              <>
                <p className="indent-8">{ele.content}</p>
                <br />
              </>
            );
          }
        })}
      </div>
    </>
  );
};

export default DefaultLayout(BlogPage);
