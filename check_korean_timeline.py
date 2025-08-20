#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Check Korean timeline specifically for the "20 Years of Excellence" translation issue
"""

import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time

def check_korean_timeline():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            # Navigate to the site
            print("Navigating to DORIKO website...")
            page.goto("http://localhost:8000/doriko-premium-blue.html", wait_until="networkidle")
            time.sleep(3)
            
            # Look for Korean language button/toggle
            korean_elements = [
                "text=/한국어|KR|Korean/i",
                "text=/KR/",
                "[data-lang='ko']",
                "[data-lang='kr']",
                ".lang-ko",
                ".lang-kr"
            ]
            
            # Try different selectors to find Korean toggle
            korean_toggle = None
            for selector in korean_elements:
                element = page.locator(selector).first
                if element.count() > 0:
                    print(f"Found Korean toggle with selector: {selector}")
                    korean_toggle = element
                    break
            
            # If no specific Korean toggle, try to find any language toggle
            if not korean_toggle:
                # Look for any button that might switch language
                all_buttons = page.locator("button, a").all()
                for btn in all_buttons:
                    text = btn.inner_text().strip()
                    if any(lang in text.upper() for lang in ['KR', '한국어', 'KOREAN']):
                        korean_toggle = btn
                        print(f"Found Korean toggle with text: {text}")
                        break
            
            # Take screenshot of current state (likely English)
            print("Taking screenshot of current timeline...")
            timeline = page.locator(".timeline, .history, .about").first
            if timeline.count() > 0:
                timeline.screenshot(path="timeline_current.png")
                
                # Get text content to check current language
                timeline_text = timeline.inner_text()
                print("Current timeline text preview:")
                print(timeline_text[:200] + "..." if len(timeline_text) > 200 else timeline_text)
            
            # Switch to Korean if toggle found
            if korean_toggle:
                print("Switching to Korean...")
                korean_toggle.click()
                time.sleep(3)
                
                # Take Korean timeline screenshot
                if timeline.count() > 0:
                    timeline.screenshot(path="timeline_korean.png")
                    
                    # Get Korean text content
                    korean_timeline_text = timeline.inner_text()
                    print("\nKorean timeline text preview:")
                    print(korean_timeline_text[:200] + "..." if len(korean_timeline_text) > 200 else korean_timeline_text)
                    
                    # Look specifically for "20 Years" vs Korean equivalent
                    if "20" in korean_timeline_text and "Years" in korean_timeline_text:
                        print("\n⚠️ FOUND ISSUE: Korean version still contains English '20 Years'")
                    elif "20년" in korean_timeline_text or "20 년" in korean_timeline_text:
                        print("\n✅ Korean version properly translated: contains '20년'")
                    else:
                        print("\n❓ Could not find '20 Years' reference in Korean version")
            else:
                print("Could not find Korean language toggle")
            
            # Switch back to English to compare
            english_elements = [
                "text=/English|EN|영어/i",
                "text=/EN/",
                "[data-lang='en']",
                ".lang-en"
            ]
            
            english_toggle = None
            for selector in english_elements:
                element = page.locator(selector).first
                if element.count() > 0:
                    print(f"Found English toggle with selector: {selector}")
                    english_toggle = element
                    break
            
            if english_toggle:
                print("Switching back to English...")
                english_toggle.click()
                time.sleep(3)
                
                if timeline.count() > 0:
                    timeline.screenshot(path="timeline_english_final.png")
                    
                    english_timeline_text = timeline.inner_text()
                    print("\nEnglish timeline text preview:")
                    print(english_timeline_text[:200] + "..." if len(english_timeline_text) > 200 else english_timeline_text)
                    
                    if "20 Years of Excellence" in english_timeline_text:
                        print("\n✅ English version contains '20 Years of Excellence'")
                    elif "20" in english_timeline_text and ("Years" in english_timeline_text or "years" in english_timeline_text):
                        print("\n✅ English version contains '20 Years' reference")
                    else:
                        print("\n❓ Could not find '20 Years' reference in English version")
            
        except Exception as e:
            print(f"Error during analysis: {e}")
        
        finally:
            browser.close()

if __name__ == "__main__":
    check_korean_timeline()