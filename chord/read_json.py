import json

text = json.load(open('dota.json'))

print text['nodes']