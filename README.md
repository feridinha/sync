<p align="center"><img src="https://f.feridinha.com/sync/logo.gif" width="230" height="172"></p>

#

<p align="center"> Uma forma de assistir vídeos de forma sincronizada com sua comunidade da twitch. </p>

## 🏁 Comece

```shell
$ git clone https://github.com/feridinha/sync
$ cd sync
```

#

## 📂 Pastas

### [Api](https://github.com/feridinha/sync/tree/master/api)

- Hospedado em [api.feridinha.com](https://api.feridinha.com) & [localhost:9999](http://localhost:9999)
- Responsável em gerenciar toda a lógica da aplicação

### [Frontend](https://github.com/feridinha/sync/tree/master/frontend)

- Hospedado em [sync.feridinha.com](https://sync.feridinha.com) & [localhost:3000](http://localhost:3000)
- Representa a interface do usuário

#

## 🔒 Tokens de acesso

- [**Twitch**](https://twitchtokengenerator.com) Crie um token com a autorização de **ler mensagens do chat**
- [**Youtube**](https://developers.google.com/youtube/v3/getting-started?hl=pt-br#intro) Crie um token para a api do youtube

#

## ⚙️ Configurar variáveis de ambiente (.env)

### [Api](https://github.com/feridinha/sync/tree/master/api)

- YOUTUBE_API_KEY Seu token do **youtube api v3**, utilizado para puxar dados dos vídeos
- IO_URL Url do socket.io, utilizada no **CORS**
- TMI_ACCESS_TOKEN Access token do bot da twitch
- TMI_CLIENT_ID Client Id do bot da twitch

### [Frontend](https://github.com/feridinha/sync/tree/master/api)

- API_PATH Url da api, utilizada no websocket

#
