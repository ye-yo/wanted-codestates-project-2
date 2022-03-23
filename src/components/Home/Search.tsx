import { useCallback, useState, useMemo, FormEvent } from 'react';
import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import { ISelectOption } from 'interfaces/search';
import { SEARCH_OPTIONS } from 'constants/search';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import useAutoSearch from 'hooks/useAutoSearch';
import { useAppDispatch } from 'store/config';
import { getUser } from 'services/userService';
import { getMatchList } from 'services/matchListService';
import SelectType from './SelectType';

const keywordList = [
  { id: '1', name: '빼지' },
  { id: '2', name: '배찌' },
  { id: '3', name: 'abce' },
  { id: '4', name: 'apple' },
  { id: '5', name: '박동물관' },
  { id: '6', name: '박물관' },
];
const optionIcons = [<FaUserAlt />];

function Search() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchOption, setSearchOption] = useState<ISelectOption>(SEARCH_OPTIONS[0]);
  const optionIcon = useMemo(() => optionIcons[searchOption.id], [searchOption]);
  const [keyword, setKeyWord] = useState('');
  const { matchList } = useAutoSearch(keyword, keywordList, 'name');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = keyword.trim();
    if (value === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    const user = await dispatch(getUser(value));
    if (user.payload) {
      dispatch(getMatchList(user.payload.accessId));
      navigate(`/${searchOption.value}?${value}`);
    } else {
      alert('존재하지 않는 사용자입니다.');
    }
  };

  const handleChangeType = useCallback(
    (target: ISelectOption) => {
      setSearchOption(target);
    },
    [setSearchOption],
  );

  const handleClickSuggestion = (keyword: string) => {
    navigate(`/${searchOption.value}?${keyword}`);
  };

  const handleChangeInput = (e: { target: HTMLInputElement }) => setKeyWord(e.target.value);
  return (
    <SearchWrap>
      <Form onSubmit={handleSubmit}>
        <SelectType options={SEARCH_OPTIONS} onChange={handleChangeType} />
        <InputSearch placeholder={searchOption.placeholder} value={keyword} onChange={handleChangeInput} />
        <IconSearch />
      </Form>
      {matchList.length > 0 && keyword && (
        <SuggestionWrap>
          <SuggestionList>
            {matchList.map(({ id, name }) => (
              <Text key={`suggestion${id}`} onClick={() => handleClickSuggestion(name)}>
                {optionIcon || ''}
                {name}
              </Text>
            ))}
          </SuggestionList>
        </SuggestionWrap>
      )}
    </SearchWrap>
  );
}

export default Search;
const SearchWrap = styled.div`
  width: 840px;
  max-width: 48vw;
  min-width: 480px;
  height: 66px;
  margin: 0 auto;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  font-size: 1.48rem;
  display: flex;
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

const SuggestionWrap = styled.div`
  width: calc(100% - 50px);
  margin: 0 auto;
`;
const SuggestionList = styled.ul``;
const Text = styled.li`
  padding: 1.4rem;
  font-size: 1.1rem;
  cursor: pointer;
  text-align: left;
  background: hsla(0, 0%, 100%, 0.2);
  svg {
    margin-right: 0.6rem;
  }
  :hover {
    background: hsla(0, 0%, 100%, 0.3);
  }
`;
