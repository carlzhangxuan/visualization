fn = 'jiudianyuding_agoda_7.path'

for line in open(fn):
	line_l = line.strip('\n').split('\t')
	print line_l[0]+'_0\t'+line_l[1]+'_1\t'+line_l[2]+'_2\t'+line_l[3]+'_3\t'+line_l[4]+'_4\t'+line_l[5]+'_5\t'+line_l[6]+'_6\t'