import { bookCardType } from "../../../models/models";
import bookIcon from "../../../imgs/bookIcon.png";
import style from "./BookCard.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSelectedBook } from "../../../features/search/searchSlice";

function BookCard(props: bookCardType) {
  const dispatch = useAppDispatch();
  const APIKey = useAppSelector((state) => state.search.APIKey);
  const setSelectedBook = () => {
    dispatch(getSelectedBook({ bookId: props.id, APIKey }));
  };

  return (
    <div
      className={style.bookCard}
      onClick={() => {
        setSelectedBook();
      }}
    >
      <img
        className={style.bookCard_thumbnailImg}
        src={
          props.imageLinks?.thumbnail || props.imageLinks?.thumbnail || bookIcon
        }
      />
      <div className={style.bookCard_textInfo}>
        <p className={style.bookCard_textInfo_category}>{props.category}</p>
        <h6 className={style.bookCard_textInfo_title}>{props.title}</h6>
        <p className={style.bookCard_textInfo_authors}>{props.authors}</p>
      </div>
    </div>
  );
}

export default BookCard;
