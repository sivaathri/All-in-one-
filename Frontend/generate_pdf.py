import subprocess
import os

html_file = os.path.abspath("stay_property_listing_steps.html")
pdf_file = os.path.abspath("stay_property_listing_steps.pdf")

# Standard search paths for Edge and Chrome on Windows
browsers = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Microsoft\Edge\Application\msedge.exe",
    r"C:\Program Files\Google\Chrome\Application\chrome.exe",
    r"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
]

print("=" * 60)
print("Stay Property Listing: PDF Generator")
print("=" * 60)
print(f"Source file:      {html_file}")
print(f"Target PDF file:  {pdf_file}")
print("-" * 60)

generated = False
for path in browsers:
    if os.path.exists(path):
        print(f"Found browser executable at:\n{path}\n")
        print("Generating PDF (this will take 2-3 seconds)...")
        try:
            cmd = [
                path,
                "--headless",
                "--disable-gpu",
                f"--print-to-pdf={pdf_file}",
                html_file
            ]
            subprocess.run(cmd, check=True)
            print("-" * 60)
            print(f"SUCCESS: PDF generated successfully at:\n{pdf_file}")
            print("=" * 60)
            generated = True
            break
        except Exception as e:
            print(f"Error executing browser: {e}")

if not generated:
    print("-" * 60)
    print("NOTICE: Could not find or execute a local browser automatically in headless mode.")
    print("No worries! You can generate it manually in 2 simple steps:")
    print("1. Double-click the file 'stay_property_listing_steps.html' to open it in your browser.")
    print("2. Press Ctrl + P, select 'Save as PDF' as the destination, and click Save.")
    print("=" * 60)
