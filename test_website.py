#!/usr/bin/env python3
"""
도리코 홈페이지 문제점 확인 스크립트
"""

import asyncio
from playwright.async_api import async_playwright
import time

async def capture_website_screenshots():
    async with async_playwright() as p:
        # 브라우저 실행
        browser = await p.chromium.launch(headless=False)  # headless=False로 브라우저 창을 볼 수 있음
        page = await browser.new_page()
        
        # 뷰포트 크기 설정
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            print("도리코 홈페이지에 접속 중...")
            # 도리코 홈페이지 접속
            await page.goto('https://yeonjeman0-crypto.github.io/doriko-homepage/', wait_until="networkidle")
            
            # 페이지 로딩 완료 대기
            await page.wait_for_timeout(3000)
            
            # 전체 페이지 스크린샷
            print("전체 페이지 스크린샷 촬영 중...")
            await page.screenshot(path='doriko_homepage_full.png', full_page=True)
            
            # 연혁 섹션으로 스크롤
            print("연혁 섹션 확인 중...")
            await page.evaluate("document.querySelector('#history').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            # 연혁 섹션 스크린샷
            timeline_section = await page.query_selector('#history')
            if timeline_section:
                await timeline_section.screenshot(path='doriko_timeline_section.png')
                print("연혁 섹션 스크린샷 저장됨")
            
            # 조직도 섹션으로 스크롤
            print("조직도 섹션 확인 중...")
            await page.evaluate("document.querySelector('#organization').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            # 조직도 섹션 스크린샷
            org_section = await page.query_selector('#organization')
            if org_section:
                await org_section.screenshot(path='doriko_organization_section.png')
                print("조직도 섹션 스크린샷 저장됨")
            
            # 선주사 섹션 찾기 (Fleet 섹션 내부에 있는 듯함)
            print("선주사 섹션 확인 중...")
            # fleet 섹션으로 스크롤
            await page.evaluate("document.querySelector('#fleet').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            # fleet 섹션 스크린샷
            fleet_section = await page.query_selector('#fleet')
            if fleet_section:
                await fleet_section.screenshot(path='doriko_fleet_section.png')
                print("Fleet 섹션 스크린샷 저장됨")
            
            # 선주사 섹션이 별도로 있는지 확인
            owners_section = await page.query_selector('.ship-owners-section, .owners-section, [data-section="owners"]')
            if owners_section:
                await owners_section.screenshot(path='doriko_owners_section.png')
                print("선주사 섹션 스크린샷 저장됨")
            else:
                print("선주사 섹션을 별도로 찾을 수 없음 - Fleet 섹션 내부에 포함된 것으로 보임")
            
            # 요소들의 크기 정보 수집
            print("\n=== 연혁 섹션 박스 크기 분석 ===")
            timeline_items = await page.query_selector_all('.timeline-item')
            for i, item in enumerate(timeline_items):
                box = await item.bounding_box()
                if box:
                    print(f"연혁 박스 {i+1}: 너비={box['width']:.2f}px, 높이={box['height']:.2f}px")
            
            print("\n=== 조직도 섹션 박스 크기 분석 ===")
            org_boxes = await page.query_selector_all('.org-box')
            for i, box_elem in enumerate(org_boxes):
                box = await box_elem.bounding_box()
                if box:
                    text_content = await box_elem.text_content()
                    print(f"조직도 박스 {i+1} ({text_content[:20]}...): 너비={box['width']:.2f}px, 높이={box['height']:.2f}px")
            
            print("\n=== 선주사 박스 크기 분석 ===")
            owner_cards = await page.query_selector_all('.owner-card')
            for i, card in enumerate(owner_cards):
                box = await card.bounding_box()
                if box:
                    text_content = await card.text_content()
                    print(f"선주사 박스 {i+1} ({text_content.strip()}): 너비={box['width']:.2f}px, 높이={box['height']:.2f}px")
            
            # CSS 스타일 분석
            print("\n=== CSS 스타일 분석 ===")
            
            # 안전보건 대표자 박스 색상 확인
            dp_box = await page.query_selector('.org-box:has([data-i18n*="dp"])')
            if dp_box:
                styles = await page.evaluate("""
                    (element) => {
                        const computed = window.getComputedStyle(element);
                        return {
                            backgroundColor: computed.backgroundColor,
                            borderColor: computed.borderColor,
                            color: computed.color
                        };
                    }
                """, dp_box)
                print(f"안전보건 대표자 박스 스타일: {styles}")
            
            print("\n스크린샷 촬영 및 분석 완료!")
            
        except Exception as e:
            print(f"오류 발생: {e}")
            
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(capture_website_screenshots())