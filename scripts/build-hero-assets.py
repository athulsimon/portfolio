#!/usr/bin/env python3
"""
Hero video processing and asset generation pipeline.
- Crops person head to toe, perfectly centered
- Whitens background so it blends seamlessly into --paper
- Generates seamless video & audio loop with numpy sample-accurate audio cross-fade
- Exports hero.mp4 and hero.webm
- Generates portrait-bust.webp and og.jpg
"""

import os
import sys
import glob
import shutil
import subprocess
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def get_ffmpeg():
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    matches = glob.glob(r"C:\Users\ATHUL\AppData\Local\Microsoft\WinGet\Packages\yt-dlp.FFmpeg*\**\ffmpeg.exe", recursive=True)
    if matches:
        return matches[0]
    return "ffmpeg"

def get_ffprobe():
    if shutil.which("ffprobe"):
        return "ffprobe"
    matches = glob.glob(r"C:\Users\ATHUL\AppData\Local\Microsoft\WinGet\Packages\yt-dlp.FFmpeg*\**\ffprobe.exe", recursive=True)
    if matches:
        return matches[0]
    return "ffprobe"

def run_cmd(cmd):
    print("Running:", " ".join(cmd))
    res = subprocess.run(cmd, capture_output=True, text=True)
    if res.returncode != 0:
        print("STDERR:", res.stderr)
        raise RuntimeError(f"Command failed with exit code {res.returncode}")
    return res

