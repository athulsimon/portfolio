#!/usr/bin/env python3
import os
import sys
from playwright.sync_api import sync_playwright

os.makedirs('screenshots', exist_ok=True)
chrome_path = r"C:\Program Files\Google\Chrome\Application\chrome.exe"
if not os.path.exists(chrome_path):
    chrome_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

print(f"Using browser binary: {chrome_path}")

def run_tests():
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=chrome_path, headless=True)

        console_errors = []

        # 1. Desktop Test (1440x900)
        context_desktop = browser.new_context(viewport={'width': 1440, 'height': 900})
        page_desktop = context_desktop.new_page()
        page_desktop.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)

        print("Testing Desktop 1440x900...")
        page_desktop.goto("http://localhost:3000", wait_until="networkidle")
        page_desktop.wait_for_timeout(1000)

        # Check desktop scrollWidth === innerWidth
        desktop_overflow = page_desktop.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                noOverflow: document.documentElement.scrollWidth === window.innerWidth
            };
        }""")
        print(f"Desktop Overflow Check: {desktop_overflow}")
        assert desktop_overflow['noOverflow'], f"Horizontal overflow detected on desktop: {desktop_overflow}"

        # Capture desktop screenshot
        page_desktop.screenshot(path="screenshots/desktop_hero.png")
        print("Captured screenshots/desktop_hero.png")

        # Scroll down through page to trigger reveals
        page_desktop.evaluate("window.scrollTo(0, 1200)")
        page_desktop.wait_for_timeout(600)
        page_desktop.screenshot(path="screenshots/desktop_about.png")

        page_desktop.evaluate("window.scrollTo(0, 2400)")
        page_desktop.wait_for_timeout(600)
        page_desktop.screenshot(path="screenshots/desktop_skills.png")

        page_desktop.evaluate("window.scrollTo(0, 3600)")
        page_desktop.wait_for_timeout(600)
        page_desktop.screenshot(path="screenshots/desktop_work.png")

        page_desktop.evaluate("window.scrollTo(0, 5200)")
        page_desktop.wait_for_timeout(600)
        page_desktop.screenshot(path="screenshots/desktop_achievements.png")

        # 2. Mobile Test (390x844)
        print("Testing Mobile 390x844...")
        context_mobile = browser.new_context(
            viewport={'width': 390, 'height': 844},
            user_agent="Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1"
        )
        page_mobile = context_mobile.new_page()
        page_mobile.goto("http://localhost:3000", wait_until="networkidle")
        page_mobile.wait_for_timeout(1000)

        # Check mobile scrollWidth === innerWidth
        mobile_overflow = page_mobile.evaluate("""() => {
            return {
                scrollWidth: document.documentElement.scrollWidth,
                innerWidth: window.innerWidth,
                noOverflow: document.documentElement.scrollWidth === window.innerWidth
            };
        }""")
        print(f"Mobile Overflow Check: {mobile_overflow}")
        assert mobile_overflow['noOverflow'], f"Horizontal overflow detected on mobile: {mobile_overflow}"

        # Capture mobile screenshots
        page_mobile.screenshot(path="screenshots/mobile_hero.png")
        print("Captured screenshots/mobile_hero.png")

        page_mobile.evaluate("window.scrollTo(0, 1600)")
        page_mobile.wait_for_timeout(500)
        page_mobile.screenshot(path="screenshots/mobile_skills.png")

        # Check console errors
        print(f"Console errors recorded: {len(console_errors)}")
        for err in console_errors:
            print("  [Console Error]", err)

        browser.close()
        print("All quality checks passed successfully!")

if __name__ == "__main__":
    run_tests()
