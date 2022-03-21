import styled from 'styled-components';

function Title() {
  return (
    <Wrapper>
      <a href="https://developers.nexon.com/">넥슨 오픈API 기반</a>
      <h1>
        카트라이더<span> 전적 </span>검색
      </h1>
      <p>사회적거리두기</p>
    </Wrapper>
  );
}

export default Title;

const Wrapper = styled.div`
  padding-top: 200px;
  font-size: 1.48rem;
  margin-bottom: 10vh;
  @media (min-height: 580px) {
    margin-bottom: 4.8rem;
  }

  a {
    font-size: 1.6em;
  }
  h1 {
    font-size: 2.4em;
    margin: 2px 0 4px;
    font-weight: 400;
    span {
      font-weight: 500;
    }
  }
  p {
    letter-spacing: 4px;
    font-size: 1em;
    width: 280px;
    padding: 4px 0 1px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    margin: 0 auto;
  }
`;
