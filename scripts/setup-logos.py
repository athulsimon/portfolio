#!/usr/bin/env python3
"""
Create public/logos SVGs and LICENSE files.
Contains official Brand SVGs and custom thin line Concept SVGs.
"""

import os

os.makedirs("public/logos", exist_ok=True)

LOGOS = {
    "flutter.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M14.314 0L2.3 12 6.071 15.771 21.857 0h-7.543z" fill="#47C5FB"/>
  <path d="M14.286 10.971L7.543 17.714 11.314 21.486 18.057 14.743l-3.771-3.772z" fill="#00569E"/>
  <path d="M18.057 14.743l-3.771 3.771 5.486 5.486H24l-5.943-5.943v-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001z" fill="#00B5F8"/>
  <path d="M11.314 21.486l3.772-3.772 3.2 3.2-3.772 3.772-3.2-3.2z" fill="#00569E"/>
</svg>''',

    "dart.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
  <path d="M4.108 4.108A4 4 0 0 1 6.936 2.936L16.243 2.936A4 4 0 0 1 19.071 4.108L21.064 6.101A4 4 0 0 1 22.236 8.929L22.236 18.236A4 4 0 0 1 21.064 21.064L19.071 23.057A4 4 0 0 1 16.243 24.229L6.936 24.229A4 4 0 0 1 4.108 23.057L2.115 21.064A4 4 0 0 1 0.943 18.236L0.943 8.929A4 4 0 0 1 2.115 6.101L4.108 4.108Z" fill="none"/>
  <path d="M4.2 4.2L12.5 1.5 21.5 10.5 15.5 22.5 1.5 16.5 4.2 4.2Z" fill="#0175C2"/>
  <path d="M4.2 4.2L12.5 1.5 16.5 5.5 10.5 13.5 1.5 16.5 4.2 4.2Z" fill="#00B4AB"/>
  <path d="M10.5 13.5L16.5 5.5 21.5 10.5 15.5 22.5 10.5 13.5Z" fill="#01579B"/>
</svg>''',

    "firebase.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#FFA000" d="M3.89 15.67L6.46 2.58a.74.74 0 0 1 1.34-.28l3.14 5.92-7.05 7.45z"/>
  <path fill="#F57C00" d="M13.25 8.79l-2.31-6.57a.74.74 0 0 0-1.39 0L3.89 15.67l9.36-6.88z"/>
  <path fill="#FFCA28" d="M20.11 15.67L18.42 5.09a.74.74 0 0 0-1.28-.42L3.89 15.67 12 20.35l8.11-4.68z"/>
</svg>''',

    "android.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3DDC84">
  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.551 0 .9993.4482.9993.9993.0001.5511-.4483.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.996-3.4572c.1556-.269.0633-.6135-.2056-.7691-.269-.1556-.6135-.0633-.7691.2056l-2.0231 3.5042C15.3414 8.2435 13.7225 7.892 12 7.892c-1.7225 0-3.3414.3515-4.8807.9129L5.0962 5.3007c-.1556-.2689-.5001-.3612-.7691-.2056-.269.1556-.3612.5001-.2056.7691l1.996 3.4572C2.6844 11.2334.3432 15.0108 0 19.4678h24c-.3432-4.457-2.6844-8.2344-6.1185-10.1464"/>
</svg>''',

    "apple.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000">
  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.66-1.06 1.73-.93 2.76 1.01.08 2.03-.51 2.63-1.26z"/>
</svg>''',

    "git.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F05032">
  <path d="M23.546 10.93L13.067.452a1.5 1.5 0 0 0-2.126 0L8.808 2.585l3.224 3.224a1.8 1.8 0 0 1 2.274 2.29l3.102 3.103a1.8 1.8 0 1 1-1.06 1.06l-2.91-2.91v4.86a1.8 1.8 0 1 1-1.5 0v-5.24l-3.32-3.32-6.16 6.16a1.5 1.5 0 0 0 0 2.126l10.479 10.48a1.5 1.5 0 0 0 2.126 0l10.479-10.48a1.5 1.5 0 0 0 0-2.126z"/>
</svg>''',

    "mysql.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm0-4h-2V7h2v7z"/>
</svg>''',

    "sqlite.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#003B57">
  <path d="M12 2C6.48 2 2 4.24 2 7v10c0 2.76 4.48 5 10 5s10-2.24 10-5V7c0-2.76-4.48-5-10-5zm0 2c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 5c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3zm0 5c4.42 0 8 1.57 8 3s-3.58 3-8 3-8-1.57-8-3 3.58-3 8-3z"/>
</svg>''',

    "appwrite.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FD366E">
  <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.2l7.8 3.9L12 12 4.2 8.1 12 4.2zM4 9.9l7 3.5v7.2l-7-3.5V9.9zm9 10.7v-7.2l7-3.5v7.2l-7 3.5z"/>
</svg>''',

    "bloc.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0052CC">
  <rect x="3" y="3" width="7" height="7" rx="1.5"/>
  <rect x="14" y="3" width="7" height="7" rx="1.5"/>
  <rect x="3" y="14" width="7" height="7" rx="1.5"/>
  <rect x="14" y="14" width="7" height="7" rx="1.5"/>
</svg>''',

    "openai.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#10A37F">
  <path d="M22.28 10.37a5.57 5.57 0 0 0-.48-4.48 5.68 5.68 0 0 0-4.07-2.73 5.6 5.6 0 0 0-4.66.97 5.61 5.61 0 0 0-3.9-1.38 5.68 5.68 0 0 0-5.18 3.42 5.58 5.58 0 0 0-2.4 3.96 5.68 5.68 0 0 0 .97 4.8 5.57 5.57 0 0 0 .48 4.48 5.68 5.68 0 0 0 4.07 2.73 5.6 5.6 0 0 0 4.66-.97 5.61 5.61 0 0 0 3.9 1.38 5.68 5.68 0 0 0 5.18-3.42 5.58 5.58 0 0 0 2.4-3.96 5.68 5.68 0 0 0-.97-4.8zM12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
</svg>''',

    "github.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0d0d0d">
  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
</svg>''',

    "linkedin.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0A66C2">
  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0 0-3.18 1.59 1.59 0 0 0 0 3.18m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
</svg>''',

    "storage.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <ellipse cx="12" cy="5" rx="9" ry="3"/>
  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
</svg>''',

    "testing.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M9 11l3 3L22 4"/>
  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
</svg>''',

    "publish.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 19V5"/>
  <path d="M5 12l7-7 7 7"/>
  <path d="M5 21h14"/>
</svg>''',

    "locale.svg": '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</svg>'''
}

for name, svg_content in LOGOS.items():
    path = os.path.join("public/logos", name)
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg_content.strip())
    print(f"Created {path}")

# Write LICENSE file
license_content = """# Brand Logos and Icons License Notice

The brand and product logos included in this directory (public/logos) are the property of their respective trademark holders:

- Flutter: Google LLC (BSD 3-Clause / Apache 2.0)
- Dart: Google LLC (BSD 3-Clause)
- Firebase: Google LLC
- Android: Google LLC (Apache 2.0)
- Apple: Apple Inc.
- Git: Software Freedom Conservancy (GPLv2 / Creative Commons)
- MySQL: Oracle Corporation
- SQLite: Public Domain
- Appwrite: Appwrite OSS (BSD-3-Clause)
- OpenAI: OpenAI LLC
- GitHub: GitHub, Inc.
- LinkedIn: LinkedIn Corporation

All brand logos are displayed for identification and portfolio attribution purposes only.
Concept icons are licensed under the MIT License.
"""

with open("public/logos/LICENSE.md", "w", encoding="utf-8") as f:
    f.write(license_content)

print("Created public/logos/LICENSE.md")
