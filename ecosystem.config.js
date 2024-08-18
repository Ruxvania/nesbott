export default {
  apps: [{
    name: "Separatrix",
    script: "./index.js",
    watch: true,
    ignore_watch: ['node_modules', 'database.sqlite', 'database.sqlite-journal'],
    min_uptime: 15000,
    max_restarts: 5
  }]
}
