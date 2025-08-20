#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
DORIKO Website Visual Consistency Analysis Script
Analyzes tone and style consistency across the website sections
"""

import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

def analyze_doriko_website():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        
        # Set viewport size for consistent screenshots
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            # Navigate to the DORIKO website
            print("📱 Navigating to DORIKO website...")
            page.goto("http://localhost:8000/doriko-premium-blue.html", wait_until="networkidle")
            
            # Wait for page to fully load
            time.sleep(3)
            
            # Take full page screenshot
            print("📸 Taking full page screenshot...")
            page.screenshot(path="doriko_fullpage.png", full_page=True)
            print("✅ Full page screenshot saved as 'doriko_fullpage.png'")
            
            # Take screenshot of hero section
            print("📸 Taking hero section screenshot...")
            hero_section = page.locator(".hero, .main-banner, header").first
            if hero_section.is_visible():
                hero_section.screenshot(path="doriko_hero.png")
                print("✅ Hero section screenshot saved")
            
            # Take screenshot of KPI/stats section
            print("📸 Taking KPI section screenshot...")
            kpi_section = page.locator(".stats, .kpi, .metrics, .numbers").first
            if kpi_section.count() > 0 and kpi_section.is_visible():
                kpi_section.screenshot(path="doriko_kpi.png")
                print("✅ KPI section screenshot saved")
            
            # Take screenshot of services section
            print("📸 Taking services section screenshot...")
            services_section = page.locator(".services, .service-cards, .offerings").first
            if services_section.count() > 0 and services_section.is_visible():
                services_section.screenshot(path="doriko_services.png")
                print("✅ Services section screenshot saved")
            
            # Check for language toggle and timeline section
            print("🔍 Looking for language toggle and timeline...")
            
            # Look for language toggle buttons
            lang_toggles = page.locator("button, a, .lang-toggle, [data-lang], .language").all()
            print(f"Found {len(lang_toggles)} potential language toggle elements")
            
            # Try to find Korean/English toggle specifically
            korean_toggle = page.locator("text=/한국어|KR|Korean/i").first
            english_toggle = page.locator("text=/English|EN|영어/i").first
            
            # Check for timeline section
            timeline_section = page.locator(".timeline, .history, .milestones, .about-history").first
            
            if timeline_section.count() > 0:
                print("📸 Taking timeline section screenshot (current language)...")
                timeline_section.screenshot(path="doriko_timeline_initial.png")
                
                # Try to switch language if toggle exists
                if korean_toggle.count() > 0:
                    print("🇰🇷 Switching to Korean...")
                    korean_toggle.click()
                    time.sleep(2)
                    timeline_section.screenshot(path="doriko_timeline_korean.png")
                    print("✅ Korean timeline screenshot saved")
                
                if english_toggle.count() > 0:
                    print("🇺🇸 Switching to English...")
                    english_toggle.click()
                    time.sleep(2)
                    timeline_section.screenshot(path="doriko_timeline_english.png")
                    print("✅ English timeline screenshot saved")
            
            # Take screenshots of different card/box elements for consistency analysis
            print("📸 Taking component screenshots for consistency analysis...")
            
            # Service cards
            service_cards = page.locator(".service-card, .card, .service-item").all()
            if len(service_cards) > 0:
                service_cards[0].screenshot(path="doriko_service_card_sample.png")
                print("✅ Service card sample screenshot saved")
            
            # Any info boxes or feature boxes
            info_boxes = page.locator(".info-box, .feature-box, .highlight-box").all()
            if len(info_boxes) > 0:
                info_boxes[0].screenshot(path="doriko_info_box_sample.png")
                print("✅ Info box sample screenshot saved")
            
            # Button samples
            buttons = page.locator("button, .btn, .button").all()
            if len(buttons) > 0:
                buttons[0].screenshot(path="doriko_button_sample.png")
                print("✅ Button sample screenshot saved")
            
            # Analyze page structure and elements
            print("\n🔍 ANALYZING PAGE STRUCTURE:")
            print("=" * 50)
            
            # Get page title
            title = page.title()
            print(f"📄 Page Title: {title}")
            
            # Count sections
            sections = page.locator("section, .section, .container").count()
            print(f"📑 Total sections found: {sections}")
            
            # Analyze color scheme
            print("\n🎨 COLOR SCHEME ANALYSIS:")
            print("=" * 30)
            
            # Get computed styles of key elements
            body_bg = page.evaluate("getComputedStyle(document.body).backgroundColor")
            print(f"🎨 Body background: {body_bg}")
            
            # Check for primary colors used in headers
            headers = page.locator("h1, h2, h3").all()
            if headers:
                header_color = page.evaluate("getComputedStyle(document.querySelector('h1, h2, h3')).color")
                print(f"📝 Header text color: {header_color}")
            
            # Typography analysis
            print("\n✏️ TYPOGRAPHY ANALYSIS:")
            print("=" * 25)
            
            font_family = page.evaluate("getComputedStyle(document.body).fontFamily")
            print(f"🔤 Primary font family: {font_family}")
            
            # Check for consistency in heading styles
            h1_elements = page.locator("h1").count()
            h2_elements = page.locator("h2").count()
            h3_elements = page.locator("h3").count()
            
            print(f"📏 Heading hierarchy - H1: {h1_elements}, H2: {h2_elements}, H3: {h3_elements}")
            
            # Button analysis
            print("\n🔘 BUTTON ANALYSIS:")
            print("=" * 20)
            
            button_count = page.locator("button, .btn, .button").count()
            print(f"🔘 Total buttons found: {button_count}")
            
            # Card/Box analysis
            print("\n📦 CARD/BOX ANALYSIS:")
            print("=" * 22)
            
            card_count = page.locator(".card, .box, .service-card, .feature-card").count()
            print(f"📦 Total cards/boxes found: {card_count}")
            
            print("\n✅ Analysis complete! Check the generated screenshots for visual consistency.")
            
        except Exception as e:
            print(f"❌ Error during analysis: {e}")
        
        finally:
            browser.close()

if __name__ == "__main__":
    analyze_doriko_website()