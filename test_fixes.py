#!/usr/bin/env python3
"""
도리코 홈페이지 수정사항 테스트 스크립트
"""

import asyncio
from playwright.async_api import async_playwright

async def test_fixes():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=False)
        page = await browser.new_page()
        await page.set_viewport_size({"width": 1920, "height": 1080})
        
        try:
            print("수정된 도리코 홈페이지 테스트 중...")
            
            # 로컬 파일 열기
            import os
            file_path = os.path.abspath("index.html")
            await page.goto(f'file://{file_path}', wait_until="networkidle")
            await page.wait_for_timeout(3000)
            
            # 연혁 섹션 확인
            print("\n=== 수정된 연혁 섹션 확인 ===")
            await page.evaluate("document.querySelector('#history').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            timeline_section = await page.query_selector('#history')
            if timeline_section:
                await timeline_section.screenshot(path='fixed_timeline_section.png')
                print("수정된 연혁 섹션 스크린샷 저장")
            
            # 연혁 박스 크기 재측정
            timeline_items = await page.query_selector_all('.timeline-item')
            print("수정된 연혁 박스 크기:")
            for i, item in enumerate(timeline_items):
                box = await item.bounding_box()
                if box:
                    print(f"연혁 박스 {i+1}: 너비={box['width']:.2f}px, 높이={box['height']:.2f}px")
            
            # 조직도 섹션 확인
            print("\n=== 수정된 조직도 섹션 확인 ===")
            await page.evaluate("document.querySelector('#organization').scrollIntoView({behavior: 'smooth'})")
            await page.wait_for_timeout(2000)
            
            org_section = await page.query_selector('#organization')
            if org_section:
                await org_section.screenshot(path='fixed_organization_section.png')
                print("수정된 조직도 섹션 스크린샷 저장")
            
            # 조직도 박스 크기 재측정
            org_boxes = await page.query_selector_all('.org-box')
            print("수정된 조직도 박스 크기:")
            for i, box_elem in enumerate(org_boxes):
                box = await box_elem.bounding_box()
                if box:
                    text_content = await box_elem.text_content()
                    print(f"조직도 박스 {i+1} ({text_content[:20]}...): 너비={box['width']:.2f}px, 높이={box['height']:.2f}px")
            
            # 안전보건 대표자 박스 색상 재확인
            dp_box = await page.query_selector('.org-box.dp-box')
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
                print(f"수정된 안전보건 대표자 박스 스타일: {styles}")
            
            print("\n✅ 수정사항 테스트 완료!")
            
        except Exception as e:
            print(f"오류 발생: {e}")
            
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(test_fixes())