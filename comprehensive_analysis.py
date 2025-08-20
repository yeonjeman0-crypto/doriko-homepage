#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Comprehensive DORIKO Website Analysis
Specifically looking for translation inconsistencies and visual style issues
"""

import sys
import os
sys.stdout.reconfigure(encoding='utf-8')

from playwright.sync_api import sync_playwright
import time
import json

def comprehensive_analysis():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()
        page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            print("🔍 COMPREHENSIVE DORIKO WEBSITE ANALYSIS")
            print("=" * 50)
            
            # Navigate to the site
            print("📱 Loading website...")
            page.goto("http://localhost:8000/doriko-premium-blue.html", wait_until="networkidle")
            time.sleep(3)
            
            # Get all text content first
            page_text = page.inner_text("body")
            
            print("\n🔍 SEARCHING FOR '20 Years of Excellence' INCONSISTENCIES")
            print("-" * 55)
            
            # Search for both English and Korean versions of "20 Years"
            english_20_years = ["20 Years of Excellence", "20 years of excellence", "20 Years", "20 years"]
            korean_20_years = ["20년의 우수성", "20년", "20 년", "이십년", "이십 년"]
            
            current_lang = "Unknown"
            found_english = False
            found_korean = False
            
            for phrase in english_20_years:
                if phrase in page_text:
                    print(f"✅ Found English: '{phrase}'")
                    found_english = True
                    
            for phrase in korean_20_years:
                if phrase in page_text:
                    print(f"✅ Found Korean: '{phrase}'")
                    found_korean = True
            
            if found_english and found_korean:
                print("⚠️  INCONSISTENCY DETECTED: Both English and Korean versions present")
                current_lang = "Mixed"
            elif found_english:
                print("📝 Current language appears to be: English")
                current_lang = "English"
            elif found_korean:
                print("📝 Current language appears to be: Korean")
                current_lang = "Korean"
            else:
                print("❓ No '20 Years' references found in current view")
            
            # Look for specific sections that might contain this text
            print("\n🔍 ANALYZING SPECIFIC SECTIONS FOR TRANSLATION ISSUES")
            print("-" * 58)
            
            sections_to_check = [
                (".hero", "Hero Section"),
                (".about", "About Section"),  
                (".timeline", "Timeline Section"),
                (".history", "History Section"),
                (".company-info", "Company Info"),
                (".intro", "Introduction"),
                ("h1, h2, h3", "Headings"),
                (".badge", "Badge/Tag elements"),
                (".highlight", "Highlight sections")
            ]
            
            for selector, name in sections_to_check:
                elements = page.locator(selector).all()
                if elements:
                    for i, element in enumerate(elements):
                        try:
                            text = element.inner_text()
                            if any(phrase in text for phrase in english_20_years + korean_20_years):
                                print(f"📍 Found in {name} #{i+1}: {text[:100]}...")
                                element.screenshot(path=f"section_{name.replace(' ', '_').lower()}_{i+1}.png")
                        except:
                            continue
            
            # Test language toggle functionality
            print("\n🔄 TESTING LANGUAGE TOGGLE FUNCTIONALITY")
            print("-" * 44)
            
            # Look for language toggle buttons
            lang_buttons = page.locator("button:has-text('EN'), button:has-text('KR'), button:has-text('한국어'), button:has-text('English')").all()
            
            if lang_buttons:
                print(f"Found {len(lang_buttons)} language toggle buttons")
                
                for i, button in enumerate(lang_buttons):
                    button_text = button.inner_text()
                    print(f"Button {i+1}: '{button_text}'")
                    
                    # Click button and check for changes
                    print(f"Clicking '{button_text}' button...")
                    button.click()
                    time.sleep(2)
                    
                    # Check if page content changed
                    new_text = page.inner_text("body")
                    
                    # Check for translation consistency after toggle
                    english_found_after = any(phrase in new_text for phrase in english_20_years)
                    korean_found_after = any(phrase in new_text for phrase in korean_20_years)
                    
                    if english_found_after and korean_found_after:
                        print("⚠️  ISSUE: Mixed language content detected after toggle")
                    elif english_found_after:
                        print("✅ Language switched to: English")
                    elif korean_found_after:
                        print("✅ Language switched to: Korean")
                    else:
                        print("❓ No '20 Years' content visible after toggle")
                    
                    # Take screenshot of timeline/about section after toggle
                    timeline = page.locator(".timeline, .about, .hero").first
                    if timeline.count() > 0:
                        timeline.screenshot(path=f"timeline_after_{button_text.replace('/', '_')}_toggle.png")
                    
            else:
                print("❌ No language toggle buttons found")
            
            # Visual consistency analysis
            print("\n🎨 VISUAL CONSISTENCY ANALYSIS")
            print("-" * 32)
            
            # Analyze color scheme consistency
            print("\n🌈 Color Scheme Analysis:")
            
            # Get background colors of different sections
            sections = page.locator("section, .section, .container").all()[:10]  # Limit to first 10
            bg_colors = []
            
            for i, section in enumerate(sections):
                try:
                    bg_color = section.evaluate("el => getComputedStyle(el).backgroundColor")
                    if bg_color and bg_color != "rgba(0, 0, 0, 0)":
                        bg_colors.append(bg_color)
                        print(f"Section {i+1}: {bg_color}")
                except:
                    continue
            
            unique_bg_colors = list(set(bg_colors))
            print(f"Total unique background colors: {len(unique_bg_colors)}")
            if len(unique_bg_colors) > 5:
                print("⚠️  Potential issue: Too many different background colors may affect consistency")
            
            # Analyze button consistency
            print("\n🔘 Button Consistency Analysis:")
            
            buttons = page.locator("button, .btn, .button").all()[:10]  # Limit to first 10
            button_styles = []
            
            for i, button in enumerate(buttons):
                try:
                    style_info = button.evaluate("""
                        el => {
                            const style = getComputedStyle(el);
                            return {
                                backgroundColor: style.backgroundColor,
                                color: style.color,
                                borderRadius: style.borderRadius,
                                padding: style.padding,
                                fontSize: style.fontSize,
                                fontWeight: style.fontWeight
                            };
                        }
                    """)
                    button_styles.append(style_info)
                    print(f"Button {i+1}: BG={style_info['backgroundColor']}, Color={style_info['color']}")
                except:
                    continue
            
            # Check for button style consistency
            if button_styles:
                bg_colors_btn = [style['backgroundColor'] for style in button_styles]
                unique_btn_bg = list(set(bg_colors_btn))
                if len(unique_btn_bg) > 3:
                    print("⚠️  Potential issue: Inconsistent button background colors")
                else:
                    print("✅ Button background colors appear consistent")
            
            # Typography consistency
            print("\n✏️ Typography Consistency Analysis:")
            
            headings = page.locator("h1, h2, h3, h4").all()[:10]
            font_families = []
            
            for i, heading in enumerate(headings):
                try:
                    font_family = heading.evaluate("el => getComputedStyle(el).fontFamily")
                    font_families.append(font_family)
                    tag_name = heading.evaluate("el => el.tagName.toLowerCase()")
                    print(f"{tag_name.upper()} #{i+1}: {font_family}")
                except:
                    continue
            
            unique_fonts = list(set(font_families))
            print(f"Total unique font families: {len(unique_fonts)}")
            if len(unique_fonts) > 2:
                print("⚠️  Potential issue: Too many different font families may affect consistency")
            else:
                print("✅ Typography appears consistent")
            
            # Final comprehensive screenshot
            print("\n📸 Taking final comprehensive screenshot...")
            page.screenshot(path="comprehensive_analysis_final.png", full_page=True)
            
            print("\n✅ ANALYSIS COMPLETE!")
            print("\nFiles generated:")
            print("- comprehensive_analysis_final.png (full page)")
            print("- Various section screenshots (if issues found)")
            print("- Timeline screenshots after language toggles")
            
        except Exception as e:
            print(f"❌ Error during analysis: {e}")
            import traceback
            traceback.print_exc()
        
        finally:
            browser.close()

if __name__ == "__main__":
    comprehensive_analysis()