import MySQLdb
db_host = '193.62.193.10'
conn=MySQLdb.connect(host=db_host,user='anonymous',passwd='')
cursor = conn.cursor()
cursor.execute('use ensembl_website_90')
#cursor.execute('select * from ensembl_website_90.gene_autocomplete LIMIT 500')
cursor.execute('select * from ensembl_website_90.gene_autocomplete where species = "octodon_degus" and display_label like "TXN%" LIMIT 100')
#cursor.execute('describe ensembl_website_90.gene_autocomplete')
res = cursor.fetchall()

for row in res:
    print row
