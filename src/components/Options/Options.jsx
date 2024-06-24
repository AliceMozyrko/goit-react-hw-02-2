import css from "./Options.module.css"

export default function Options({ onClick, total, onResetData }) {
  return (
    <div className={css.container}>
      <button className={css.btn} onClick={() => onClick('good')}>Good</button>
      <button className={css.btn} onClick={() => onClick('neutral')}>Neutral</button>
      <button className={css.btn} onClick={() => onClick('bad')}>Bad</button>
      {total >0 && <button className={css.btn} onClick={onResetData}>Reset</button> } 
    </div>
  )
}