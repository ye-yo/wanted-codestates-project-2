import { memo } from 'react';
import styled from 'styled-components';
import { ISelectOption } from 'interfaces/search';

interface ISelectType {
  options: readonly ISelectOption[];
  onChange: (target: ISelectOption) => void;
}

function SelectType({ options, onChange }: ISelectType) {
  const handleChangeOption = (e: { target: HTMLSelectElement }) => onChange(options[Number(e.target.value)]);
  return (
    <SelectWrap>
      <Select onChange={handleChangeOption}>
        {options.map(({ id, name }, index) => (
          <Option key={id} value={index}>
            {name}
          </Option>
        ))}
      </Select>
    </SelectWrap>
  );
}

export default memo(SelectType);
const SelectWrap = styled.div`
  width: 100px;
  min-width: 100px;
  padding: 4.8px 0 4.8px 10px;
  position: relative;
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    right: 14px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #fff;
    transform: translate(0, -50%);
  }
`;
const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 10px;
  font-size: 1.4rem;
  text-align: center;
  border: 0;
  background: transparent;
  font-weight: 500;
  position: relative;
  border-right: 1px solid #fff;
  color: inherit;
  appearance: none;
  outline: none;
`;

const Option = styled.option``;
