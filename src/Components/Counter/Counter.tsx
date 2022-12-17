import './Counter.css'

export const Counter = ({count}: {count: number}) =>
{
    const units = count % 10;
    const tens = Math.floor(count / 10) % 10;
    const hundreds = Math.floor(count / 100) % 10;

    return <><span className="counter"><span>{hundreds}</span><span>{tens}</span><span>{units}</span></span></>
}