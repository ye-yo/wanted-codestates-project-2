import styled from 'styled-components';
import { IParsedMatch } from 'interfaces/match';
import { getMatchList } from 'services/matchListService';
import { useAppDispatch, useAppSelector } from 'store/config';
import useInfiniteScroll from 'hooks/useInfiniteScroll';
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
          options: { ...options, offset: options.offset + 1 },
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
      {datas.length > 0 && <Bottom ref={setRef}>로딩중입니다~~~~~~~~~~~~~~</Bottom>}
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
