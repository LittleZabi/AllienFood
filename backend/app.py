import json
with open('data.js', 'r') as file:
    lines = file.read()
    lines = json.dumps(lines)
    k = json.loads(lines)

    print(type(k))
