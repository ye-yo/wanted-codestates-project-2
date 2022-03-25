import { useCallback, useState, useMemo, FormEvent } from 'react';
import styled, { css } from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import { ISelectOption } from 'interfaces/search';
import { SEARCH_OPTIONS } from 'constants/search';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import useAutoSearch from 'hooks/useAutoSearch';
import { useAppDispatch } from 'store/config';
import { getUser } from 'services/userService';
import { expand } from 'styles/animations';
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

function Search({ size }: { size?: string }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyWord] = useState('');
  const { matchList } = useAutoSearch(keyword, keywordList, 'name');
  const [searchOption, setSearchOption] = useState<ISelectOption>(SEARCH_OPTIONS[0]);
  const optionIcon = useMemo(() => optionIcons[searchOption.id], [searchOption]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = keyword.trim();
    if (value === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    const response = await dispatch(getUser(value));
    if (response.payload) {
      if (size === 'mini') {
        dispatch(getMatchList({ accessId: response.payload.accessId }));
        return;
      }
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
    <SearchWrap size={size}>
      <Form onSubmit={handleSubmit}>
        <FormItem>
          {size !== 'mini' && <SelectType options={SEARCH_OPTIONS} onChange={handleChangeType} />}
          <InputSearch
            placeholder={size === 'mini' ? '닉네임 검색' : searchOption.placeholder}
            value={keyword}
            onChange={handleChangeInput}
          />
        </FormItem>
        {size === 'mini' ? (
          <IconSearchMini>
            <AiOutlineSearch />
          </IconSearchMini>
        ) : (
          <IconSearch />
        )}
      </Form>
      {size !== 'mini' && matchList.length > 0 && keyword && (
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
Search.defaultProps = { size: null };
export default Search;
const SearchWrap = styled.div`
  font-size: 1em;
  height: 66px;
  width: fit-content;
  margin: 0 auto;
  ${({ size }: { size?: string }) =>
    size === 'mini' &&
    css`
      display: inline-block;
      height: fit-content;
      max-width: fit-content;
      overflow: hidden;
      float: right;
      border-bottom: 1px solid white;
      margin: 0;
      margin-left: auto;
      transition: all 300ms ease 0ms;
      opacity: 0.5;
      font-size: 0.88em;
      &:hover,
      &:focus {
        opacity: 1;
      }

      ${FormItem} {
        animation: none;
        width: 200px;
      }
      ${Form} {
        border: 0;
        border-radius: 0;
      }

      ${InputSearch} {
        height: 32px;
        padding-left: 4px;
        &::placeholder {
          color: white;
          opacity: 1;
        }
      }
    `}
`;

const Form = styled.form`
  width: fit-content;
  height: 100%;
  margin: 0 auto;
  font-size: 1em;
  display: flex;
  border: 4px solid white;
  border-radius: 32px;
  padding: 2px;
  color: white;
  overflow: hidden;
`;

const FormItem = styled.div`
  width: 840px;
  max-width: 48vw;
  min-width: 480px;
  height: 100%;
  display: flex;
  flex: 1;
  width: 0;
  min-width: 0;
  overflow: hidden;
  animation: ${expand('840px', '480px')} 0.5s 0.2s ease-in forwards;
`;

const InputSearch = styled.input`
  display: block;
  flex: 1;
  height: 100%;
  font-size: 1.2em;
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
const IconSearchMini = styled.button`
  > svg {
    width: 20px;
    height: 20px;
  }
  color: white;
  background: 0;
`;

const SuggestionWrap = styled.div`
  width: calc(100% - 50px);
  margin: 0 auto;
`;
const SuggestionList = styled.ul``;
const Text = styled.li`
  padding: 1.4rem;
  font-size: 0.8em;
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
