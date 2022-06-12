import React, { useState } from 'react';
import '../../Styles/Create.css'

export default function Form() {
 
  // const [input, setInput] = useState({
  //   name: '',
  //   lastname: '',
  //   user: ''
  // });
  // const [error, setError] = useState('');
  
  // function validateEmail(value) {
  //   var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.

  //   if(!emailPattern.test(value)) {
  //     console.log('entro al if')
  //     setError('El usuario debe ser un email');
  //   } else {
  //     setError('')
  //   }
  // }

  // function handleChange(e) {
  //   const { value, name } = e.target;

  //   if(name === 'user') {
  //     validateEmail(input.user)
  //   }

  //   setInput({
  //     ...input,
  //     [name]: value // Sintaxis ES6 para actualizar la key correspondiente
  //   });
  // }
  const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');

/************************************************************************************************ */

  function validateName(value) {
    if(/[^A-Za-z]/.test(value)) {
      setError('El nombre no debe poseer numeros ni caracteres especiales');
    } else {
      setError('');
    }
    setName(value);
  }

  // function validateNumber(value) {
  //   if(/[^0-9]/.test(value)) {
  //     setError('El password no debe poseer letras');
  //   } else {
  //     setError('');
  //   }
  //   setPassword(value);
  // }
  
  
  return (
  //   <form>
  //   <input className={error && 'danger'}
  //     name="name" value={name} placeholder="name" onChange={(e) => validateName(e.target.value)} />
  //   {!error ? null : <span>{error}</span>}
  //   <input name="password" value={password} placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
  //   <input type="submit" />
  // </form>



    <div className="contenedor">
      <div className="contacto">
        <h2>Registrar Receta</h2>
        <form className="formulario">
          <p className="item1">
            <label>Nombre del Plato</label>
            <input type="text" name="name" value={name} placeholder="name" onChange={(e) => validateName(e.target.value)} />
            {!error ? null : <span>{error}</span>}
          </p>
          <p className="full item2">
            <label>Resumen</label>
            <textarea name="message" ></textarea>
          </p>
          <p className="item3">
            <label>Puntuación</label>
            {/* >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> */}
            <input type="range" id="vol" name="vol" min="0" max="50" />
          </p>
          <p className="item4">
            <label>Nivel de Comida Saludable</label>

            <div className="value">0</div>
            <input type=""></input>
            
            {/* <input type="range" value="25"></input>           */}
          </p>
          <p className="full item5">
            <label>Preparación</label>
            <textarea name="mensaje" ></textarea>
          </p>
          <p className="full item6">
            <button className="boton-enviar">Guardar Receta</button>
          </p>
        </form>
      </div>
    </div>



  //   <form>  
  //   <input
  //     name="name"
  //     type="text"
  //     value={input.name}
  //     onChange={handleChange}
  //     placeholder="Nombre" />
  //   <input
  //     name="lastname"
  //     type="text"
  //     value={input.lastname}
  //     onChange={handleChange}
  //     placeholder="Apellido" />
  //   <input
  //     name="user"
  //     type="text"
  //     value={input.user}
  //     onChange={handleChange}
  //     placeholder="Usuario" />
  //   {!error ? null : <div>{error}</div>}
  //   <input type="submit" value="Submit" />
  // </form>
    
  );
}