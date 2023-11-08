const WASM_PATH = "../gif_player_wasm_bg.wasm"
import * as wasm from './gif_player_wasm.js';


const PREVIOUS_FRAME_ICON = '<svg t="1699346068182" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2771" width="200" height="200"><path d="M545.86 493.81l348.58-201.25a21 21 0 0 1 31.5 18.19v402.5a21 21 0 0 1-31.5 18.19L545.86 530.19a21 21 0 0 1 0-36.38zM108.56 493.81l348.58-201.25a21 21 0 0 1 31.5 18.19v402.5a21 21 0 0 1-31.5 18.19L108.56 530.19a21 21 0 0 1 0-36.38z" p-id="2772"></path></svg>';
const NEXT_FRAME_ICON = '<svg t="1699346170476" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2914" width="200" height="200"><path d="M478.14 493.81L129.56 292.56a21 21 0 0 0-31.5 18.19v402.5a21 21 0 0 0 31.5 18.19l348.58-201.25a21 21 0 0 0 0-36.38zM915.44 493.81L566.86 292.56a21 21 0 0 0-31.5 18.19v402.5a21 21 0 0 0 31.5 18.19l348.58-201.25a21 21 0 0 0 0-36.38z" p-id="2915"></path></svg>';
const PLAY_ICON = '<svg t="1699346207607" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3057" width="200" height="200"><path d="M825.48 493.81L219.52 144A21 21 0 0 0 188 162.15v699.7A21 21 0 0 0 219.52 880l606-349.85a21 21 0 0 0-0.04-36.34z" p-id="3058"></path></svg>';
const PAUSE_ICON = '<svg t="1699346216934" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3198" width="200" height="200"><path d="M273.57 187m21.37 0l67.26 0q21.37 0 21.37 21.37l0 607.26q0 21.37-21.37 21.37l-67.26 0q-21.37 0-21.37-21.37l0-607.26q0-21.37 21.37-21.37Z" p-id="3199"></path><path d="M640.43 187m21.37 0l67.26 0q21.37 0 21.37 21.37l0 607.26q0 21.37-21.37 21.37l-67.26 0q-21.37 0-21.37-21.37l0-607.26q0-21.37 21.37-21.37Z" p-id="3200"></path></svg>';
const DOWNLOAD_ICON = '<svg t="1699369134516" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3340" width="200" height="200"><path d="M930.67 931H93a29.68 29.68 0 0 1-29.67-29.7V649.77a29.69 29.69 0 0 1 59.37 0v221.85H901V649.77a29.68 29.68 0 0 1 59.36 0V901.3a29.68 29.68 0 0 1-29.69 29.7z" p-id="3341"></path><path d="M676.93 467.57H542.84V128a30 30 0 1 0-60 0v339.57H348.75a16 16 0 0 0-12.25 26.19l164.09 196.57a16 16 0 0 0 24.5 0l164.1-196.57a16 16 0 0 0-12.26-26.19z" fill="#231815" p-id="3342"></path></svg>';
const FULLSCREEN_ICON = '<svg t="1699369162184" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3484" width="200" height="200"><path d="M896.22 926.22H127.78a30 30 0 0 1-30-30V127.78a30 30 0 0 1 30-30h768.44a30 30 0 0 1 30 30v768.44a30 30 0 0 1-30 30z m-738.44-60h708.44V157.78H157.78z" p-id="3485"></path><path d="M253.28 383.73a16 16 0 0 0 16-16v-82.45a16 16 0 0 1 16-16h82.79a16 16 0 0 0 16-16v-32.56a16 16 0 0 0-16-16H253c-8.8 0-22.57 2.95-30.6 6.54l-11.14 11.14c-3.59 8-6.54 21.8-6.54 30.6v114.73a16 16 0 0 0 16 16zM269.28 655.78a16 16 0 0 0-16-16h-32.56a16 16 0 0 0-16 16V771c0 8.8 2.95 22.57 6.54 30.6l11.14 11.14c8 3.6 21.8 6.54 30.6 6.54h115.07a16 16 0 0 0 16-16v-32.56a16 16 0 0 0-16-16h-82.79a16 16 0 0 1-16-16zM770.72 639.78a16 16 0 0 0-16 16v82.94a16 16 0 0 1-16 16h-82.6a16 16 0 0 0-16 16v32.56a16 16 0 0 0 16 16H771c8.8 0 22.57-2.94 30.6-6.54l11.14-11.14c3.6-8 6.54-21.8 6.54-30.6V655.78a16 16 0 0 0-16-16zM754.72 367.73a16 16 0 0 0 16 16h32.56a16 16 0 0 0 16-16V253c0-8.8-2.94-22.57-6.54-30.6l-11.14-11.14c-8-3.59-21.8-6.54-30.6-6.54H656.12a16 16 0 0 0-16 16v32.56a16 16 0 0 0 16 16h82.6a16 16 0 0 1 16 16z" p-id="3486"></path></svg>';

