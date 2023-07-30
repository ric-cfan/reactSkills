import "./styles.css";

import React, { useState } from 'react';
import { createUserSkill } from '../../services/api';

const Modal = ({ isOpen, onClose, skills, children }) => {

  const [selectedOption, setSelectedOption] = useState('');
  const [inputLvl, setInputLvl] = useState(0);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const addSkill = (idSkill, lvl) => {
    (async () => {
      const id = localStorage.getItem("userId");
      await createUserSkill(id, idSkill, lvl);
      window.location.reload();
    })();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div>
          <div className="selects">
            <p>Skill:</p>
            <select value={selectedOption} onChange={handleChange}>
              <option value="">Selecione uma opção</option>
              {skills.map((skill) => (
                <option key={skill.id} value={skill.id}>{skill.nome}</option>
              ))}
            </select>
            <p>Level:</p>
            <input  type="number" name="inputLvl" id="inputLvl" value={inputLvl} onChange={(e) => setInputLvl(e.target.value)} />
          </div>
        </div>
        <div className="buttons">
          <button onClick={() => addSkill(selectedOption, inputLvl)}>ADICIONAR</button>
          <button className="close-button" onClick={onClose}>RETORNAR</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;