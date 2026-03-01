import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const AnswerIdeal = ({}) => {

    const matrix1 = `\\begin{equation}\\begin{bmatrix} 1 & 0 & -1 \\\\ 3 & 0 & 2 \\end{bmatrix}\\end{equation}`;
    const matrix2 = `\\begin{equation}\\begin{bmatrix} 1 & 2 & 3 \\\\ 2 & a & b \\\\ 3 & b & a \\end{bmatrix}\\end{equation}`;

    return (
        <div style={{ padding: '20px', lineHeight: '1.8', fontFamily: 'serif' }}>
        <p>
            数や文字を長方形の形に並べたものを <strong style={{ color: '#ff6600' }}>行列</strong> と呼びます。例えば
        </p>

        <BlockMath math={matrix1} />
        <BlockMath math={matrix2} />

        <p>
            は行列です。左上の行列は <strong style={{ color: '#ff6600' }}>行</strong>（＝行列の横の並び）が2本、
            <strong style={{ color: '#ff6600' }}>列</strong>（＝縦の並び）が3本からなるので、
            <strong style={{ color: '#ff6600' }}><InlineMath math="2 \times 3" /> 型行列</strong> 、
            また右上の行列は行が3本、列も3本なので <strong style={{ color: '#ff6600' }}><InlineMath math="3 \times 3" /> 型の行列</strong> と言います。
        </p>

        <p>
            線形代数の前半では、このような行列の性質について調べていきます。今回の授業ノートでは行列の基本的な用語について、例を交えながら説明します。
        </p>
        </div>
    );
}

export default AnswerIdeal