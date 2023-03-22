import React from 'react'
import style from './Header.module.css'
import SearchForm from './SearchForm/SearchForm'

function Header() {
  return (
    <header className={style.header}>
      <h1 className={style.header_title}>Search for books</h1>
      <SearchForm />
    </header>
  )
}

export default Header