export class GIFPlayer {
    #playerControllers = []
    #playerCount = 1

    stopOperation = null

    #enableDownload = false

    constructor() {
        return new Promise((resolve, reject) => {
            fetch(WASM_PATH)
                .then((response) => {
                    return response.arrayBuffer();
                })
                .then((wasmBuffer) => {
                    wasm.initSync(wasmBuffer);

                    // Init default css
                    let style = document.createElement('style');
                    style.textContent = ".gif-player-canvas .gif-player { display: none;} .gif-player-canvas:hover .gif-player { display: flex;} .gif-player .icon { width: 26px; height: 26px; } .gif-player-canvas.gif-player-keep-toolbar { display: initial; }";
                    document.head.appendChild(style);

                    resolve(this);
                })
                .catch(err => {
                    reject(err)
                });
        });
    }

    allowDownload(enable) {
        this.#enableDownload = enable;
    }

    async initWithElement(el) {
        console.log(el);

        let img_width = el.width;
        let img_height = el.height;
        // GET URL
        let img_src = el.src;

        await this.#initCanvas(img_src, img_width, img_height, el.parentElement);
        // If last step is success, remove img element
        el.remove();
    }

    async initWithUrl(url, width, height, parent) {
        await this.#initCanvas(url, width, height, parent);
    }

    async #initCanvas(url, width, height, parent) {
        let canvasId = "GIFPlayer-canvas-" + this.#playerCount;
        this.#playerCount += 1;

        let bytes;
        // Tampermonkey cors request
        if (typeof GM_xmlhttpRequest !== "undefined") {
            bytes = await this.#fetchArraybufferUseGMXmlhttpRequest(url);
        } else {
            bytes = await this.#fetchArraybuffer(url);
        }

        // Add abort controller
        let controller = new AbortController();
        let newPlayer = new PlayerController(
            bytes,
            canvasId,
            width,
            height,
            url,
            parent,
            controller,
            0
        );

        let div = document.createElement('div');
        div.style.width = "fit-content";
        div.style.height = "fit-content";
        div.style.position = "relative";
        div.classList.add("gif-player-canvas");
        div.classList.add("gif-player-keep-toolbar");

        let canvas = document.createElement('canvas');
        canvas.id = canvasId;
        canvas.width = width;
        canvas.height = height;
        canvas.player = newPlayer;
        canvas.classList.add("gif-player-keep-toolbar");

        let that = this;
        canvas.ontouchstart = function() {
            let toolbarElement = this.parentElement.getElementsByClassName("gif-player")[0];

            if(toolbarElement.style.display == "flex") {
                return;
            }

            toolbarElement.style.display = "flex";

            let callback = function(event) {
                if(typeof event.target.className == "object") {
                    return;
                }
                if(event.target.className.indexOf("gif-player-keep-toolbar") < 0) {
                    // remove el
                    toolbarElement.style.display = "none";

                    // remove event
                    document.removeEventListener("touchstart", callback);
                }
            };

            // Add touch event, working only on mobile
            document.addEventListener("touchstart", callback);
        }

        // Draw toolbar when mouse is enter
        div.appendChild(canvas);
        parent.appendChild(div);

        // draw toolbar
        this.#drawToolbar(canvas, newPlayer);

        let ctx = canvas.getContext("2d");
        wasm.load_gif(bytes, ctx, width, height, controller.signal, 0).then(lastIndex => {
            that.#updateFrameIndex(that, newPlayer, lastIndex);
        });

