import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import style from "./SearchForm.module.css";
import img from "../../../imgs/icons8-search.svg";
import { categoryType, sortType } from "../../../models/models";
import { getSearchResult } from "../../../features/search/searchSlice";
import { useState } from "react";

function SearchForm() {
  const categories:Array<categoryType> = useAppSelector((state) => state.search.categories);
  const sortValues:Array<sortType> = useAppSelector((state) => state.search.sortValues);
  const APIKey = useAppSelector((state) => state.search.APIKey);
  const pagination = useAppSelector((state) => state.search.foundData.pagination);

  const [text, setText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<categoryType>("All");
  const [selectedSortingBy, setselectedSortingBy] = useState<sortType>("relevance");
  
  const dispatch = useAppDispatch();
  
  const searching = (
    intitle: string,
    category: categoryType,
    sort: sortType
  ) => {
    dispatch(getSearchResult({ intitle, category, pagination, sort, APIKey }));
  };

  return (
    <div className={style.searchForm}>
      <div className={style.inTitleInput}>
        <input onKeyDown={(e) => {if (e.key === 'Enter') {
            searching(text, selectedCategory, selectedSortingBy) 
          }}} value={text} onChange={(e) => setText(e.target.value)} className={style.inTitleInput_input} type="text" />
        <button
          onClick={() => {
            searching(text, selectedCategory, selectedSortingBy) 
          }}
          
          className={style.inTitleInput_btn}
        >
          <img className={style.inTitleInput_btnImg} src={img} />
        </button>
      </div>
      <div className={style.selectSearchOptionsList}>
        <div className={style.selectSearchOptionsElem}>
          <span className={style.selectSearchOptionsElem_title}>
            Categories
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => {
                setSelectedCategory(e.target.value as categoryType);
            }}
            className={style.selectSearchOptionsElem_select}
          >
            {categories.map((category, key) => (
              <option
                key={key}
                className={style.selectSearchOptionsElem_option}
              >
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={style.selectSearchOptionsElem}>
          <span className={style.selectSearchOptionsElem_title}>
            Sorting by
          </span>
          <select
            value={selectedSortingBy}
            onChange={(e) => {
                setselectedSortingBy(e.target.value as sortType)
            }}
            className={style.selectSearchOptionsElem_select}
          >
            {sortValues.map((sortValue, key) => (
              <option
                key={key}
                className={style.selectSearchOptionsElem_option}
              >
                {sortValue}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchForm;
