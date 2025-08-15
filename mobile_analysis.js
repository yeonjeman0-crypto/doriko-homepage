import { chromium } from 'playwright';

async function analyzeMobileIssues() {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X size
    
    // Navigate to local file
    await page.goto('file:///C:/Users/sicka/Desktop/Homepage/index.html');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    console.log('Capturing full page mobile screenshot...');
    await page.screenshot({ 
        path: 'mobile_full_analysis.png', 
        fullPage: true 
    });
    
    // Focus on services section with bullet points
    console.log('Capturing services section...');
    const servicesSection = page.locator('#services');
    if (await servicesSection.isVisible()) {
        await servicesSection.screenshot({ path: 'mobile_services_bullets.png' });
    }
    
    // Scroll to and capture footer/recruitment section
    console.log('Capturing footer/recruitment section...');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    const footerSection = page.locator('footer');
    if (await footerSection.isVisible()) {
        await footerSection.screenshot({ path: 'mobile_footer_recruitment.png' });
    }
    
    // Check for overflow issues
    console.log('Checking for horizontal overflow...');
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    
    console.log(`Body width: ${bodyWidth}px, Viewport width: ${viewportWidth}px`);
    if (bodyWidth > viewportWidth) {
        console.log('⚠️ Horizontal overflow detected!');
    }
    
    // Check specific elements for overflow
    const overflowElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const overflows = [];
        
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.width > window.innerWidth) {
                overflows.push({
                    tagName: el.tagName,
                    className: el.className,
                    id: el.id,
                    width: rect.width
                });
            }
        });
        
        return overflows;
    });
    
    console.log('Elements causing overflow:', overflowElements);
    
    await browser.close();
}

analyzeMobileIssues().catch(console.error);