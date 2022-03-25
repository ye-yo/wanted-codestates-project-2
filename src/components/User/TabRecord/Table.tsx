/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ITable {
  theads: readonly string[];
  datas?: any[];
  handleSelect: (id: string) => void;
}
export default function Table({ theads, datas, handleSelect }: ITable) {
  const [selected, setSelected] = useState<string>(datas && datas[0] ? datas[0].id : '');

  useEffect(() => {
    if (datas && datas[0]) setSelected(datas[0].id);
  }, [datas]);
  const handleClick = (id: string) => {
    setSelected(id);
    handleSelect(id);
  };

  return (
    <Wrapper>
      <TableWrapper>
        <thead>
          <tr>
            <td>선택</td>
            {theads.map((head, index) => (
              <td key={index}>{head}</td>
            ))}
          </tr>
        </thead>
        <tbody>
          {datas &&
            datas.map((data) => (
              <tr key={data.id} onClick={() => handleClick(data.id)} className={selected === data.id ? 'selected' : ''}>
                <td>
                  <IconCheck className={selected === data.id ? 'selected' : ''} />
                </td>
                {Object.keys(data)
                  .slice(1)
                  .map((key, index) => {
                    const value = data[key];
                    return (
                      <td key={index}>
                        {value?.img && <img src={value.img} alt={value.name} />}
                        <span>{value?.name !== undefined ? value.name : value}</span>
                      </td>
                    );
                  })}
              </tr>
            ))}
        </tbody>
      </TableWrapper>
    </Wrapper>
  );
}

Table.defaultProps = { datas: [] };

const Wrapper = styled.div`
  padding-bottom: 1.6rem;
  background-color: white;
  max-height: 320px;
  overflow-y: auto;
`;
const TableWrapper = styled.table`
  font-size: 1.1rem;
  width: 100%;
  border-collapse: collapse;

  thead {
    height: 34px;
    background-color: #eeeeee88;
    font-weight: 500;
    td {
      position: relative;
      &:after {
        content: '';
        position: absolute;
        top: 10px;
        right: 0;
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: #ccc;
      }
      &:last-child {
        content: none;
      }
    }
  }
  tbody {
    background-color: white;
  }

  tr {
    text-align: center;
  }

  tbody {
    padding-bottom: 1rem;
    tr {
      cursor: pointer;
      height: 40px;
      &:hover,
      &.selected {
        background-color: ${({ theme }) => theme.color.main}33;
      }
    }
    td {
      min-width: 32px;
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
