# The Letter Desk
Send letters to friends, family, or penpals without having to make an account. Try for yourself at www.theletterdesk.com

## Dev Notes
### Angular
Pushing to branch ```mvp``` automatically deploys

### Server
To start the server use ```pm2 start processes.json --watch```. The watch flag forces the server to restart when code is changed.
Ports currently in use:
- 3000 - API
- 27017 - MongoDB

### //TODO:
- Navigate away from about page
- Prevent short letters
- Better icon?