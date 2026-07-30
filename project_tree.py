import os

# Folders to ignore
EXCLUDE_DIRS = {
    "node_modules",
    ".git",
    ".venv",
    "venv",
    "__pycache__",
    "dist",
    "build",
    ".idea",
    ".vscode",
    ".pytest_cache",
    ".mypy_cache",
    ".next",
    "coverage",
}

# Files to ignore
EXCLUDE_FILES = {
    ".DS_Store",
    "Thumbs.db",
}


def tree(directory, prefix=""):
    entries = sorted(
        [
            e for e in os.listdir(directory)
            if e not in EXCLUDE_DIRS
            and e not in EXCLUDE_FILES
        ],
        key=lambda x: (
            not os.path.isdir(os.path.join(directory, x)),
            x.lower(),
        ),
    )

    lines = []

    for index, entry in enumerate(entries):
        path = os.path.join(directory, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "

        lines.append(prefix + connector + entry)

        if os.path.isdir(path):
            extension = "    " if index == len(entries) - 1 else "│   "
            lines.extend(tree(path, prefix + extension))

    return lines


def main():
    root = os.getcwd()

    output_file = os.path.join(root, "ProjectStructure.txt")

    lines = [os.path.basename(root)]
    lines.extend(tree(root))

    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    print("=" * 60)
    print("Project structure generated successfully!")
    print(f"Saved to: {output_file}")
    print("=" * 60)


if __name__ == "__main__":
    main()