import React from 'react'
import loadingImg from '../../imgs/loading.svg'
import style from './Loading.module.css'

function Loading() {
  return (
    <img src = {loadingImg} className={style.loading} />
  )
}

export default Loading