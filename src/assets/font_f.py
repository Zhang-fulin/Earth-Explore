import json

# 读取城市 JSON 文件，假设文件名是 cities.json
with open('city.json', 'r', encoding='utf-8') as f:
    cities = json.load(f)

# 提取所有城市名的汉字，去重
chars_needed = set()
for city in cities:
    name = city.get('name', '')
    chars_needed.update(name)

# 读取 font.json
with open('font.json', 'r', encoding='utf-8') as f:
    font_data = json.load(f)

glyphs = font_data.get('glyphs', {})

# 过滤字形，只保留城市名中的汉字对应的字形
filtered_glyphs = {char: glyph for char, glyph in glyphs.items() if char in chars_needed}

font_data['glyphs'] = filtered_glyphs

# 保存新字体文件
with open('font_filtered_by_cities.json', 'w', encoding='utf-8') as f:
    json.dump(font_data, f, ensure_ascii=False, indent=2)

print(f"保留城市名汉字后，剩余字形数：{len(filtered_glyphs)}")
