import { useAppDispatch, useAppSelector } from "../../app/hooks";
import style from "./FoundBookCards.module.css";
import BookCard from "./BookCard/BookCard";
import Loading from "../Loading/Loading";
import { loadMoreResults } from "../../features/search/searchSlice";
import { defaultPropsType } from "../../models/models";

function FoundBookCards({ APIKey, status }: defaultPropsType) {
  const totalItems = useAppSelector(
    (state) => state.search.foundData.totalItems
  );
  const books = useAppSelector((state) => state.search.foundData.books);
  const pagination = useAppSelector(
    (state) => state.search.foundData.pagination
  );
  const currentInfoForSearch = useAppSelector(
    (state) => state.search.currentInfoForSearch
  );
  const dispatch = useAppDispatch();

  const loadMore = () => {
    dispatch(
      loadMoreResults({
        intitle: currentInfoForSearch.title,
        category: currentInfoForSearch.category,
        pagination,
        sort: currentInfoForSearch.sortingBy,
        APIKey,
      })
    );
  };

  return (
    <main className={style.foundBookCards}>
      <div className={style.foundBookCardsContainer}>
        <div className={style.foundBookCardsContainer_list}>
          {totalItems === undefined ? (
            ""
          ) : (
            <p className={style.foundBookCardsContainer_foundResults}>
              Found {totalItems} results
            </p>
          )}

          <div className={style.foundBookCardsContainer_listElements}>
            {books.map((book, key) => (
              <BookCard
                key={key}
                id={book.id}
                title={book.title}
                authors={book.authors}
                category={book.category}
                imageLinks={book.imageLinks}
              />
            ))}
          </div>
          {totalItems && totalItems > pagination.step ? (
            <button
              onClick={loadMore}
              className={style.foundBookCardsContainer_loadModeBtn}
            >
              Load more
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {status === "loading" ? <Loading /> : ""}
    </main>
  );
}

export default FoundBookCards;
