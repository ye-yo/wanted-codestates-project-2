import styled, { css } from 'styled-components';
import { IoMdRefresh } from 'react-icons/io';
import { AiFillAlert, AiOutlineLoading } from 'react-icons/ai';
import { GiShare } from 'react-icons/gi';
import { FiDownload } from 'react-icons/fi';
import { rotate } from 'styles/animations';

export default function ButtonWrap() {
  const loading = false;
  return (
    <Wrapper>
      <Button>
        {loading ? <IconRotate /> : <IoMdRefresh />}
        전적갱신
      </Button>
      <Button>
        <AiFillAlert />
        신고하기
      </Button>
      <Button>
        <GiShare />
        공유하기
      </Button>
      <Button fill={1}>
        <FiDownload />
        프로필 저장
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

interface IButton {
  fill?: number;
  theme: any;
}
const Button = styled.button`
  line-height: 0;
  font-size: 1.06rem;
  padding: 0.4rem 1rem;
  border-radius: 2rem;
  border: 1px solid white;
  color: white;
  background: transparent;
  line-height: 16px;
  :hover {
    opacity: 0.8;
  }
  &:nth-child(n + 2) {
    margin-left: 4px;
  }
  ${({ fill, theme }: IButton) =>
    fill &&
    css`
      background: ${theme.color.darkMain};
      border-color: ${theme.color.darkMain};
      color: white;
    `}
  svg {
    width: auto;
    height: 16px;
    margin-right: 4px;
    line-height: 0;
    vertical-align: sub;
  }
`;

const IconRotate = styled(AiOutlineLoading)`
  padding: 2px;
  transform-origin: 50% 50%;
  animation: ${rotate} 1s linear infinite;
  ${({ loading }: { loading?: boolean }) => loading && css``}
`;
