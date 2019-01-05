# The Letter Desk
Send letters to friends, family, or penpals without having to make an account. Try for yourself at [letterdesk.ethanjholland.com](letterdesk.ethanjholland.com)

## Dev Notes
### Server
To start the server use ```pm2 start processes.json --watch```. The watch flag forces the server to restart when code is changed.
Ports currently in use:
- 3000 - API
- 27017 - MongoDB
