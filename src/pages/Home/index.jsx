import React, {useState, useEffect} from 'react';

import { getSkills, getUserId, getUserSkills} from '../../services/api';

import Header from '../../components/Header';
import Modal from '../../components/Modal';
import UserSkillCard from '../../components/UserSkillCard';

import "./styles.css";

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getSkills();
      const response2 = await getUserId();
      const id = response2.data.id
      const response3 = await getUserSkills(id);

      localStorage.setItem("userId", id);
      setSkills(response.data);
      setUserSkills(response3.data);
      setLoading(false);
    })()
  }, [])

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (loading) {
    return <div className="loading">Carregando dados...</div>
  }

  return (
    <div className='main'>
      <Header />
      <div className='userSkills'>
        <div className='listaUserSkills'>
        <h1>Suas Skills:</h1>
          {userSkills.map((userSkill) => (
            <UserSkillCard key={userSkill.id} skill={userSkill} />
          ))}
        </div>

        <div className='adicionarSkills'>
        <h1>Se aprimore:</h1>
        <div className='listaSkills'>
          <button onClick={openModal} >ADICIONAR SKILLS</button>
          <Modal isOpen={modalIsOpen} onClose={closeModal} skills={skills}></Modal>         
        </div>   
        </div>
        

      </div>
    </div>
  );
};

export default Home;