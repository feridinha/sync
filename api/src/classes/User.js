class User {
    constructor(tags) {
        this.name =
            tags["display-name"].toLowerCase() !== tags.username
                ? tags.username
                : tags["display-name"] // Pega username quando o display-name for japonês
        
        this.id = tags["user-id"]
        this.color = tags.color
        if (tags.badges?.vip === "1") this.vip = true
        if (tags.mod && !this.broadcaster) this.mod = true
        if (tags["user-id"] == tags["room-id"]) this.broadcaster = true
        if (["156584193", "94753308", "420011943"].includes(this.id))
            this.dev = true
        if (this.id === "270082103") this.admin = true
    }
}
module.exports = User
/* 
{
  'badge-info': null,
  badges: { broadcaster: '1', 'glhf-pledge': '1' },
  color: '#B2EDED',
  'display-name': 'Feridinha',
  emotes: null,
  'first-msg': false,
  flags: null,
  id: '55a501ee-61eb-46f5-bd9d-14e19cbc655e',
  mod: false,
  'room-id': '270082103',
  subscriber: false,
  'tmi-sent-ts': '1643675626706',
  turbo: false,
  'user-id': '270082103',
  'user-type': null,
  'emotes-raw': null,
  'badge-info-raw': null,
  'badges-raw': 'broadcaster/1,glhf-pledge/1',
  username: 'feridinha',
  'message-type': 'chat'
}
*/
