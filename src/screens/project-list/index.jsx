import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [params, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParams = useDebounce(params);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(params))}`).then(
      async (res) => {
        if (res.ok) setList(await res.json());
      }
    );
  }, [debounceParams]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) setUsers(await res.json());
    });
  });

  return (
    <div>
      <SearchPanel params={params} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
