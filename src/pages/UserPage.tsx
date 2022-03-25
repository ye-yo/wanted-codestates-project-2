import styled from 'styled-components';
import { NEXON_TMI } from 'constants/env';
import User from 'components/User/index';
import ApiInfo from 'components/User/ApiInfo';
import Message from 'components/Common/Message';
import { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'store/config';
import { getMatchList } from 'services/matchListService';
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser } from 'services/userService';

function UserPage() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [open, setOpenMessage] = useState(false);
  const location = useLocation();
  const handleCloseMessage = useCallback(() => {
    setOpenMessage(false);
    navigate('/');
  }, [navigate]);

  const getSearchUser = async () => {
    const name = decodeURIComponent(location.search.replace('?', ''));
    const response = await dispatch(getUser(name));
    if (response.payload) {
      dispatch(getMatchList({ accessId: response.payload.accessId }));
    } else {
      setOpenMessage(true);
    }
  };

  useEffect(() => {
    if (user?.accessId) {
      dispatch(getMatchList({ accessId: user.accessId }));
    } else if (location.search) {
      getSearchUser();
    }
  }, []);
  return (
    <Wrapper>
      <Background className="background" />
      <Inner className="inner">
        {open && <Message title="경고" message="유저 정보가 없습니다." toggleMessage={handleCloseMessage} />}
        <ApiInfo />
        <User.Profile />
        <User.SummaryRecord />
        <User.TabRecord />
      </Inner>
    </Wrapper>
  );
}

export default UserPage;
const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const Background = styled.div`
  position: absolute;
  height: calc(${({ theme }) => theme.size.menuHeight} + 100%);
  top: 0;
  left: 0;
  background: url(${NEXON_TMI}/img/main_bg1.png) 50% / cover repeat;
  filter: brightness(0.9);
`;

const Inner = styled.div`
  height: auto;
  font-size: 1.2rem;
  > section {
    margin-bottom: 2rem;
  }
`;
