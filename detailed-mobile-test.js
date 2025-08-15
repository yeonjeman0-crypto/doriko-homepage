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
  
  console.log('=== 상세 모바일 UI 검증 ===');
  
  // 언어 토글 테스트
  console.log('\n🌐 언어 토글 기능 테스트');
  try {
    // 현재 언어 확인
    const heroTitleKr = await page.locator('#home h1').first().textContent();
    console.log('한국어 제목:', heroTitleKr?.trim());
    
    // 영어로 변경
    await page.click('button:has-text("EN")');
    await page.waitForTimeout(1000);
    
    const heroTitleEn = await page.locator('#home h1').first().textContent();
    console.log('영어 제목:', heroTitleEn?.trim());
    
    // 영어 모드 스크린샷
    await page.screenshot({ path: 'mobile-hero-english.png' });
    console.log('✓ 영어 모드 스크린샷: mobile-hero-english.png');
    
    // 한국어로 되돌리기
    await page.click('button:has-text("KR")');
    await page.waitForTimeout(1000);
  } catch (e) {
    console.log('언어 토글 테스트 실패:', e.message);
  }
  
  // 주요 서비스 섹션 검증
  console.log('\n🔧 주요 서비스 섹션 검증');
  try {
    // 서비스 섹션으로 스크롤
    await page.evaluate(() => {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1000);
    
    const serviceItems = await page.locator('.service-item').count();
    console.log('서비스 아이템 개수:', serviceItems);
    
    // 각 서비스 아이템의 불릿 포인트 확인
    for (let i = 0; i < Math.min(serviceItems, 3); i++) {
      const bullets = await page.locator('.service-item').nth(i).locator('li').count();
      const title = await page.locator('.service-item').nth(i).locator('h3').textContent();
      console.log(`서비스 ${i+1} [${title?.trim()}]: ${bullets}개 불릿 포인트`);
    }
    
    await page.screenshot({ path: 'mobile-services-detailed.png' });
    console.log('✓ 서비스 상세 스크린샷: mobile-services-detailed.png');
  } catch (e) {
    console.log('서비스 섹션 검증 실패:', e.message);
  }
  
  // KPI 통계 카드 검증
  console.log('\n📊 KPI 통계 카드 검증');
  try {
    await page.evaluate(() => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    await page.waitForTimeout(1000);
    
    const statCards = await page.locator('.stat-card').count();
    console.log('통계 카드 개수:', statCards);
    
    for (let i = 0; i < Math.min(statCards, 4); i++) {
      const statNumber = await page.locator('.stat-card').nth(i).locator('.stat-number').textContent();
      const statLabel = await page.locator('.stat-card').nth(i).locator('.stat-label').textContent();
      console.log(`카드 ${i+1}: ${statNumber?.trim()} ${statLabel?.trim()}`);
    }
    
    await page.screenshot({ path: 'mobile-kpi-cards.png' });
    console.log('✓ KPI 카드 스크린샷: mobile-kpi-cards.png');
  } catch (e) {
    console.log('KPI 통계 검증 실패:', e.message);
  }
  
  // 푸터 섹션 검증
  console.log('\n📋 푸터 섹션 검증');
  try {
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(1000);
    
    const footerSections = await page.locator('footer .footer-section').count();
    console.log('푸터 섹션 개수:', footerSections);
    
    for (let i = 0; i < Math.min(footerSections, 4); i++) {
      const sectionTitle = await page.locator('footer .footer-section').nth(i).locator('h4').textContent();
      console.log(`푸터 섹션 ${i+1}: ${sectionTitle?.trim()}`);
    }
    
    await page.screenshot({ path: 'mobile-footer-detailed.png' });
    console.log('✓ 푸터 상세 스크린샷: mobile-footer-detailed.png');
  } catch (e) {
    console.log('푸터 섹션 검증 실패:', e.message);
  }
  
  // 모바일 메뉴 토글 테스트
  console.log('\n📱 모바일 메뉴 토글 테스트');
  try {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    
    // 모바일 메뉴 열기
    await page.click('.mobile-menu-toggle');
    await page.waitForTimeout(500);
    
    const menuVisible = await page.locator('.nav-menu').isVisible();
    console.log('모바일 메뉴 표시:', menuVisible ? '정상' : '비정상');
    
    if (menuVisible) {
      await page.screenshot({ path: 'mobile-menu-open.png' });
      console.log('✓ 모바일 메뉴 열림 스크린샷: mobile-menu-open.png');
    }
    
    // 모바일 메뉴 닫기
    await page.click('.mobile-menu-toggle');
    await page.waitForTimeout(500);
  } catch (e) {
    console.log('모바일 메뉴 테스트 실패:', e.message);
  }
  
  // 반응형 동작 검증
  console.log('\n📐 반응형 동작 검증');
  const pageWidth = await page.evaluate(() => window.innerWidth);
  const pageHeight = await page.evaluate(() => window.innerHeight);
  const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
  
  console.log('뷰포트 크기:', pageWidth + 'x' + pageHeight + 'px');
  console.log('전체 페이지 높이:', bodyHeight + 'px');
  console.log('스크롤 가능 영역:', (bodyHeight - pageHeight) + 'px');
  
  // 가로 여백 확인
  const bodyMargin = await page.evaluate(() => {
    const body = document.body;
    const computedStyle = window.getComputedStyle(body);
    return {
      marginLeft: computedStyle.marginLeft,
      marginRight: computedStyle.marginRight,
      paddingLeft: computedStyle.paddingLeft,
      paddingRight: computedStyle.paddingRight
    };
  });
  console.log('Body 여백:', bodyMargin);
  
  console.log('\n=== 상세 모바일 UI 검증 완료 ===');
  await page.waitForTimeout(3000);
  await browser.close();
})();