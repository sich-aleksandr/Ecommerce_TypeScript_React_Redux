import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { Api } from "Api/api";
import { Spinner } from "Components/commons/spinner";
import css from "./input.module.css";

const api = new Api();

export const Input = () => {
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isFocus, setFocus] = useState(false);
  const [isDataExist, setDataExist] = useState(false);

  const onValueChange = ({ target }) => {
    setSearch(target.value);
  };
  const onFocusChange = () => {
    setFocus(true);
  };
  const onBlureChange = () => {
    setTimeout(() => setFocus(false), 500);
  };

  const debouncedSearch = useDebounce(search, 1500);

  useEffect(() => {
    if (debouncedSearch.length > 3) {
      setIsSearching(true);
      api.getGoodsSearch(debouncedSearch).then((results) => {
        setIsSearching(false);
        setSearchData(results.items.slice(0, 10));
        if  (results.items.length === 0) {
          setDataExist(false)
        } else setDataExist(true);
      });
      
    } else {
      setSearchData([]);
    }
  }, [debouncedSearch]);

  return (
    <>
      <div className={css.input}>
        <input
          onChange={onValueChange}
          onFocus={onFocusChange}
          onBlur={onBlureChange}
          placeholder="Поиск товара"
        ></input>
        {isSearching && <Spinner />}

        {(isFocus && searchData.length > 0) && (
          <ul className={css.ul}>
            {searchData.map(({ id, label }) => {
              return (
                <Link to={id}>
                  <li key={id}>{label}</li>
                </Link>
              );
            })}
          </ul>
          
        )}
        {(isFocus && !isDataExist) && <div className={css.nodata}>Ничего не найдено, попробуйте изменить запрос</div>}
      </div>
    </>
  );
};
