import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState(data);
  const [filters, setFilters] = useState({
    name: undefined,
    company: undefined,
    username: undefined,
  });
  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const usersData = await res.json();
    setData(usersData);
    setFilteredData(usersData);
  };

  const handleFiltersChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // first we check if filters are empty
    let complete = false;
    Object.values(filters).forEach((value) => {
      if (value) {
        complete = true;
      }
    });

    if (!complete) {
      setFilteredData(data);
      return;
    }
    const filteredData = data?.filter((user) => {
      let pass = true;
      Object.entries(filters).forEach((filter) => {
        const [key, value] = filter;
        if (!value) return;
        if (key == "company") {
          pass = user.company.name.toLowerCase().includes(value?.toLowerCase());
        } else {
          pass = user[key]?.toLowerCase().includes(value?.toLowerCase());
        }
      });
      return pass;
    });
    setFilteredData(filteredData);
  }, [filters]);

  return (
    <div className="p-8">
      {JSON.stringify(filters)}
      <form className="flex gap-5 flex-col shadow-md rounded-md my-4 p-3 max-w-[450px]">
        <div>
          <label> search by name</label>{" "}
          <input
            onChange={handleFiltersChange}
            name="name"
            type="text"
            className="border"
          />
        </div>
        <div>
          <label> search by username</label>{" "}
          <input
            onChange={handleFiltersChange}
            name="username"
            type="text"
            className="border"
          />
        </div>
        <div>
          <label> select age</label>{" "}
          <select onChange={handleFiltersChange} name="company">
            <option value="none">none</option>
            <option value="romaguera">Romaguera</option>
            <option value="robel">Robel</option>
          </select>
        </div>
      </form>
      <div className="flex flex-wrap gap-4">
        {filteredData?.map((user) => (
          <div className="  p-2 shadow-md rounded-lg" key={user.id}>
            <ul>
              <li className="my-1 text-blue-500">
                <span className="font-bold">id:</span> {user.id}
              </li>
              <li className="my-1 text-green-500">
                <span className="font-bold">name:</span> {user.name}
              </li>
              <li className="my-1 text-cyan-600">
                <span className="font-bold">username: </span>
                {user.username}
              </li>
              <li className="my-1 text-orange-500">
                <span className="font-bold">email: </span>
                {user.email}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
