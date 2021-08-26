export const SearchPanel = ({ params, setParam, users }) => {
  return (
    <form>
      <div>
        <input
          type="text"
          value={params.name}
          onChange={(e) =>
            setParam({
              ...params,
              name: e.target.value,
            })
          }
        />
        <select
          value={params.personId}
          onChange={(e) =>
            setParam({
              ...params,
              personId: e.target.value,
            })
          }
        >
          <option value={""}>负责人</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
};
