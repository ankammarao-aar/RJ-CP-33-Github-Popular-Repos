// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {repositoryItemDetails} = props
  const {
    name,
    issuesCount,
    forksCount,
    starsCount,
    avatarUrl,
  } = repositoryItemDetails

  return (
    <li className="repository-list-item">
      <img src={avatarUrl} alt={name} className="repository-img" />
      <h1 className="repository-name">{name}</h1>
      <div>
        <p className="repository-stars">
          <img
            src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
            alt="stars"
            className="stars-img"
          />
          {starsCount}
          <span> stars</span>
        </p>
        <p className="repository-stars">
          <img
            src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
            alt="forks"
            className="stars-img"
          />
          {forksCount}
          <span> forks</span>
        </p>
        <p className="repository-stars">
          <img
            src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
            alt="open issues"
            className="stars-img"
          />
          {issuesCount}
          <span> open issues</span>
        </p>
      </div>
    </li>
  )
}

export default RepositoryItem
