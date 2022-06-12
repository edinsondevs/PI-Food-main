import React, { useState, useEffect } from 'react';
import ButtonNext from '../../Icons/NextPage.jsx';
import ButtonPrev from '../../Icons/PrevPage.jsx';
import '../../Styles/Cards.css'
// import { NavLink }from 'react-router-dom';

const Ordering = ({ ordering, numberPage }) => {

    const [valor1, setValor1] = useState(0);
    const [valor2, setValor2] = useState(numberPage);
    const [loadings, setLoadings] = useState(false);
    const [current, setCurrent] = useState(1)
    // setTimeout(() => {
    //     setLoadings(false);
    // },600)
    // useEffect(() => {    //    // setLoadings(true);
    // }, [])
    const api = ordering
    console.log(api)
    
    const next_Page = () => {
        if (valor2 >= ordering.length) { }
        else {
            setValor1(valor1 + numberPage);
            setValor2(valor2 + numberPage);
            setCurrent(current + 1);
        }
    }
    const prev_Page = () => {
        if (valor1 === 0) { }
        else {
            setValor1(valor1 - numberPage);
            setValor2(valor2 - numberPage);
            setCurrent(current - 1);
        }
    }
    
    const order = (x,y) => {
        if (x.title < y.title) {return 1;}
        if (x.title > y.title) {return -1;}
        return 0;
    }    
    // console.log(ordering.sort(order))    
    
    return (
        <div>
            {/* {console.log(SortArray)} */}
            {/***********************  Visualizacion del paginado *************************/}
            <div className="learn-more_title">
                <h3>Previus</h3>
                <h3> Page  </h3>
                <h3>Next</h3>
            </div>
            <div className="learn-more">
                <button onClick={prev_Page}>
                    <ButtonPrev height="44" onClick={prev_Page}></ButtonPrev>
                </button>
                <h3> {current} </h3>
                <button onClick={next_Page}>
                    <ButtonNext height="44" onClick={next_Page}></ButtonNext>
                </button>
            </div>
            {/***********************  Visualizacion de Recetas  *************************/}
            {!loadings && <div className="section_cards">
                {ordering.sort(order).slice(valor1, valor2).map((e) => {
                    return (
                        <div className="card" key={e.id}>
                            <div >
                                <img src={e.image} alt="" />
                                <div>
                                    <div>{e.name}</div>
                                    <div>
                                        <div>Titulo: {e.title}</div>
                                        <div>Tipo de Dieta: {e.glutenFree}</div>
                                        <div>{e.id}</div>
                                        <button className="card-button" >
                                             {/* <NavLink to='/Card'>     */}
                                            More info
                                            {/* </NavLink> */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }) }
            </div>}
            {loadings &&
                <img src="https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif" alt="" />
            }
        </div>
    )
}

export default Ordering;
