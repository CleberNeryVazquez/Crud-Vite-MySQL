import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Livros = () => {
    const [livros, setLivros] = useState([])
    useEffect(() => {
        const fecthAllLivros = async () => {
            try {
                const res = await axios.get("http://localhost:8800/livros")
                setLivros(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fecthAllLivros()
    },[])
    return(
        <div>
           <h1>Cleber Shop Livros</h1>
           <div className="livros">
            {livros.map(livro => (
                <div className="livro" key={livro.id}>
                    {livro.img && <img src={livro.img} alt="" />}
                    <h2>{livro.titulo}</h2>
                    <p>{livro.desc}</p>
                    <span>{livro.preco}</span>
                </div>
            ))}
           </div>
                <button><Link to={'/add'}>add novo livro</Link></button>
        </div>
    )
}
export default Livros;