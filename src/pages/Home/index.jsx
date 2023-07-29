import React, {useState, useEffect, useContext} from 'react';

import { AuthContext } from '../../contexts/auth';

import { createUserSkill, deleteUserSkill, getSkills, getUserId, getUserSkills, updateUserSkill } from '../../services/api';

const Home = () => {
  const {logout} = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(0);
  const [inputLvl, setInputLvl] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getSkills();
      const response2 = await getUserId();
      const id = response2.data.id
      const response3 = await getUserSkills(id);
      console.log("id", id);

      setSkills(response.data);
      setUserId(id);
      setUserSkills(response3.data);
      setLoading(false);
    })()
  }, [])

  useEffect(() => {
    console.log("userID", userId)
    if(userId != null) {
    setLoading(true);
      (async () => {
        const response = await getUserSkills(userId);

        setUserSkills(response.data);
        setLoading(false);
      })()
    }
  }, [refresh])

  const handleLogout = () => {
    logout();
  }

  const addSkill = (idSkill, lvl) => {
    (async () => {
      await createUserSkill(userId, idSkill, lvl);
      const num = refresh;
      setRefresh(num+1);
    })();
  }

  const updateSkill = (idUserSkill, lvl) => {
    (async () => {
      await updateUserSkill(idUserSkill, lvl);
      const num = refresh;
      setRefresh(num+1);
    })();
  }

  const deleteSkill = (idUserSkill) => {
    (async () => {
      await deleteUserSkill(idUserSkill);
      const num = refresh;
      setRefresh(num+1);
    })();
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
              {skill.nome} - {skill.descricao} - {skill.urlImagem} - 
              <button type="button" onClick={() => addSkill(skill.id, inputLvl)}>ADICIONAR</button>
            </li>
          ))
        }
      </ul>
      <p>Level:</p>
      <input  type="number" name="inputLvl" id="inputLvl" value={inputLvl} onChange={(e) => setInputLvl(e.target.value)} />
      <p>User Skills:</p>
      <ul>
        {
          userSkills.map((userSkill) => (
            <li key={userSkill.id}>
              {userSkill.skill.nome} - {userSkill.skill.descricao} - {userSkill.lvl}- {userSkill.skill.urlImagem}
              <button>EDITAR</button>
              <button>DELETAR</button>
            </li>
          ))
        }
      </ul>
    </>
  );
};

export default Home;