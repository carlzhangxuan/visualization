#fn = 'jiudianyuding_agoda_7.path'

#for line in open(fn):
#	line_l = line.strip('\n').split('\t')
#	print line_l[0]+'_0\t'+line_l[1]+'_1\t'+line_l[2]+'_2\t'+line_l[3]+'_3\t'+line_l[4]+'_4\t'+line_l[5]+'_5\t'+line_l[6]+'_6\t'

fn = 'jiudianyuding_agoda_7_p.path'

lin_con = []
for line in open(fn):
	for word in line.strip('\n').split('\t'):
		if word not in lin_con:
			lin_con.append(word)
my_dict = {}			
for (num, word) in enumerate(lin_con):
	my_dict[word] = num
	print num, word

for line in open(fn):
	#print [my_dict[key] for key in line.strip('\n').split('\t')]
	case = line.strip('\n').split('\t')
	for i in xrange(len(case) - 1):
		print my_dict[case[i]], my_dict[case[i + 1]]
