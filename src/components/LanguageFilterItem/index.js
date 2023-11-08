// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {languageFilterDetails, changeLanguage, isActive} = props
  const {id, language} = languageFilterDetails

  const onClickLanguage = () => {
    changeLanguage(id)
  }

  const changeClassName = isActive
    ? 'change-language-button'
    : 'language-button'

  return (
    <li className="language-list-item">
      <button
        type="button"
        onClick={onClickLanguage}
        className={changeClassName}
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
