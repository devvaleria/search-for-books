import { useAppSelector } from "../../app/hooks";
import Loading from "../Loading/Loading";
import style from "./SelectedBookInfo.module.css";
import bookImg from "../../imgs/bookIcon.png";
import { defaultPropsType } from "../../models/models";

function SelectedBookInfo({ status }: defaultPropsType) {
  const bookInfo = useAppSelector((state) => state.search.selectedBook);
  return (
    <main className={style.selectedBookInfo}>
      {status === "loading" ? (
        <Loading />
      ) : (
        <div className={style.selectedBookInfo}>
          <div className={style.selectedBookImg}>
            <img
              className={style.selectedBookImg_img}
              src={
                bookInfo?.imageLinks.medium ||
                bookInfo?.imageLinks.small ||
                bookInfo?.imageLinks.large ||
                bookImg
              }
            />
          </div>

          <div className={style.selectedBookInfoText}>
            <p className={style.selectedBookInfoText_categories}>
              {bookInfo?.categories}
            </p>
            <h2 className={style.selectedBookInfoText_title}>
              {bookInfo?.title}
            </h2>
            <p className={style.selectedBookInfoText_authors}>
              {bookInfo?.authors}
            </p>
            {bookInfo?.description ? (
              <div
                className={style.selectedBookInfoText_description}
                dangerouslySetInnerHTML={{ __html: bookInfo?.description }}
              ></div>
            ) : (
              <div
                className={style.selectedBookInfoText_EmptyDescription}
              ></div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default SelectedBookInfo;
