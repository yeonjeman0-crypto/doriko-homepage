import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15'
  });
  const page = await context.newPage();
  await page.goto('https://yeonjeman0-crypto.github.io/doriko-homepage/');
  await page.waitForLoadState('networkidle');
  
  console.log('=== 모바일 UI 간단 검증 (375x812) ===');
  
  // 기본 페이지 정보
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportHeight = await page.evaluate(() => window.innerHeight);
  const viewportWidth = await page.evaluate(() => window.innerWidth);
  console.log('뷰포트 크기:', viewportWidth + 'x' + viewportHeight + 'px');
  console.log('전체 페이지 높이:', pageHeight + 'px');
  
  // 히어로 섹션 확인
  try {
    const heroTitle = await page.locator('#home h1').first().textContent();
    console.log('히어로 제목:', heroTitle?.trim());
  } catch (e) {
    console.log('히어로 제목 확인 실패');
  }
  
  // 스크린샷 캡처
  console.log('\n스크린샷 캡처 중...');
  
  // 1. 전체 페이지
  await page.screenshot({ path: 'mobile-full-page.png', fullPage: true });
  console.log('✓ 전체 페이지: mobile-full-page.png');
  
  // 2. 히어로 섹션 (상단)
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-hero.png' });
  console.log('✓ 히어로 섹션: mobile-hero.png');
  
  // 3. 서비스 섹션
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-services.png' });
  console.log('✓ 서비스 섹션: mobile-services.png');
  
  // 4. 회사 정보 섹션
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-about.png' });
  console.log('✓ 회사 정보 섹션: mobile-about.png');
  
  // 5. 중간 섹션
  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-middle.png' });
  console.log('✓ 중간 섹션: mobile-middle.png');
  
  // 6. 푸터 (하단)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'mobile-footer.png' });
  console.log('✓ 푸터 섹션: mobile-footer.png');
  
  console.log('\n=== 모바일 UI 검증 완료 ===');
  await page.waitForTimeout(5000);
  await browser.close();
})();