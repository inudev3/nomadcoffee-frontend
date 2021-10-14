import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { me } from "../__generated__/me";

const ME_QUERY = gql`
  query me {
    me {
      id
      username
      avatarURL
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { loading, data } = useQuery<me>(ME_QUERY, {
    // to query
    skip: !hasToken, //if not logged in, do not execute query
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data]);
  return { data };
}

export default useUser;
