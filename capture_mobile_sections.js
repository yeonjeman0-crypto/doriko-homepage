import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();
  
  await page.goto('https://yeonjeman0-crypto.github.io/doriko-homepage/', {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  await page.waitForTimeout(5000);
  
  // 섹션별 스크린샷 캡처
  const sections = [
    { selector: '#home', name: 'hero' },
    { selector: '#performance', name: 'kpi' },
    { selector: '#about', name: 'mission_vision' },
    { selector: '#ceo', name: 'ceo_message' },
    { selector: '#history', name: 'history' },
    { selector: '#organization', name: 'organization' },
    { selector: '#certification', name: 'certification' },
    { selector: '#fleet', name: 'fleet' },
    { selector: '#services', name: 'services' },
    { selector: '#esg', name: 'esg' },
    { selector: '#safety', name: 'safety' },
    { selector: '#contact', name: 'contact' }
  ];
  
  for (const section of sections) {
    try {
      const element = await page.$(section.selector);
      if (element) {
        await page.evaluate((el) => el.scrollIntoView({ behavior: 'smooth' }), element);
        await page.waitForTimeout(2000);
        await element.screenshot({
          path: `mobile_section_${section.name}.png`
        });
        console.log(`Mobile ${section.name} 섹션 스크린샷 캡처 완료`);
      } else {
        console.log(`${section.selector} 섹션을 찾을 수 없음`);
      }
    } catch (error) {
      console.log(`${section.name} 섹션 캡처 실패:`, error.message);
    }
  }
  
  await browser.close();
})();