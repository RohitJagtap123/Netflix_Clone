import React from 'react'
import styled from 'styled-components'
export default function NotAvailable() {
  return (
    <Container>
        <h1 className='not-availavle'>No Movies Available</h1>
    </Container>
  )
}

const Container=styled.div`
margin-top:8rem;
margin-left:6rem;
`;


