# import os
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
# from datetime import datetime
# import time

# base_path = "output/Netcool/0"
# if not os.path.exists(base_path):
#     os.makedirs(base_path)
# current_time = datetime.now().strftime("%d-%m-%Y")
# screenshot_path = os.path.join(base_path, f"{current_time}.png")


# url = "http://localhost:5173/"

# options = Options()
# options.add_argument("--headless=new")

# driver = webdriver.Chrome(options=options)
# driver.set_window_size(1920, 1080)

# try:
#     driver.get(url)
#     time.sleep(2)  
#     driver.save_screenshot(screenshot_path)
#     print(True)
# finally:
#     driver.quit()
print(True)