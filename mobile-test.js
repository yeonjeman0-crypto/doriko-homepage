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
  
  console.log('=== 모바일 UI 검증 시작 (375x812) ===');
  
  // 1. 네비게이션 검사
  console.log('\n1. 헤더 & 네비게이션 검사');
  try {
    const navbar = await page.locator('.navbar').boundingBox();
    const logo = await page.locator('.navbar .logo').boundingBox();
    const langToggle = await page.locator('.language-toggle').boundingBox();
    const mobileToggle = await page.locator('.mobile-menu-toggle').boundingBox();
    
    console.log('네비게이션 바 크기:', navbar ? navbar.width + 'x' + navbar.height + 'px' : '찾을 수 없음');
    console.log('로고 크기:', logo ? logo.width + 'x' + logo.height + 'px' : '찾을 수 없음');
    console.log('언어 토글 크기:', langToggle ? langToggle.width + 'x' + langToggle.height + 'px' : '찾을 수 없음');
    console.log('모바일 메뉴 토글 크기:', mobileToggle ? mobileToggle.width + 'x' + mobileToggle.height + 'px' : '찾을 수 없음');
    
    // 모바일 메뉴 토글 테스트
    await page.click('.mobile-menu-toggle');
    await page.waitForTimeout(500);
    const navMenuVisible = await page.locator('.nav-menu').isVisible();
    console.log('모바일 메뉴 토글 작동:', navMenuVisible ? '정상' : '비정상');
    await page.click('.mobile-menu-toggle'); // 닫기
    await page.waitForTimeout(500);
  } catch (e) {
    console.log('네비게이션 검사 오류:', e.message);
  }
  
  // 2. 히어로 섹션 검사
  console.log('\n2. 히어로 섹션 검사');
  try {
    const heroSection = await page.locator('#home').boundingBox();
    const heroTitle = await page.locator('#home h1').first();
    const heroTitleText = await heroTitle.textContent();
    const heroTitleBox = await heroTitle.boundingBox();
    const heroButtons = await page.locator('#home .hero-buttons .btn').count();
    
    console.log('히어로 섹션 크기:', heroSection ? heroSection.width + 'x' + heroSection.height + 'px' : '찾을 수 없음');
    console.log('히어로 제목:', heroTitleText?.trim());
    console.log('히어로 제목 크기:', heroTitleBox ? heroTitleBox.width + 'x' + heroTitleBox.height + 'px' : '찾을 수 없음');
    console.log('히어로 버튼 개수:', heroButtons);
    
    // 영어 모드 테스트
    await page.click('.language-toggle');
    await page.waitForTimeout(1000);
    const heroTitleEn = await page.locator('#home h1').first().textContent();
    console.log('영어 모드 제목:', heroTitleEn?.trim());
    
    // 한국어로 되돌리기
    await page.click('.language-toggle');
    await page.waitForTimeout(1000);
  } catch (e) {
    console.log('히어로 섹션 검사 오류:', e.message);
  }
  
  // 3. 주요 서비스 섹션 검사
  console.log('\n3. 주요 서비스 섹션 검사');
  try {
    await page.locator('#services').scrollIntoViewIfNeeded();
    const serviceSection = await page.locator('#services').boundingBox();
    const serviceGrid = await page.locator('#services .services-grid').boundingBox();
    const serviceItems = await page.locator('#services .service-item').count();
    
    console.log('서비스 섹션 크기:', serviceSection ? serviceSection.width + 'x' + serviceSection.height + 'px' : '찾을 수 없음');
    console.log('서비스 그리드 크기:', serviceGrid ? serviceGrid.width + 'x' + serviceGrid.height + 'px' : '찾을 수 없음');
    console.log('서비스 아이템 개수:', serviceItems);
    
    for (let i = 0; i < Math.min(serviceItems, 3); i++) {
      const item = page.locator('#services .service-item').nth(i);
      const itemTitle = await item.locator('h3').textContent();
      const itemBox = await item.boundingBox();
      const bullets = await item.locator('ul li').count();
      console.log(`서비스 ${i+1} [${itemTitle?.trim()}] - 크기:`, itemBox ? itemBox.width + 'x' + itemBox.height + 'px' : '찾을 수 없음', `불릿: ${bullets}개`);
    }
  } catch (e) {
    console.log('서비스 섹션 검사 오류:', e.message);
  }
  
  // 4. 회사 정보 - KPI 통계 검사
  console.log('\n4. KPI 통계 카드 검사');
  try {
    await page.locator('#about').scrollIntoViewIfNeeded();
    const statsContainer = await page.locator('#about .stats-container').boundingBox();
    const statCards = await page.locator('#about .stat-card').count();
    
    console.log('통계 컨테이너 크기:', statsContainer ? statsContainer.width + 'x' + statsContainer.height + 'px' : '찾을 수 없음');
    console.log('통계 카드 개수:', statCards);
    
    for (let i = 0; i < Math.min(statCards, 4); i++) {
      const card = page.locator('#about .stat-card').nth(i);
      const cardBox = await card.boundingBox();
      const statNumber = await card.locator('.stat-number').textContent();
      const statLabel = await card.locator('.stat-label').textContent();
      console.log(`카드 ${i+1} [${statNumber?.trim()} ${statLabel?.trim()}] - 크기:`, cardBox ? cardBox.width + 'x' + cardBox.height + 'px' : '찾을 수 없음');
    }
  } catch (e) {
    console.log('KPI 통계 검사 오류:', e.message);
  }
  
  // 5. 조직도 검사
  console.log('\n5. 조직도 섹션 검사');
  try {
    const orgSection = await page.locator('#about .org-chart').boundingBox();
    const orgBoxes = await page.locator('#about .org-box').count();
    console.log('조직도 섹션 크기:', orgSection ? orgSection.width + 'x' + orgSection.height + 'px' : '찾을 수 없음');
    console.log('조직도 박스 개수:', orgBoxes);
  } catch (e) {
    console.log('조직도 검사 오류:', e.message);
  }
  
  // 6. CEO 메시지 검사
  console.log('\n6. CEO 메시지 섹션 검사');
  try {
    const ceoSection = await page.locator('#about .ceo-message').boundingBox();
    const ceoText = await page.locator('#about .ceo-message p').first().textContent();
    console.log('CEO 메시지 크기:', ceoSection ? ceoSection.width + 'x' + ceoSection.height + 'px' : '찾을 수 없음');
    console.log('CEO 메시지 텍스트 길이:', ceoText ? ceoText.length + '자' : '찾을 수 없음');
  } catch (e) {
    console.log('CEO 메시지 검사 오류:', e.message);
  }
  
  // 7. 푸터 검사
  console.log('\n7. 푸터 섹션 검사');
  try {
    await page.locator('footer').scrollIntoViewIfNeeded();
    const footer = await page.locator('footer').boundingBox();
    const footerSections = await page.locator('footer .footer-section').count();
    console.log('푸터 크기:', footer ? footer.width + 'x' + footer.height + 'px' : '찾을 수 없음');
    console.log('푸터 섹션 개수:', footerSections);
    
    // 각 푸터 섹션 검사
    for (let i = 0; i < Math.min(footerSections, 4); i++) {
      const section = page.locator('footer .footer-section').nth(i);
      const sectionBox = await section.boundingBox();
      const sectionTitle = await section.locator('h4').textContent();
      console.log(`푸터 섹션 ${i+1} [${sectionTitle?.trim()}] - 크기:`, sectionBox ? sectionBox.width + 'x' + sectionBox.height + 'px' : '찾을 수 없음');
    }
  } catch (e) {
    console.log('푸터 검사 오류:', e.message);
  }
  
  // 8. 전체 페이지 검사
  console.log('\n8. 전체 페이지 검사');
  try {
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);
    const viewportHeight = await page.evaluate(() => window.innerHeight);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    console.log('뷰포트 크기:', viewportWidth + 'x' + viewportHeight + 'px');
    console.log('전체 페이지 높이:', pageHeight + 'px');
    console.log('스크롤 필요 높이:', (pageHeight - viewportHeight) + 'px');
    
    // 전체 스크린샷 캡처
    await page.screenshot({ path: 'mobile-full-page.png', fullPage: true });
    console.log('전체 페이지 스크린샷 저장: mobile-full-page.png');
    
    // 상단 영역 스크린샷
    await page.locator('#home').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'mobile-hero-section.png' });
    console.log('히어로 섹션 스크린샷 저장: mobile-hero-section.png');
    
    // 서비스 섹션 스크린샷
    await page.locator('#services').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'mobile-services-section.png' });
    console.log('서비스 섹션 스크린샷 저장: mobile-services-section.png');
    
    // 회사 정보 섹션 스크린샷
    await page.locator('#about').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'mobile-about-section.png' });
    console.log('회사 정보 섹션 스크린샷 저장: mobile-about-section.png');
    
    // 푸터 섹션 스크린샷
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'mobile-footer-section.png' });
    console.log('푸터 섹션 스크린샷 저장: mobile-footer-section.png');
    
  } catch (e) {
    console.log('전체 페이지 검사 오류:', e.message);
  }
  
  console.log('\n=== 모바일 UI 검증 완료 ===');
  await page.waitForTimeout(3000);
  await browser.close();
})();