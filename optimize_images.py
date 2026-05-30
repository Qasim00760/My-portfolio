"""
Portfolio Image Optimizer Script
Compresses and resizes heavy PNG/JPG images for ultra-fast web loading.
Run: python optimize_images.py
"""
from PIL import Image
import os, sys

# Force UTF-8 output on Windows
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# ===== CONFIGURATION =====
IMAGE_DIRS = [
    "./assets/images",
    "./assets/images/clients",
    "./assets/images/thumbnail",
]

# Max dimensions for different categories
PROJECT_MAX_WIDTH = 800   # Max width for project screenshots
AVATAR_MAX_WIDTH  = 200   # Max width for testimonial avatars (shown at 60px)
PROFILE_MAX_WIDTH = 300   # Max width for your own profile picture
GENERAL_MAX_WIDTH = 800   # Default for anything else

# Files that should NOT be compressed (icons, small logos, SVGs)
SKIP_FILES = {
    "logo.ico", "logo.svg", "icon-quote.svg", "icon-app.svg",
    "icon-design.svg", "icon-dev.svg", "icon-photo.svg",
    "my-avatar.png", "avatar-1.png", "avatar-2.png",
    "avatar-3.png", "avatar-4.png",
    "logo-1-color.png", "logo-2-color.png", "logo-3-color.png",
    "logo-4-color.png", "logo-5-color.png", "logo-6-color.png",
    "consultency.png", "data-analysis.png", "deployment.png",
    "training-model.png",
}

# Avatar images in clients folder (need heavy resize)
AVATAR_FILES = {"dramitmitlal.png", "maazali.png", "samri.png", "Braxton.png"}

# Profile picture files
PROFILE_FILES = {"Qasim.Png", "Qasim Pic.png"}

EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

# ===== OPTIMIZER =====
total_before = 0
total_after  = 0
count = 0

print("=" * 60)
print("  Muhammad Qasim Portfolio - Image Optimizer")
print("=" * 60)

for img_dir in IMAGE_DIRS:
    if not os.path.isdir(img_dir):
        continue

    for filename in os.listdir(img_dir):
        if filename in SKIP_FILES:
            continue

        ext = os.path.splitext(filename)[1].lower()
        if ext not in EXTENSIONS:
            continue

        filepath = os.path.join(img_dir, filename)

        # Skip subdirectories (we handle them separately)
        if os.path.isdir(filepath):
            continue

        size_before = os.path.getsize(filepath)

        # Skip files that are already small (< 80KB)
        if size_before < 80_000:
            continue

        total_before += size_before

        try:
            img = Image.open(filepath)

            # Determine max width based on category
            if filename in AVATAR_FILES:
                max_w = AVATAR_MAX_WIDTH
            elif filename in PROFILE_FILES:
                max_w = PROFILE_MAX_WIDTH
            else:
                max_w = PROJECT_MAX_WIDTH

            # Resize if wider than max
            orig_w, orig_h = img.size
            if orig_w > max_w:
                ratio = max_w / orig_w
                new_h = int(orig_h * ratio)
                img = img.resize((max_w, new_h), Image.LANCZOS)

            # Convert RGBA -> RGB for JPEG saving (PNG keeps RGBA)
            if ext in {".jpg", ".jpeg"}:
                if img.mode in ("RGBA", "P"):
                    img = img.convert("RGB")
                img.save(filepath, "JPEG", quality=82, optimize=True)
            else:
                # Save PNG with max compression
                if img.mode == "RGBA":
                    img.save(filepath, "PNG", optimize=True, compress_level=9)
                else:
                    img = img.convert("RGB")
                    # Save as JPEG for PNGs that are photos/screenshots (better compression)
                    img.save(filepath, "PNG", optimize=True, compress_level=9)

            size_after = os.path.getsize(filepath)
            total_after += size_after
            saved_kb = (size_before - size_after) / 1024
            count += 1

            print("  [OK] %-48s %5d KB -> %4d KB  (saved %d KB)" % (
                filename[:48], size_before // 1024, size_after // 1024, int(saved_kb)))

        except Exception as e:
            print("  [SKIP] Could not process %s: %s" % (filename, str(e)))

print()
print("=" * 60)
print("  Files Optimized : %d" % count)
print("  Total Before    : %.0f KB  (%.2f MB)" % (total_before / 1024, total_before / 1_048_576))
print("  Total After     : %.0f KB  (%.2f MB)" % (total_after  / 1024, total_after  / 1_048_576))
if total_before > 0:
    reduction = (1 - total_after / total_before) * 100
    print("  Size Reduction  : %.1f%%" % reduction)
print("=" * 60)
print("  Done! Your portfolio images are now web-optimized.")
