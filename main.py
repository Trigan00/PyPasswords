import os
import sys


if sys.stdout is None:
    sys.stdout = open(os.devnull, "w")
if sys.stderr is None:
    sys.stderr = open(os.devnull, "w")

from api.index import *


if __name__ == '__main__':
    # eel.browsers.set_path("chrome", "./chrome-win/chrome.exe")
    # eel.start('index.html', mode="chrome", size=(700, 700))
    eel.init('web/dist')
    eel.start('index.html', size=(700, 700))
