const { chromium } = require('playwright');

async function inspectLusoBot() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set mobile viewport to simulate mobile usage
  await page.setViewportSize({ width: 375, height: 667 });
  
  try {
    console.log('Navigating to localhost:3000...');
    await page.goto('http://localhost:3000', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait for LusoBot widget to be visible
    console.log('Waiting for LusoBot widget to appear...');
    await page.waitForSelector('button[aria-label*="LusoBot"]', { timeout: 10000 });
    
    // Take initial screenshot
    console.log('Taking initial screenshot...');
    await page.screenshot({ path: 'lusobot_initial.png', fullPage: true });
    
    // Click the LusoBot button to open the chatbot
    console.log('Clicking LusoBot button...');
    await page.click('button[aria-label*="LusoBot"]');
    
    // Wait for chat widget to open
    await page.waitForSelector('[role="dialog"]', { timeout: 5000 });
    
    // Wait a bit for animations to settle
    await page.waitForTimeout(1000);
    
    // Take screenshot when opened
    console.log('Taking opened chatbot screenshot...');
    await page.screenshot({ path: 'lusobot_opened.png', fullPage: true });
    
    // Get text sizes and styles from chat messages
    const textStyles = await page.evaluate(() => {
      const messages = document.querySelectorAll('[data-lusobot-chat-container] p, [data-lusobot-chat-container] .text-sm');
      const styles = [];
      
      messages.forEach((element, index) => {
        const computedStyle = window.getComputedStyle(element);
        styles.push({
          index,
          fontSize: computedStyle.fontSize,
          lineHeight: computedStyle.lineHeight,
          overflow: computedStyle.overflow,
          textOverflow: computedStyle.textOverflow,
          whiteSpace: computedStyle.whiteSpace,
          maxWidth: computedStyle.maxWidth,
          width: computedStyle.width,
          textContent: element.textContent?.slice(0, 50) + '...',
          classList: Array.from(element.classList),
          tagName: element.tagName
        });
      });
      
      return styles;
    });
    
    console.log('Text styles analysis:', JSON.stringify(textStyles, null, 2));
    
    // Check chat container dimensions
    const containerInfo = await page.evaluate(() => {
      const container = document.querySelector('[data-lusobot-chat-container]');
      const rect = container?.getBoundingClientRect();
      return {
        width: rect?.width,
        height: rect?.height,
        scrollWidth: container?.scrollWidth,
        scrollHeight: container?.scrollHeight,
        overflow: window.getComputedStyle(container).overflow,
        overflowY: window.getComputedStyle(container).overflowY
      };
    });
    
    console.log('Chat container info:', containerInfo);
    
    // Try typing a message to see how it displays
    console.log('Testing message input...');
    await page.fill('input[placeholder*="mensagem"], input[placeholder*="message"]', 'This is a test message to see how text displays in the chat');
    await page.press('input[placeholder*="mensagem"], input[placeholder*="message"]', 'Enter');
    
    // Wait for response
    await page.waitForTimeout(2000);
    
    // Take final screenshot
    console.log('Taking final screenshot with message...');
    await page.screenshot({ path: 'lusobot_with_message.png', fullPage: true });
    
    console.log('Screenshots saved:');
    console.log('- lusobot_initial.png (before opening)');
    console.log('- lusobot_opened.png (when opened)');
    console.log('- lusobot_with_message.png (with test message)');
    
  } catch (error) {
    console.error('Error inspecting LusoBot:', error);
    await page.screenshot({ path: 'lusobot_error.png', fullPage: true });
  } finally {
    await browser.close();
  }
}

inspectLusoBot();
