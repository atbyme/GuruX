import React from 'react'

const Search = () => {
  return (
    <div>
      
    {/* Feature badges */}
    <div
      className="feature-badge"
      style={{ top: '25%', left: '10%' }}
      title="KnowledgeFlow"
      aria-label="Feature KnowledgeFlow"
    >
      📚
    </div>
    <div
      className="feature-badge"
      style={{ top: '40%', left: '10%' }}
      title="SkillMap"
      aria-label="Feature SkillMap"
    >
      🗺️
    </div>
    <div
      className="feature-badge"
      style={{ top: '30%', right: '10%' }}
      title="Spark Hub"
      aria-label="Feature Spark Hub"
    >
      ⚡
    </div>

    {/* Transparent search box */}
    <div className="search-container">
      <input
        type="text"
        className="search-box"
        placeholder="Ask GuruX..."
        aria-label="Search"
      />
      </div>
    </div>
  )
}

export default Search
