use image::{
    codecs::gif::GifDecoder,
    AnimationDecoder, imageops::resize
};
use js_sys::Promise;
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{window, AbortSignal, CanvasRenderingContext2d, ImageData, HtmlCanvasElement};

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen]
pub async fn load_gif(
    buf: &[u8],
    ctx: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
    signal: &AbortSignal,
    start_index: usize,
) -> Result<usize, JsValue> {
    let window = match window() {
        Some(window) => window,
        None => {
            return Err("No Window Found".into());
        }
    };

    let gif_deocder = match GifDecoder::new(buf) {
        Ok(gif_deocder) => gif_deocder,
        Err(err) => {
            return Err(err.to_string().into());
        }
    };
    let frames = match gif_deocder.into_frames().collect_frames() {
        Ok(frames) => frames,
        Err(err) => {
            return Err(err.to_string().into());
        }
    };

    let count = frames.len();

    let mut index = 0;

    let mut has_started = false;

    loop {
        if signal.aborted() {
            drop(frames);
            break;
        }

        if index >= count {
            index = 0;
        }

        if !has_started {
            if index != start_index {
                index += 1;
                continue;
            } else {
                has_started = true;
            }
        }

        let frame = frames.get(index);

        if let Some(frame) = frame {
            let buf = frame.buffer();

            let buf = resize(buf, width, height, image::imageops::FilterType::Nearest);

            let buf = buf.as_raw();

            let img = ImageData::new_with_u8_clamped_array_and_sh(
                wasm_bindgen::Clamped(buf),
                width,
                height,
            )?;
            ctx.put_image_data(&img, 0.0, 0.0)?;

            JsFuture::from(Promise::new(&mut |r, _e| {
                let delay = frame.delay().numer_denom_ms();

                let _ = window.set_timeout_with_callback_and_timeout_and_arguments_0(
                    &r,
                    (delay.0 / delay.1) as i32,
                );
            }))
            .await?;

            index += 1;
        } else {
            break;
        }
    }

    Ok(index)
}

#[wasm_bindgen]
pub async fn specify_frame(
    buf: &[u8],
    ctx: &CanvasRenderingContext2d,
    width: u32,
    height: u32,
    next_frame: bool,
    start_index: usize,
)  -> Result<usize, JsValue> {
    let gif_deocder = match GifDecoder::new(buf) {
        Ok(gif_deocder) => gif_deocder,
        Err(err) => {
            return Err(err.to_string().into());
        }
    };
    let frames = match gif_deocder.into_frames().collect_frames() {
        Ok(frames) => frames,
        Err(err) => {
            return Err(err.to_string().into());
        }
    };

    let count = frames.len();

    let frame_index = if next_frame {
        let temp_index = start_index + 1;
        if temp_index >= count {
            0
        } else {
            temp_index
        }
    } else {
        let temp_index = (start_index - 1) as i32;
        if temp_index < 0 {
            count - 1
        } else {
            temp_index as usize
        }
    };

    let frame = frames.get(frame_index);
    if let Some(frame) = frame {
        let buf = frame.buffer();
        let buf = resize(buf, width, height, image::imageops::FilterType::Nearest);
        let buf = buf.as_raw();
        let img =
            ImageData::new_with_u8_clamped_array_and_sh(wasm_bindgen::Clamped(buf), width, height)?;
        ctx.put_image_data(&img, 0.0, 0.0)?;
    }

    drop(frames);

    Ok(frame_index)
}