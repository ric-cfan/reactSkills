import React, {useState, useEffect, useContext} from 'react';

import { AuthContext } from '../../contexts/auth';

import { getSkills, getUserId, getUserSkills } from '../../services/api';

const Home = () => {
  const {logout} = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [userId, setUserId] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const response = await getSkills();
      const response2 = await getUserId();
      const id = response2.data.id
      const response3 = await getUserSkills(id);

      setSkills(response.data);
      setUserId(id);
      setUserSkills(response3.data);
      setLoading(false);
    })()
  }, [])

  const handleLogout = () => {
    logout();
  }

  if (loading) {
    return <div className="loading">Carregando dados...</div>
  }

  return (
    <>
      <h1>Home</h1>
      <button onClick={handleLogout}>Logout</button>
      <p>Skills:</p>
      <ul>
        {
          skills.map((skill) => (
            <li key={skill.id}>
              {skill.nome} - {skill.descricao}
            </li>
          ))
        }
      </ul>
      <p>User Skills:</p>
      <ul>
        {
          userSkills.map((userSkill) => (
            <li key={userSkill.id}>
              {userSkill.nome} - {userSkill.descricao}
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Home;