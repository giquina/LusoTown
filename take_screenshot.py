#!/usr/bin/env python3
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def take_screenshots():
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("Testing server connectivity...")
        # Test if server is responding
        response = requests.get("http://localhost:3001/matches/")
        print(f"Server response: {response.status_code}")
        
        print("Taking desktop screenshot of matches page...")
        driver.get("http://localhost:3001/matches/")
        
        # Wait for the page to load
        wait = WebDriverWait(driver, 30)
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Take screenshot
        driver.save_screenshot("/tmp/matches-desktop.png")
        print("Desktop screenshot saved to /tmp/matches-desktop.png")
        
        # Test mobile responsiveness
        print("Taking mobile screenshot...")
        driver.set_window_size(375, 667)
        time.sleep(2)  # Allow time for responsive changes
        driver.save_screenshot("/tmp/matches-mobile.png")
        print("Mobile screenshot saved to /tmp/matches-mobile.png")
        
        # Test Portuguese language
        print("Testing Portuguese language...")
        driver.set_window_size(1920, 1080)
        driver.execute_script("localStorage.setItem('language', 'pt');")
        driver.refresh()
        wait.until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        driver.save_screenshot("/tmp/matches-portuguese.png")
        print("Portuguese screenshot saved to /tmp/matches-portuguese.png")
        
        # Navigate to premium matches gate
        print("Looking for premium matches gate...")
        try:
            # Look for upgrade buttons or premium sections
            upgrade_elements = driver.find_elements(By.XPATH, "//*[contains(text(), 'Upgrade') or contains(text(), '£15') or contains(text(), '£25')]")
            if upgrade_elements:
                print(f"Found {len(upgrade_elements)} premium/pricing elements on the page")
                # Scroll to the first one and take a screenshot
                driver.execute_script("arguments[0].scrollIntoView(true);", upgrade_elements[0])
                time.sleep(1)
                driver.save_screenshot("/tmp/matches-pricing-section.png")
                print("Pricing section screenshot saved to /tmp/matches-pricing-section.png")
            else:
                print("No premium/pricing elements found on the current page")
                
        except Exception as e:
            print(f"Error searching for premium elements: {e}")
        
        print("Screenshots completed successfully!")
        
    except Exception as e:
        print(f"Error taking screenshots: {e}")
        # Take error screenshot
        try:
            driver.save_screenshot("/tmp/error-screenshot.png")
            print("Error screenshot saved to /tmp/error-screenshot.png")
        except:
            pass
    finally:
        driver.quit()

if __name__ == "__main__":
    take_screenshots()