import json

text = json.load(open('dota.json'))

for node in text['nodes']:
	print node[u'name'].encode('utf8')
for link in text['links']:
	print link['source'], link['target']