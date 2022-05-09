import "./Help.css"

function Help() {
    return (
        <div className="help-container">
            <h3>Comandos</h3>
            <ul className="commands-list">
                <li>
                    %add
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
                    <span className="info">
                        Retira o seu vídeo pela sua posição, ex:
                        <span class="extra">%quit 3</span>
                    </span>
                </li>
                <li>
                    %voteSkip
                    <span className="info">
                        Adiciona um voto para pular o vídeo atual, é necessário
                        ter 70% dos votos
                    </span>
                </li>
                <li>
                    %skip <span className="info">Pula o vídeo atual</span>
                </li>
                <li>
                    %skip
                    <span className="info">
                        <span class="args">[posição]</span>
                        Retira o vídeo pela sua posição, ex:
                        <span class="extra">%skip 2</span>
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
                    <span className="info">
                        <span class="args">[operador][segundos]</span>
                        Muda o tempo atual do vídeo, ex:
                        <span class="extra">%seek +10</span>
                    </span>
                </li>
                <li>
                    %enter <span className="info"></span>
                </li>
                <li>
                    %move
                    <span className="info">
                        Adiciona seu avatar para a pista de dança
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Help
