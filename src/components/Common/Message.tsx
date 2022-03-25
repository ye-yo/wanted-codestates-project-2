import { memo } from 'react';
import styled from 'styled-components';

interface MessageProps {
  title: string;
  message: string;
  toggleMessage: () => void;
}

function Message({ title, message, toggleMessage }: MessageProps) {
  return (
    <MessageWrap>
      <Content>
        <Title>{title}</Title>
        <Text>{message}</Text>
      </Content>
      <ConfirmButton onClick={toggleMessage}>확인</ConfirmButton>
    </MessageWrap>
  );
}

export default memo(Message);

const MessageWrap = styled.section`
  width: fit-content;
  max-width: 500px;
  min-width: 240px;
  min-height: 128px;
  height: fit-content;
  position: fixed;
  border-radius: 1.4rem;
  font-size: 1.2rem;
  top: 50%;
  left: 50%;
  z-index: 101;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0px 4px 20px 4px rgb(0 0 0 / 30%);
  color: initial;
  text-align: left;
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  ${({ theme }) => theme.mobile`
    left: 0;
  `};
`;

const Content = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.size.ContentHeight};
  font-size: 1em;
`;

const Title = styled.p`
  font-weight: 500;
  margin-bottom: 6px;
  font-size: 1.2em;
`;
const ConfirmButton = styled.button`
  padding: 1.2rem;
  margin-left: auto;
  display: block;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.color.main};
  color: white;
  font-size: 0.88em;
  margin-top: auto;
  :hover {
    opacity: 0.8;
  }
`;

const Text = styled.p`
  white-space: pre-line;
`;
