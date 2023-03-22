import { bookCardType } from '../../../models/models'
import bookIcon from '../../../imgs/icons8-open-book-64.png'
import style from './BookCard.module.css'

function BookCard(props: bookCardType) {
  return (
    <div className={style.bookCard}>
        <img className={style.bookCard_thumbnailImg} src={props.imageLinks?.thumbnail || props.imageLinks?.thumbnail || bookIcon} />
        <div className={style.bookCard_textInfo}>
            <p className={style.bookCard_textInfo_category}>{props.category}</p>
            <h6 className={style.bookCard_textInfo_title}>{props.title}</h6>
            <p className={style.bookCard_textInfo_authors}>{props.authors}</p>
        </div>
    </div>
  )
}

export default BookCard