def main():
    ffmpeg = get_ffmpeg()
    ffprobe = get_ffprobe()
    print(f"Using FFmpeg: {ffmpeg}")
    print(f"Using FFprobe: {ffprobe}")

    source_video = "intro.mp4"
    if not os.path.exists(source_video):
        raise FileNotFoundError(f"Source video {source_video} not found!")

    os.makedirs("public/hero", exist_ok=True)
    os.makedirs("public", exist_ok=True)
    os.makedirs("scratch", exist_ok=True)

    # 1. Inspect source
    # Source is 1280x720, 24 fps, duration 8.0s
    # Crop to 4:5 aspect ratio (576 x 720 centered at x=605: x=317, y=0)
    # Scale to 768 x 960
    # Whiten background with colorlevels
    crop_w = 576
    crop_h = 720
    crop_x = 317
    crop_y = 0
    scale_w = 768
    scale_h = 960

    # Whiten filter: rimax=0.95:gimax=0.95:bimax=0.95 guarantees pure white backdrop
    video_filter = (
        f"crop={crop_w}:{crop_h}:{crop_x}:{crop_y},"
        f"scale={scale_w}:{scale_h}:flags=lanczos,"
        f"colorlevels=rimax=0.95:gimax=0.95:bimax=0.95"
    )

    # 2. Extract sample-accurate audio with numpy
    sample_rate = 48000
    raw_audio_path = "scratch/temp_audio.raw"
    print("Extracting audio as raw float32 PCM...")
    run_cmd([
        ffmpeg, "-y", "-i", source_video,
        "-f", "f32le", "-ac", "2", "-ar", str(sample_rate),
        raw_audio_path
    ])

    audio_data = np.fromfile(raw_audio_path, dtype=np.float32).reshape(-1, 2)
    total_samples = len(audio_data)
    fade_duration = 0.5
    fade_samples = int(fade_duration * sample_rate)
    print(f"Audio total samples: {total_samples} ({total_samples / sample_rate:.3f}s)")

    # Seamless loop construction:
    # We cut from [0.5s to 8.0s] as main, and [0.0s to 0.5s] as head
    # End of main fades into head over 0.5s
    # Output length = 7.5s (360,000 samples)
    main_audio = audio_data[fade_samples:total_samples]
    head_audio = audio_data[0:fade_samples]

    main_body = main_audio[:len(main_audio) - fade_samples]
    tail_fade = main_audio[len(main_audio) - fade_samples:]

    # Equal power or linear cross-fade curve
    w = np.linspace(0.0, 1.0, fade_samples, dtype=np.float32).reshape(-1, 1)
    crossfaded = tail_fade * (1.0 - w) + head_audio * w
    final_audio = np.vstack([main_body, crossfaded])

    loop_audio_path = "scratch/loop_audio.raw"
    final_audio.tofile(loop_audio_path)
    print(f"Loop audio created: {len(final_audio)} samples ({len(final_audio) / sample_rate:.3f}s)")

    # 3. Create seamless video loop with ffmpeg xfade
    # [main]: 0.5s to 8.0s (duration 7.5s)
    # [head]: 0.0s to 0.5s (duration 0.5s)
    # xfade offset = 7.0s, duration = 0.5s -> total output = 7.5s
    temp_video_loop = "scratch/loop_video.mp4"
    filter_complex = (
        f"[0:v]{video_filter},split=2[vfull1][vfull2];"
        f"[vfull1]trim=start=0.5:end=8.0,setpts=PTS-STARTPTS[vmain];"
        f"[vfull2]trim=start=0.0:end=0.5,setpts=PTS-STARTPTS[vhead];"
        f"[vmain][vhead]xfade=transition=fade:duration=0.5:offset=7.0[outv]"
    )

    print("Encoding seamless video loop with xfade...")
    run_cmd([
        ffmpeg, "-y", "-i", source_video,
        "-filter_complex", filter_complex,
        "-map", "[outv]",
        "-c:v", "libx264", "-crf", "18", "-preset", "fast",
        "-pix_fmt", "yuv420p",
        temp_video_loop
    ])

    # 4. Mux video and numpy cross-faded audio into hero.mp4 and hero.webm
    output_mp4 = "public/hero/hero.mp4"
    output_webm = "public/hero/hero.webm"

    print("Exporting hero.mp4...")
    run_cmd([
        ffmpeg, "-y",
        "-i", temp_video_loop,
        "-f", "f32le", "-ar", str(sample_rate), "-ac", "2", "-i", loop_audio_path,
        "-c:v", "libx264", "-crf", "24", "-preset", "slow", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "96k",
        "-movflags", "+faststart",
        "-shortest",
        output_mp4
    ])

    print("Exporting hero.webm...")
    run_cmd([
        ffmpeg, "-y",
        "-i", temp_video_loop,
        "-f", "f32le", "-ar", str(sample_rate), "-ac", "2", "-i", loop_audio_path,
        "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
        "-c:a", "libopus", "-b:a", "80k",
        "-shortest",
        output_webm
    ])

    # 5. Extract portrait still: head-to-shirt crop at 480x600 saved as portrait-bust.webp
    print("Extracting portrait still...")
    frame_still_path = "scratch/still_frame.jpg"
    run_cmd([
        ffmpeg, "-y", "-ss", "00:00:01.200", "-i", source_video,
        "-frames:v", "1", frame_still_path
    ])

    still_img = Image.open(frame_still_path)
    # Head to shirt crop: [437, 25, 437+336, 25+420]
    bust_crop = still_img.crop((437, 25, 437 + 336, 25 + 420))
    bust_img = bust_crop.resize((480, 600), Image.Resampling.LANCZOS)
    bust_img.save("public/portrait-bust.webp", "WEBP", quality=95)
    print("Saved public/portrait-bust.webp (480x600)")

    # 6. Generate Open Graph image og.jpg at 1200x630
    print("Generating public/og.jpg (1200x630)...")
    og_img = Image.new("RGB", (1200, 630), color="#f4f2ee")
    draw = ImageDraw.Draw(og_img)

    # Paste bust image with subtle frame on the right
    bust_og = bust_img.resize((360, 450), Image.Resampling.LANCZOS)
    og_img.paste(bust_og, (760, 90))
    # Border around portrait
    draw.rectangle([759, 89, 760 + 360, 90 + 450], outline="#d0cdc7", width=1)

    # Add typographic text
    # In absence of custom ttf, draw clean shapes/text
    draw.text((80, 160), "ATHUL SIMON", fill="#0d0d0d")
    draw.text((80, 220), "Flutter Developer", fill="#3a3a3a")
    draw.text((80, 280), "Creative & driven Flutter Developer with 4+ years experience", fill="#77756f")
    draw.text((80, 320), "Architecture | Clean Code | Multi-platform Apps", fill="#77756f")
    draw.text((80, 480), "athulsimon.dev · Portfolio", fill="#0d0d0d")

    og_img.save("public/og.jpg", "JPEG", quality=92)
    print("Saved public/og.jpg")

    # 7. Copy resume to public/resume.pdf
    if os.path.exists("resume.pdf"):
        shutil.copyfile("resume.pdf", "public/resume.pdf")
        print("Copied resume.pdf to public/resume.pdf")

    # Clean up scratch temp files
    print("Hero asset generation complete!")

if __name__ == "__main__":
    main()
