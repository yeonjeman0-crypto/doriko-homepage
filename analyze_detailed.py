#!/usr/bin/env python3
"""
도리코 홈페이지 상세 분석 스크립트
"""

import asyncio
from playwright.async_api import async_playwright

async def detailed_analysis():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            print("도리코 홈페이지에 접속 중...")
            await page.goto('https://yeonjeman0-crypto.github.io/doriko-homepage/', wait_until="networkidle")
            await page.wait_for_timeout(3000)
            
            # Fleet 섹션으로 이동해서 아래쪽까지 스크롤
            await page.evaluate("document.querySelector('#fleet').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            # 페이지 끝까지 스크롤하여 선주사 섹션 확인
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(2000)
            
            # 선주사 섹션 찾기
            print("선주사 섹션 상세 분석...")
            
            # 여러 가능한 선택자로 선주사 섹션 찾기
            selectors_to_try = [
                '.ship-owners-section',
                '.owners-section', 
                '[id*="owner"]',
                '[class*="owner"]',
                '.owners-grid',
                '.owner-card'
            ]
            
            owners_found = False
            for selector in selectors_to_try:
                elements = await page.query_selector_all(selector)
                if elements:
                    print(f"'{selector}' 선택자로 {len(elements)}개 요소 발견")
                    owners_found = True
                    
                    # 첫 번째 요소 기준으로 스크린샷
                    if elements[0]:
                        await elements[0].scroll_into_view_if_needed()
                        await page.wait_for_timeout(1000)
                        await elements[0].screenshot(path=f'owners_detail_{selector.replace(".", "").replace("[", "").replace("]", "").replace("*", "").replace("=", "")}.png')
                        print(f"'{selector}' 요소 스크린샷 저장")
            
            if not owners_found:
                print("선주사 관련 요소를 찾을 수 없습니다.")
            
            # Fleet 섹션 아래쪽에 선주사가 있는지 확인
            print("\nFleet 섹션 하단 확인...")
            await page.evaluate("""
                const fleetSection = document.querySelector('#fleet');
                if (fleetSection) {
                    const rect = fleetSection.getBoundingClientRect();
                    window.scrollTo(0, window.scrollY + rect.bottom);
                }
            """)
            await page.wait_for_timeout(2000)
            
            # 현재 뷰포트 스크린샷
            await page.screenshot(path='fleet_bottom_area.png')
            print("Fleet 섹션 하단 영역 스크린샷 저장")
            
            # 페이지의 모든 섹션 id 확인
            print("\n페이지의 모든 섹션 ID 확인:")
            section_ids = await page.evaluate("""
                Array.from(document.querySelectorAll('section[id], div[id]'))
                    .map(el => el.id)
                    .filter(id => id)
            """)
            
            for section_id in section_ids:
                print(f"- {section_id}")
            
            # 선주사 관련 텍스트가 있는 요소 찾기
            print("\n선주사 관련 텍스트 검색:")
            owner_texts = await page.evaluate("""
                const walker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    null,
                    false
                );
                
                const results = [];
                let node;
                while (node = walker.nextNode()) {
                    const text = node.textContent.trim();
                    if (text.includes('선주') || text.includes('OWNER') || text.includes('SHIPPING') || text.includes('MARITIME')) {
                        results.push({
                            text: text,
                            element: node.parentElement.tagName + (node.parentElement.className ? '.' + node.parentElement.className : '')
                        });
                    }
                }
                return results;
            """)
            
            for text_info in owner_texts:
                print(f"- '{text_info['text'][:50]}...' in {text_info['element']}")
                
        except Exception as e:
            print(f"오류 발생: {e}")
            
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(detailed_analysis())