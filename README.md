# BlogIn — Angular Client

Frontend application for the BlogIn project (Angular).

## Prerequisites

- Node.js and npm
- Angular CLI (optional, for global `ng` commands)

## Setup

```bash
cd BlogIn-client
npm install
```

## Configure

The client expects the backend API base URL to be set in `src/environments/environment.ts` under `apiBaseUrl`. By default it is set to `http://localhost:4444` — ensure this matches your backend server port (the API uses `4400` by default).

## Run (development)

```bash
npm start
# opens at http://localhost:3000
```

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## Notes

- Socket.IO is used for real-time notifications; `socket.io-client` is included in dependencies.
- If you change the backend port, update `apiBaseUrl` in `src/environments/environment.ts`.
 - Production builds use `src/environments/environment.prod.ts`; by default this is set to https://blog-in-api.vercel.app.
	 Update that file if you need to point to a different production API.
 - WebSockets on Vercel: Vercel's serverless functions do not support long-lived WebSocket connections.
	 If you need real-time Socket.IO connections in production, deploy the API to a platform that supports WebSockets (Render, Railway, Fly, DigitalOcean App Platform, a VPS, etc.), or run a separate Socket.IO server and point the client to it.

## License

MIT
