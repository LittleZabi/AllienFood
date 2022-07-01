import json
with json.loads('./data.js') as file:
    # data = file.read()
    # data = json.dumps(data)
    # data = json.loads(data)

    print(type(file))
