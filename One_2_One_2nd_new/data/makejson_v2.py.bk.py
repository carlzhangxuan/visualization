"""
====================
json generator
====================

"""
__author__ = """\n""".join(['Xuan Zhang'])

__version__ ="""2014-04-12"""

__all__ = ['']

#coding:utf8

def get_sorting_info(fn, sep = '\t'):
	import operator
	tmp = {}
	with open(fn) as mat:
		my_con = [line.strip().split(sep) for line in mat.readlines()]
	line_w = len(my_con[0])
	for i in xrange(line_w):
		tmp[i] = {}
	for line in my_con:
		for n in xrange(line_w):
			if line[n] not in tmp[n]:
				tmp[n][line[n]] = 1
			else:
				tmp[n][line[n]] += 1
	for x in xrange(line_w):
		sorted_td = sorted(tmp[x].iteritems(), key=operator.itemgetter(1), reverse = True)
		yield sorted_td

def get_listing(l):
	for list_ in l:
		for item in list_:
			#print item[0], item[1]
			yield (item[0], item[1])

def make_json_node(l):
	my_dict = {}
	con = []
	for (num, (word, count)) in enumerate(l):
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
		#con.append('{"name":"'+word.split('_')[0]+'", "value":'+str(count)+'}')
		con.append('{"name":"'+word.split('_')[0]+'", "color":'+color+', "value":'+str(count)+'}')
	return (con, my_dict)

def make_json_link(fn, my_dict):
	import operator
	my_dict_2 = {}
	con_2 = []
	for line in open(fn):
		case = line.strip('\n').split('\t')
		for i in xrange(len(case) - 1):
			if (my_dict[case[i]], my_dict[case[i + 1]]) not in my_dict_2:
				my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] = 1
			else:
				my_dict_2[(my_dict[case[i]], my_dict[case[i + 1]])] += 1
	sorted_md = sorted(my_dict_2.iteritems(), key=operator.itemgetter(0))
	for key in sorted_md:
		con_2.append('{"source":'+str(key[0][0])+',"target":'+str(key[0][1])+',"value":'+str(key[1])+'}')
	return con_2

def print_main(fn):
	header = """{"nodes":["""
	mid = """],
	"links":["""
	footer = """]}"""
	namelist = get_listing(get_sorting_info(fn))
	(node_part, my_dict) =  make_json_node(namelist)
	link_part = make_json_link(fn, my_dict)

	print header
	print ',\n'.join(node_part)
	print mid
	print ',\n'.join(link_part)
	print footer

if __name__ == '__main__':
	fn = 'jiudianyuding_agoda_7_p.path'
	print_main(fn)