# GIF Player WASM

Allow you play GIF using Rust and WebAssembly.

## Demo

[Simple Usage](https://rstursoc.github.io/gif_player_wasm/examples/simple/)
[Advance Player](https://rstursoc.github.io/gif_player_wasm/examples/controls/)
[Performance Test](https://rstursoc.github.io/gif_player_wasm/examples/controls/performance_test.html)

## About The Player

The cargo command will build only the WASM files. If you want to use add controls to the gif. See the [Advance Player](https://rstursoc.github.io/gif_player_wasm/examples/controls/) example. The **gif_player.js** implement the controls.

Move the mouse over the GIF to display the controllers.

## Getting Started

### For NPM Project

```bash
wasm-pack build
```

Output to the **pkg** directory

### For Non-NPM Project

```bash
# build lib
cargo build --lib --release --target wasm32-unknown-unknown
# convert
wasm-bindgen --target web --no-typescript --out-dir ./examples target/wasm32-unknown-unknown/release/gif_player_wasm.wasm
```

Output to **gif_player_wasm_bg.wasm** and **gif_player_wasm.js** on the **examples** directory.

## Roadmap

- [x] Add GIF parsing
- [x] Add player controls
- [x] Add GIF and frame download
- [x] Compatible with mobile pages
- [ ] Optimize memory usage
- [ ] Add play speed control

See the [open issues](https://github.com/RstursOC/gif_player_wasm/issues) for a full list of proposed features (and known issues).
