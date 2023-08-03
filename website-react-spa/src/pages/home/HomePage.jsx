import React from 'react'

import BlogList from '../../components/blogList/BlogList'
import Hero from '../../components/hero/Hero'
import SocialHandles from '../../components/socialHandles/SocialHandles'

const HomePage = () => {
  return (
    <>
      <Hero />
      <SocialHandles />
      <BlogList />
    </>
  )
}

export default HomePage