        // Add to global state
        this.#playerControllers.push(newPlayer);
        
    }

    async #fetchArraybuffer(url) {
        let response = await fetch(url, {
            cache: "force-cache",
            mode: "cors"
        });
        let buffer = await response.arrayBuffer();
        let bytes = new Uint8Array(buffer);
        return bytes;
    }
    #fetchArraybufferUseGMXmlhttpRequest(url) {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: "get",
                url: url,
                onload: function (res) {
                    if (res.status === 200) {
                        resolve(res.response.arrayBuffer())
                    } else {
                        reject(res)
                    }
                },
                onerror: function (err) {
                    reject(err)
                }
            });
        })
    }
    #drawToolbar(canvas, player) {
        let that = this;

        let div = document.createElement("div");
        div.id = player.toolbarId;
        div.style.width = "100%";
        // div.style.display = "none";
        div.style.position = "absolute";
        div.style.bottom = 0;
        div.style.left = 0;
        div.style.background = "rgba(70, 70, 70, 0.5)";
        div.style.padding = "4px";
        div.style.boxSizing = "border-box";
        div.classList.add("gif-player");

        // Add button div
        let controller_div = document.createElement("div");
        controller_div.style.display = "flex";
        controller_div.style.justifyContent = "center";
        controller_div.style.flex = "1";
        controller_div.classList.add("gif-player-keep-toolbar");

        let pauseAndPlayButton = document.createElement("div");
        pauseAndPlayButton.innerHTML = PAUSE_ICON;
        pauseAndPlayButton.style.marginLeft = "10px";
        pauseAndPlayButton.style.cursor = "pointer";
        pauseAndPlayButton.classList.add("gif-player-keep-toolbar");
        pauseAndPlayButton.onclick = function () {
            if (player.abortController.signal.aborted) {
                if (player.stopStatus) {
                    // change icon
                    this.innerHTML = PAUSE_ICON;

                    let controller = new AbortController();
                    player.abortController = controller;
                    let ctx = canvas.getContext("2d");
                    wasm.load_gif(player.imageBytes, ctx, player.canvasWidth, player.canvasHeight, controller.signal, player.frameIndex).then(lastIndex => {
                        that.#updateFrameIndex(that, player, lastIndex);
                    });

                    player.stopStatus = false;
                }
            } else {
                if (!player.stopStatus) {
                    // change icon
                    this.innerHTML = PLAY_ICON;
                    player.abortController.abort();
                }
            }
        };

        let previousFrameButton = document.createElement("div");
        previousFrameButton.innerHTML = PREVIOUS_FRAME_ICON;
        previousFrameButton.style.cursor = "pointer";
        previousFrameButton.classList.add("gif-player-keep-toolbar");
        previousFrameButton.onclick = function () {
            that.stopOperation = false;
            if (player.abortController.signal.aborted) {
                that.#updateFrameIndex(that, player, player.frameIndex);
            } else {
                pauseAndPlayButton.innerHTML = PLAY_ICON;
                player.abortController.abort();
            }
        };

        let nextFrameButton = document.createElement("div");
        nextFrameButton.innerHTML = NEXT_FRAME_ICON;
        nextFrameButton.style.marginLeft = "10px";
        nextFrameButton.style.cursor = "pointer";
        nextFrameButton.classList.add("gif-player-keep-toolbar");
        nextFrameButton.onclick = function () {
            that.stopOperation = true;
            if (player.abortController.signal.aborted) {
                that.#updateFrameIndex(that, player, player.frameIndex);
            } else {
                pauseAndPlayButton.innerHTML = PLAY_ICON;
                player.abortController.abort();
            }
        };

        controller_div.appendChild(previousFrameButton);
        controller_div.appendChild(pauseAndPlayButton);
        controller_div.appendChild(nextFrameButton);

        if (this.#enableDownload) {
            let downloadButton = document.createElement("div");
            downloadButton.innerHTML = DOWNLOAD_ICON;
            downloadButton.style.marginLeft = "10px";
            downloadButton.style.cursor = "pointer";
            downloadButton.classList.add("gif-player-keep-toolbar");
            downloadButton.onclick = function () {
                // if is playing, download gif file, else download current frame
                if (player.abortController.signal.aborted) {
                    let url = canvas.toDataURL("image/gif");
                    window.open(url);
                } else {
                    var blob = new Blob([player.imageBytes], {type: "image/gif"});
                    var objectUrl = URL.createObjectURL(blob);
                    window.open(objectUrl);
                }
            };

            controller_div.appendChild(downloadButton);
        }
        

        div.appendChild(controller_div);
        canvas.parentElement.appendChild(div);
    }

    #hideToolbar(event) {
        console.log("Mouse leave", event);
    }
    #getPlayerbyId(id) {
        return this.#playerControllers.filter(obj => {
            obj.canvasId == id
        })
    }
    #updateFrameIndex(self, player, index) {
        player.stopStatus = true;
        player.frameIndex = index;

        // check is need to show next frame or pre frame
        if (self.stopOperation != null) {
            let canvas = document.getElementById(player.canvasId);
            let ctx = canvas.getContext("2d");
            if (self.stopOperation) {
                // if true, show next frame
                wasm.specify_frame(player.imageBytes, ctx, player.canvasWidth, player.canvasHeight, self.stopOperation, player.frameIndex).then(newIndex => {
                    player.frameIndex = newIndex;
                });
            } else {
                // if false, show pre frame
                wasm.specify_frame(player.imageBytes, ctx, player.canvasWidth, player.canvasHeight, self.stopOperation, player.frameIndex).then(newIndex => {
                    player.frameIndex = newIndex;
                });
            }

            self.stopOperation = null;
        }
    }
}


export class PlayerController {
    imageBytes
    canvasId
    canvasWidth
    canvasHeight
    imageUrl
    parentElement
    abortController
    frameIndex
    toolbarId
    stopStatus = false

    constructor(imageBytes, canvasId, canvasWidth, canvasHeight, imageUrl, parentElement, abortController, frameIndex) {
        this.imageBytes = imageBytes;
        this.canvasId = canvasId;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.imageUrl = imageUrl;
        this.parentElement = parentElement;
        this.abortController = abortController;
        this.frameIndex = frameIndex;

        this.toolbarId = canvasId + "-toolbar";
    }


}