## 🏁 Comece

```shell
$ npm install
$ npm start
```
## 📡 Eventos websocket

- **enter-room** (room) => Verifica a existência de uma sala, retorna "ready" caso exista, "invalid-room" se não existir
- **get-info** (room) => Retorna o vídeo atual tocando em uma sala
- **get-queue** (room) => Retorna uma array com todos os vídeos na queue de uma sala
- **get-avatars** (room) => Retorna uma array com todos os avatares de uma sala

## 📂 Pastas

```
── src
    ├───classes = Classes do projeto
    ├───commands = Funções para todos os comandos da twitch
    ├───handlers = Handlers
    ├───models = Models do mongoose
    ├───routes = Express.js routes
    └───services = Serviços externos (apis)
```

#