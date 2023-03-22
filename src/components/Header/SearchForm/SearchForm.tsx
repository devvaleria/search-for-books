import { useAppSelector } from "../../../app/hooks";
import style from './SearchForm.module.css'
import img from "../../../imgs/icons8-search.svg";

function SearchForm() {
  const categories = useAppSelector((state) => state.search.categories);
  const sortValues = useAppSelector((state) => state.search.sortValues);
  return (
    <div className={style.searchForm}>
      <div className={style.inTitleInput}>
        <input className = {style.inTitleInput_input} type="text" />
        <button onClick={() => {}} className = {style.inTitleInput_btn}>
          <img className = {style.inTitleInput_btnImg} src={img} />
        </button>
      </div>
      <div className={style.selectSearchOptionsList}>
        <div className={style.selectSearchOptionsElem}>
          <span className={style.selectSearchOptionsElem_title}>Categories</span>
          <select className = {style.selectSearchOptionsElem_select}>
            {categories.map((category) => (
              <option className={style.selectSearchOptionsElem_option}>{category}</option>
            ))}
          </select>
        </div>
        <div className={style.selectSearchOptionsElem}>
          <span className={style.selectSearchOptionsElem_title}>Sorting by</span>
          <select className = {style.selectSearchOptionsElem_select}>
            {sortValues.map((sortValue) => (
              <option className={style.selectSearchOptionsElem_option}>{sortValue}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
