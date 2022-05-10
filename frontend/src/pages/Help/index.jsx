import "./Help.css"

function Help() {
    return (
        <div className="help-container">
            <h3>Comandos</h3>
            <ul className="commands-list">
                <li>
                    %add
                    <span className="args">[youtube-url]</span>
                    <span className="info">
                        Adiciona um vídeo para a queue, limite de 5 por usuário
                    </span>
                </li>
                <li>
                    %quit
                    <span className="info">
                        Retira o seu primeiro vídeo da queue
                    </span>
                </li>
                <li>
                    %quit
                    <span className="args">[posição]</span>
                    <span className="info">
                        Retira o seu vídeo pela sua posição, ex:
                        <span className="args">%quit 3</span>
                    </span>
                </li>
                <li>
                    %voteSkip
                    <span className="info">
                        Adiciona um voto para pular o vídeo atual, é necessário
                        ter <b>70%</b> dos votos
                    </span>
                </li>
                <li>
                    %skip <span className="info">Pula o vídeo atual</span>
                </li>
                <li>
                    %skip
                    <span className="args">[posição]</span>
                    <span className="info">
                        Retira o vídeo pela sua posição, ex:
                        <span className="args">%skip 2</span>
                    </span>
                </li>
                <li>
                    %skipAll
                    <span className="info">
                        Remove todos os vídeos da queue
                    </span>
                </li>
                <li>
                    %seek
                    <span className="args">[operador][segundos]</span>
                    <span className="info">
                        Muda o tempo atual do vídeo, ex:
                        <span className="args">%seek +10</span>
                    </span>
                </li>
                <li>
                    %dancer
                    <span className="args">enter</span>
                    <span className="info">
                        Adiciona seu avatar para a pista de dança
                    </span>
                </li>
                <li>
                    %dancer
                    <span className="args">move</span>
                    <span className="info">
                    Muda a posição do seu avatar
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Help
