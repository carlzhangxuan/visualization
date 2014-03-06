#fn = 'jiudianyuding_agoda_7.path'

#for line in open(fn):
#	line_l = line.strip('\n').split('\t')
#	print line_l[0]+'_0\t'+line_l[1]+'_1\t'+line_l[2]+'_2\t'+line_l[3]+'_3\t'+line_l[4]+'_4\t'+line_l[5]+'_5\t'+line_l[6]+'_6\t'

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
for (num, word) in enumerate(lin_con):
	my_dict[word] = num
	print '{"name":"'+word+'", "color":"white"},'
print  mid
my_dict_2 = {}
for line in open(fn):
	#print [my_dict[key] for key in line.strip('\n').split('\t')]
	case = line.strip('\n').split('\t')
	for i in xrange(len(case) - 1):
		if (my_dict[case[i]], my_dict[case[i + 1]]) not in my_dict_2:
			my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] = 1
		else:
			my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] += 1

for key in my_dict_2:
	print '{"source":'+str(key[0])+',"target":'+str(key[1])+',"value":'+str(my_dict_2[key])+'},'
print end