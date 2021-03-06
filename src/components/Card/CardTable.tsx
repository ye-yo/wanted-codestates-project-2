import styled from 'styled-components';
import { IParsedMatch } from 'interfaces/match';
import { getMatchList } from 'services/matchListService';
import { useAppDispatch, useAppSelector } from 'store/config';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
import CardUI from 'components/Skeletons/CardUI';
import Card from './Card';

type ObserverType = { unobserve: (arg0: any) => void; observe: (arg0: any) => void; disconnect: () => void };
type EntryType = { target: any };

export default function CardTable({ datas }: { datas: IParsedMatch[] }) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { filter, options, loading, isEnded } = useAppSelector((state) => state.matchList);

  const [, setRef] = useInfiniteScroll(
    async (entry: EntryType, observer: ObserverType) => {
      if (isEnded && observer) {
        observer.disconnect();
        return;
      }
      if (user && !loading && !isEnded) {
        observer.unobserve(entry.target);
        const fetchDataParams = {
          accessId: user?.accessId,
          filter,
          options: { ...options, offset: options.offset + options.limit },
        };
        await dispatch(getMatchList(fetchDataParams));
        observer.observe(entry.target);
      }
    },
    [options.offset],
  );

  return (
    <Table>
      {datas.map((data: IParsedMatch) => (
        <Card key={data.matchId} data={data} />
      ))}
      {datas.length > 0 && <Bottom ref={setRef} />}
      {loading && <CardUI />}
      {!loading && datas.length === 0 && (
        <Empty>
          <b>{user?.name}</b>님은 아직 <b>{filter.channel}</b> 채널의 <br />
          <b>{filter.isTeam ? '팀전' : '개인전'}</b> 전적 데이터가 없습니다.
        </Empty>
      )}
    </Table>
  );
}

const Table = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Bottom = styled.div`
  height: 40vh;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
`;

const Empty = styled.div`
  background-color: #ffffff88;
  font-size: 1.6rem;
  text-align: center;
  width: 100%;
  border-radius: 2rem;
  padding: 8rem;
  line-height: 2;
  b {
    color: ${({ theme }) => theme.color.main};
  }
`;
