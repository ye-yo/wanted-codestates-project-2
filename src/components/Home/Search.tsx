import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import { SEARCH_OPTIONS } from 'constants/search';
import SelectType from './SelectType';

function Search() {
  return (
    <Form>
      <SelectType options={SEARCH_OPTIONS} />
      <InputSearch placeholder="카트라이더 닉네임을 입력" />
      <IconSearch />
    </Form>
  );
}

export default Search;

const Form = styled.form`
  font-size: 1.48rem;
  display: flex;
  width: 840px;
  max-width: 48vw;
  min-width: 480px;
  height: 66px;
  margin: 0 auto;
  border: 4px solid white;
  border-radius: 32px;
  font-size: 1.6rem;
  padding: 2px;
  color: white;
  overflow: hidden;
`;

const InputSearch = styled.input`
  display: block;
  flex: 1;
  height: 100%;
  font-size: 2rem;
  background: transparent;
  border: 0;
  outline: none;
  color: inherit;
  padding: 0 10px 0 24px;
  &::placeholder {
    color: white;
    opacity: 0.5;
  }
`;

const IconSearch = styled.button`
  width: 100px;
  background: url(${NEXON_TMI}/img/assets/tmi_logo_default.svg) center / 40% no-repeat;
`;
