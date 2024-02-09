import { useState, useCallback } from "react";
import styles from "./SearchPage.module.scss";
import classNames from "classnames/bind";
import Search from "~/components/search";
import TopicItem from "./TopicItem";
import Article from "~/components/article";
import Pagination from "~/components/pagination";
const cx = classNames.bind(styles);

const cards = [
  {
    author: "Honnh Jonh",
    avatar: "https://blog1203.netlify.app/images/avatar/avatar_56.png",
    thumbnail:
      "https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png",
    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    like: 10,
    comment: 20,
  },

  {
    author: "Honnh Jonh",

    avatar: "https://blog1203.netlify.app/images/avatar/avatar_56.png",
    thumbnail:
      "https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png",

    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    like: 10,
    comment: 20,
  },
  {
    author: "Honnh Jonh",

    avatar: "https://blog1203.netlify.app/images/avatar/avatar_56.png",
    thumbnail:
      "https://fullstack.edu.vn/static/media/f8-icon.18cd71cfcfa33566a22b.png",

    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    like: 10,
    comment: 20,
  },
];
function SearchPage() {
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [topic, setTopic] = useState("Nổi bật");

  const handleClickTopic = useCallback(
    (topic) => {
      setTopic(topic);
    },
    [topic]
  );
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("header")}>
          <h2 className={cx("title")}>Tìm kiếm câu trả lời hữu ích</h2>
          <div className={cx("search")}>
            <Search value={searchValue} setValue={setSearchValue} />
          </div>
        </div>
        <div className={cx("line")}>
          <div className={cx("topic-list")}>
            {["Bài viết", "Câu hỏi"].map((key, index) => {
              return (
                <TopicItem
                  key={index}
                  className={cx({ active: topic === key })}
                  topic={key}
                  onClickTopic={handleClickTopic}
                />
              );
            })}
          </div>
        </div>

        <div className={cx("list")}>
          {!loading ? (
            cards.length > 0 ? (
              cards.map((card, index) => {
                return (
                  <Article
                    key={index}
                    className={cx("card")}
                    article={card}
                  ></Article>
                );
              })
            ) : (
              <p>No posts</p>
            )
          ) : (
            <div className={cx("loading")}>{/* <Loading /> */} Loading...</div>
          )}
        </div>

        <div className={cx("pagination")}>
          <Pagination value={page} setValue={setPage} />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
