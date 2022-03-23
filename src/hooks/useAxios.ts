import { useReducer } from 'react';
import axios from 'axios';
import { API_BASE_URL, NEXON_TMI_KEY } from 'constants/env';

interface IState {
  loading: boolean;
  data: any;
  error: any;
}

type IAction = {
  type: string;
  data?: any;
  error?: any;
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const defaultState = {
  loading: false,
  data: null,
  error: false,
};

const useAxios = () => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const fetchData = async (url: string, params?: object): Promise<void> => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await axios({
        method: 'get',
        url: API_BASE_URL + url,
        data: params,
        headers: {
          Authorization: NEXON_TMI_KEY,
        },
      });
      dispatch({ type: 'SUCCESS', data });
    } catch (err: any) {
      dispatch({ type: 'ERROR', error: err });
    }
  };

  return [state, fetchData];
};
export default useAxios;
