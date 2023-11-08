# GIF Player WASM

## Release Build

```bash
# build lib
cargo build --lib --release --target wasm32-unknown-unknown
# convert
wasm-bindgen --target web --no-typescript --out-dir ./examples target/wasm32-unknown-unknown/release/gif_player_wasm.wasm
```
