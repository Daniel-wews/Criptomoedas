import { useState, FormEvent, useEffect } from 'react'
import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'

export interface CoinsProps{
    id:string;
    name:string;
    symbol:string;
    priceUsd:string;
    supply:string;
    maxSupply:string;
    marketCapUsd:string;
    changePercent24Hr:string;
    volumeUsd24Hr:string;
    vwap24Hr:string;
    explorer:string;
    formatedPrice?: string;
    formatedMarket?: string;
    formatedVolume?: string;
}

interface Dataprops{
    data:CoinsProps[]
}
export default function Home (){
    const [input,setInput] = useState('')
    const [coins,setCoins] = useState<CoinsProps[]>([]);
    const [offset, setOffset] = useState(0);

    const navigate = useNavigate()

    useEffect(()=>{
        getData()
    },[offset])

    async function getData(){
        fetch(`https://api.coincap.io/v2/assets?limit=10&offset=${offset}`)
        .then(response => response.json())
        .then((data:Dataprops) => {
            const coinsData = data.data

            const price = Intl.NumberFormat("en-US", {
                style:"currency",
                currency:"USD",
            })

            const priceCompact = Intl.NumberFormat("en-US", {
                style:"currency",
                currency:"USD",
                notation:'compact'
            })

            const formatedResult = coinsData.map((item) =>{
                const formated = {
                    ...item,
                    formatedPrice: price.format(Number(item.priceUsd)),
                    formatedMarket: priceCompact.format(Number(item.marketCapUsd)),
                    formatedVolume: priceCompact.format(Number(item.volumeUsd24Hr))
                }
                return formated;
            })

            // console.log(formatedResult)
            const listCoins = [...coins, ...formatedResult]

            setCoins(listCoins);
        })
    }

    function handleSubmit(e: FormEvent){
        e.preventDefault();
        if(input === '')return;
        navigate(`/detail/${input}`)
    }

    function handleGetMore(){
        if(offset === 0) {
            setOffset(10)
            return;
        }

        setOffset(offset)
    }
    
    return(
        <main className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input 
                placeholder='Digite o nome da moeda... Ex bitcoin'
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                 />
                 <button type='submit'>
                    <BsSearch size={30} color='#fff'/> 
                 </button>
            </form>

            <table>
                <thead>
                    <tr>
                        <th scope='col'>Moeda</th>
                        <th scope='col'>Valor mercado</th>
                        <th scope='col'>Preço</th>
                        <th scope='col'>Volume</th>
                        <th scope='col'>Mudança 24h</th>
                    </tr>
                </thead>

                <tbody id='tbody'>
                    {coins.length > 0 && coins.map((item) => (
                        <tr className={styles.tr} key={item.id}>
                        <td className={styles.tdLabel} data-Label='Moeda'>
                            <div className={styles.name}>
                                <img className={styles.logo}
                                 src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`} alt="logo Cripto" />
                            <Link to={`/detail/${item.id}`}>
                            <span>{item.name}</span> | {item.symbol}
                            </Link>
                            </div>
                        </td>

                        <td className={styles.tdLabel} data-label='valor mercado'>
                            {item.formatedMarket}
                        </td>

                        <td className={styles.tdLabel} data-label='preço'>
                            {item.formatedPrice}
                        </td>

                        <td className={styles.tdLabel} data-label='Volume'>
                            {item.formatedVolume}
                        </td>

                        <td className={Number(item.changePercent24Hr) > 0 ? styles.tdProfit : styles.tdLoss} data-label='Mudança 24h'>
                            <span>{Number(item.changePercent24Hr).toFixed(3)}</span>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <button  className={styles.buttonMore} onClick={handleGetMore}>
                carregar mais
            </button>
        </main>
    )
}