import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const AnswerIdeal = ({literals}) => {


    return (
        <div style={{ padding: '20px', lineHeight: '1.8', fontFamily: 'serif' }}>
        {literals.map((literal)=>(
        literal.charAt(0) === `\\` ? <BlockMath math={literal}/> : <p>{literal}</p>
        )) }
        </div>
    );
}

export default AnswerIdeal