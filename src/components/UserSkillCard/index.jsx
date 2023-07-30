import "./styles.css";
import React, {useState} from 'react';
import { deleteUserSkill, updateUserSkill } from '../../services/api';

function UserSkillCard(skill) {
  const [inputLvl, setInputLvl] = useState(skill.skill.lvl);

  const updateSkill = (skill) => {
    (async () => {
      await updateUserSkill(skill.skill.id, inputLvl);
      alert("Level atualizado!");
    })();
  }

  const deleteSkill = (skill) => {
    (async () => {
      await deleteUserSkill(skill.skill.id);
      window.location.reload();
    })();
  }


  return (
    <>
      <div className="card">
      <img className='imagem' src={skill.skill.skill.urlImagem} alt="Imagem da skill"/>
        
        <div className="info">
          <div className="nome">
            <h2>{skill.skill.skill.nome}</h2>
          </div>
          <div className="descricao">
            <p>{skill.skill.skill.descricao}</p>
          </div>
          <div className="level">
            <p>Level: </p>
            <input  type="number" name="inputLvl" id="inputLvl" value={inputLvl} onChange={(e) => setInputLvl(e.target.value)} />
          </div>
        </div>
        <div className="tools">
          <button  type="button" onClick={() => updateSkill(skill, inputLvl)}>EDITAR</button>
          <button  type="button" onClick={() => deleteSkill(skill)}>DELETAR</button>
        </div>
      </div>
    </>
  )
}

export default UserSkillCard;