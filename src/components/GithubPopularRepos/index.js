import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    languageId: languageFiltersData[0].id,
    repositoryList: [],
    apiStatus: statusConstants.initial,
  }

  componentDidMount() {
    this.getRepository()
  }

  getRepository = async () => {
    const {languageId} = this.state
    this.setState({apiStatus: statusConstants.inProgress})
    const response = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${languageId}`,
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({apiStatus: statusConstants.inProgress})
      const updatedData = data.popular_repos.map(each => ({
        name: each.name,
        id: each.id,
        issuesCount: each.issues_count,
        forksCount: each.forks_count,
        starsCount: each.stars_count,
        avatarUrl: each.avatar_url,
      }))
      this.setState({
        repositoryList: updatedData,
        apiStatus: statusConstants.success,
      })
    } else {
      this.setState({apiStatus: statusConstants.failure})
    }
  }

  changeLanguage = id => {
    this.setState(
      {languageId: id, apiStatus: statusConstants.inProgress},
      this.getRepository,
    )
  }

  renderRepository = () => {
    const {repositoryList} = this.state

    return (
      <ul className="repository-list-container">
        {repositoryList.map(each => (
          <RepositoryItem key={each.id} repositoryItemDetails={each} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-text">Something Went Wrong</h1>
    </div>
  )

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case statusConstants.success:
        return this.renderRepository()
      case statusConstants.failure:
        return this.renderFailure()
      case statusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {languageId} = this.state
    return (
      <div className="bg-container">
        <h1 className="main-heading">Popular</h1>
        <ul className="language-list-container">
          {languageFiltersData.map(eachLanguage => (
            <LanguageFilterItem
              key={eachLanguage.id}
              languageFilterDetails={eachLanguage}
              changeLanguage={this.changeLanguage}
              isActive={eachLanguage.id === languageId}
            />
          ))}
        </ul>

        {this.renderSwitch()}
      </div>
    )
  }
}

export default GithubPopularRepos
