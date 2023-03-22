import { useAppDispatch, useAppSelector } from "../../app/hooks";
import style from "./FoundBookCards.module.css";
import BookCard from "./BookCard/BookCard";
import Loading from "../Loading/Loading";
import { loadMoreResults } from "../../features/search/searchSlice";

function FoundBookCards() {
  const totalItems = useAppSelector((state) => state.search.foundData.totalItems)
  const books = useAppSelector((state) => state.search.foundData.books);
  const status = useAppSelector((state) => state.search.status);
  const dispatch = useAppDispatch();
  const APIKey = useAppSelector((state) => state.search.APIKey);
  const pagination = useAppSelector(
    (state) => state.search.foundData.pagination
  );
  const currentInfoForSearch = useAppSelector(
    (state) => state.search.currentInfoForSearch
  );

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
              {totalItems === undefined ? '' : <p className={style.foundBookCardsContainer_foundResults}>Found {totalItems} results</p>}
              
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
              {totalItems && totalItems > 30 ? <button
                onClick={loadMore}
                className={style.foundBookCardsContainer_loadModeBtn}
              >
                Load more
              </button> : ''}
              
            </div>
        </div>
        {status === "loading" ? (
        <Loading />
      ) : ('')}
    </main>
  );
}

export default FoundBookCards;
