from PIL import Image
from pathlib import Path
import shutil

img_folder = Path("img")
backup_folder = Path("img_backup")

backup_folder.mkdir(exist_ok=True)

extensions = {".jpg", ".jpeg", ".png"}

for file in img_folder.iterdir():
    if file.suffix.lower() not in extensions:
        continue

    # Keep an untouched backup
    backup = backup_folder / file.name
    if not backup.exists():
        shutil.copy2(file, backup)

    original_size = file.stat().st_size

    try:
        with Image.open(file) as img:
            img.load()

            # Resize huge images for web
            if img.width > 1920:
                ratio = 1920 / img.width
                new_height = int(img.height * ratio)
                img = img.resize((1920, new_height), Image.Resampling.LANCZOS)

            if file.suffix.lower() in {".jpg", ".jpeg"}:
                if img.mode not in ("RGB", "L"):
                    img = img.convert("RGB")

                img.save(
                    file,
                    "JPEG",
                    quality=82,
                    optimize=True,
                    progressive=True
                )

            elif file.suffix.lower() == ".png":
                img.save(
                    file,
                    "PNG",
                    optimize=True,
                    compress_level=9
                )

        new_size = file.stat().st_size

        print(
            f"{file.name}: "
            f"{original_size / 1024 / 1024:.2f} MB -> "
            f"{new_size / 1024 / 1024:.2f} MB"
        )

    except Exception as e:
        print(f"ERROR {file.name}: {e}")

print("\nDone! Originals are stored in img_backup.")