import TwitchBadge from "../../components/TwitchBadge"
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
                    %search
                    <span className="args">[título do vídeo]</span>
                    <div className="new">Novo comando</div>
                    <span className="info">Adiciona um vídeo pelo título</span>
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
                    %current <div className="new">Novo comando</div>
                    <span className="info">
                        Manda o título do vídeo atual
                        <span className="more"> (cooldown de 10 segundos)</span>
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
                    %dancer
                    <span className="args">enter</span>
                    <span className="info">
                        Adiciona seu avatar para a pista de dança
                    </span>
                </li>
                <li>
                    %dancer
                    <span className="args">move</span>
                    <span className="info">Muda a posição do seu avatar</span>
                </li>
                <li>
                    %ping
                    <span className="info">
                        Retorna informações gerais sobre o bot
                    </span>
                </li>
                <div className="twitch-badges">
                    <img
                        src="https://f.feridinha.com/sync/badges/staff.png"
                        alt=""
                    />
                    <img
                        src="https://f.feridinha.com/sync/badges/broadcaster.png"
                        alt=""
                    />
                    <img
                        src="https://f.feridinha.com/sync/badges/moderator.png"
                        alt=""
                    />
                </div>
                <li>
                    %skip
                    <span className="info">
                        Pula o vídeo atual{" "}
                        <span className="more"> (cooldown de 3 segundos)</span>
                    </span>
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
                <div className="twitch-badges">
                    <img
                        src="https://f.feridinha.com/sync/badges/staff.png"
                        alt=""
                    />
                    <img
                        src="https://f.feridinha.com/sync/badges/broadcaster.png"
                        alt=""
                    />
                </div>
                <li>
                    %ban
                    <span className="args">[username]</span>
                    <div className="new">Novo comando</div>
                    <span className="info">
                        Tira a permissão de usar o bot{" "}
                        <span className="more"> (cooldown de 10 segundos)</span>
                    </span>
                </li>
                <li>
                    %unban
                    <span className="args">[username]</span>
                    <div className="new">Novo comando</div>
                    <span className="info">
                        Devolve a permissão de usar o bot
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Help
