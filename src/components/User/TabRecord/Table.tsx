/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import styled from 'styled-components';

interface ITable {
  theads: readonly string[];
  datas: any[];
}
export default function Table({ theads, datas }: ITable) {
  const [selected, setSelected] = useState<number>(0);
  const handleClick = (index: number) => {
    setSelected(index);
  };

  return (
    <Wrapper>
      <thead>
        <tr>
          <td>선택</td>
          {theads.map((head, index) => (
            <td key={index}>{head}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {datas.map((data, index) => (
          <tr key={index} onClick={() => handleClick(index)} className={selected === index ? 'selected' : ''}>
            <td>
              <IconCheck className={selected === index ? 'selected' : ''} />
            </td>
            {Object.values(data).map((value: any, index) => (
              <td key={index}>
                {value.img && <img src={value.img} alt={value.name} />}
                <span>{value.name ? value.name : value}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Wrapper>
  );
}

const Wrapper = styled.table`
  font-size: 1.1rem;
  width: 100%;
  background-color: #ffffff88;
  border-collapse: collapse;

  thead {
    height: 34px;
    background-color: #eeeeee;
    font-weight: 500;
  }
  tbody {
    background-color: white;
  }

  tr {
    text-align: center;
  }

  tbody {
    tr {
      cursor: pointer;
      height: 40px;
      &:hover,
      &.selected {
        background-color: ${({ theme }) => theme.color.main}33;
      }
    }
    td {
      :nth-child(2) {
        text-align: left;
        padding-left: 10px;
      }
      span {
        vertical-align: middle;
      }
      img {
        vertical-align: middle;
        margin-right: 4px;
        height: auto;
        width: 100%;
        max-width: 30px;
        max-height: 30px;
      }
    }
  }
`;

const IconCheck = styled.p`
  width: 18px;
  height: 18px;
  border: 1px solid ${({ theme }) => theme.color.main};
  border-radius: 50%;
  position: relative;
  margin: 0 auto;
  &.selected:after {
    content: '';
    position: absolute;
    display: block;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.color.main};
  }
`;
