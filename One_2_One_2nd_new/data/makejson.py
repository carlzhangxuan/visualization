
fn = 'jiudianyuding_agoda_7_p.path'

head = """{"nodes":["""
mid = """],
"links":["""
end = """]}"""
lin_con = []
for line in open(fn):
	for word in line.strip('\n').split('\t'):
		if word not in lin_con:
			lin_con.append(word)
print head
my_dict = {}
con1 = []			
for (num, word) in enumerate(lin_con):
	my_dict[word] = num
	if word.split('_')[1] == '5':
		color = '"#0070C0"'
	elif word.split('_')[1] == '6':
		color = '"orange"'
	elif word.split('_')[1] == '4':
		color = '"#136fff"'
	elif word.split('_')[1] == '3':
		color = '"#4689FF"'
	elif word.split('_')[1] == '2':
		color = '"#75A9FF"'	
	elif word.split('_')[1] == '1':
		color = '"#A4C6FF"'	
	else:
		color = '"#D9E5FF"'
	con1.append('{"name":"'+word.split('_')[0]+'", "color":'+color+'}')
print ',\n'.join(con1)
print  mid
my_dict_2 = {}
for line in open(fn):
	case = line.strip('\n').split('\t')
	for i in xrange(len(case) - 1):
		if (my_dict[case[i]], my_dict[case[i + 1]]) not in my_dict_2:
			my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] = 1
		else:
			my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] += 1
con2 = []
for key in my_dict_2:
	con2.append('{"source":'+str(key[0])+',"target":'+str(key[1])+',"value":'+str(my_dict_2[key])+'}')
print ',\n'.join(con2)
print end