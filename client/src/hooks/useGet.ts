import axios from "axios";
import { useEffect, useState } from "react";
import { Specification } from "../types";
import * as queryString from 'query-string'

export default function useGet<T>(path: string, initial: T, qp?: Record<string, any>) {
  const state = useState(initial);

  useEffect(() => {
    axios.get(path + (!qp ? '' : ('?' + queryString.stringify(qp)))).then(res => {
      state[1](res.data);
    })
  }, [path, queryString.stringify(qp || {})])

  return state;
}