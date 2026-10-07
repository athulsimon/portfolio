import urllib.request
import re
import os

url = "https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

req = urllib.request.Request(url, headers=headers)
with urllib.request.urlopen(req) as resp:
    css = resp.read().decode("utf-8")

os.makedirs("src/fonts", exist_ok=True)

# Parse blocks
blocks = css.split("@font-face")

downloaded = {}

for b in blocks:
    if not b.strip():
        continue
    fam_match = re.search(r"font-family:\s*['\"]([^'\"]+)['\"]", b)
    style_match = re.search(r"font-style:\s*([^;]+);", b)
    url_match = re.search(r"src:\s*url\((https://[^)]+\.woff2)\)", b)
    # Check if latin subset
    is_latin = "/* latin */" in b or "unicode-range" in b

    if fam_match and url_match:
        fam = fam_match.group(1).replace("'", "").strip()
        style = style_match.group(1).strip() if style_match else "normal"
        font_url = url_match.group(1)

        key = None
        if fam == "Inter Tight" and style == "normal" and "inter-tight" not in downloaded:
            key = "inter-tight.woff2"
        elif fam == "Instrument Serif" and style == "normal" and "instrument-serif" not in downloaded:
            key = "instrument-serif-regular.woff2"
        elif fam == "Instrument Serif" and style == "italic" and "instrument-serif-italic" not in downloaded:
            key = "instrument-serif-italic.woff2"
        elif fam == "JetBrains Mono" and style == "normal" and "jetbrains-mono" not in downloaded:
            key = "jetbrains-mono.woff2"

        if key:
            dest = os.path.join("src/fonts", key)
            print(f"Downloading {key} from {font_url}...")
            font_req = urllib.request.Request(font_url, headers=headers)
            with urllib.request.urlopen(font_req) as f_resp:
                with open(dest, "wb") as f_out:
                    f_out.write(f_resp.read())
            downloaded[key.split(".")[0]] = dest
            print(f"Saved {dest}")

print("Font download complete! Downloaded:", list(downloaded.keys()))
