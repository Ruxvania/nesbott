module.exports = {
  apps: [{
    name: "Nesbott",
    script: "./index.js",
    watch: true,
    ignore_watch: ['node_modules', 'database.sqlite', 'database.sqlite-journal', '.git', 'ecosystem.config.cjs' ],
    min_uptime: 15000,
    max_restarts: 5
  }]
}
