import json

with open("books.json", encoding="utf-8") as f:
    books = json.load(f)

with open("manuscript.json", encoding="utf-8") as f:
    manuscripts = json.load(f)

search_index = []

for item in books:
    search_index.append({
        "title": str(item.get("title", "")),
        "image": item.get("cover"),
        "type": "Book",
        "url": f"/reader/{item.get('identifier')}"
    })

for item in manuscripts:
    search_index.append({
        "title": str(item.get("title", "")),
        "image": item.get("cover"),
        "type": "Manuscript",
        "url": f"/reader/{item.get('identifier')}"
    })

with open("search_index.json", "w", encoding="utf-8") as f:
    json.dump(search_index, f, ensure_ascii=False)

print(f"Created search_index.json with {len(search_index)} items")