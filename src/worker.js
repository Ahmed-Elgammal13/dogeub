name = "dogeub"
main = "src/worker.js"
compatibility_date = "2024-01-01"

[build]
command = "npm run build"

[site]
bucket = "./dist"

[[kv_namespaces]]
binding = "__STATIC_CONTENT"
id = "your-kv-namespace-id"  # You'll need to create this
