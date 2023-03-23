import style from "./Header.module.css";
import SearchForm from "./SearchForm/SearchForm";
import { useAppDispatch } from "../../app/hooks";
import { setCurrentPage } from "../../features/search/searchSlice";
import { defaultPropsType } from "../../models/models";

function Header({ APIKey }: defaultPropsType) {
  const dispatch = useAppDispatch();
  return (
    <header className={style.header}>
      <h1
        onClick={() => {
          dispatch(setCurrentPage("foundBookCards"));
        }}
        className={style.header_title}
      >
        Search for books
      </h1>
      <SearchForm APIKey={APIKey} />
    </header>
  );
}

export default Header;
