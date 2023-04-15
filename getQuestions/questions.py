import requests
import pyodbc

cnxn = pyodbc.connect("Driver={SQL Server Native Client 11.0};Server=localhost\sqlexpress;Database=ScrumTwister;Trusted_Connection=yes;")
resp = requests.get('https://retromat.org/api/activities?locale=ru').json()


print('got_resp')
print(resp[0])
cursor = cnxn.cursor()
query = ["insert into Questions(Title,Meaning,Text,Category) values"]
for question in resp:
    query.append(f'("{question["name"]}", "{question["summary"]}", "{question["desc"]}", 0),')
q = ' '.join(query[:-1])
print(q[:100])
cursor.execute(q)
cursor.commit()
#cursor.execute('SELECT * FROM Table')

# for row in cursor:
#     print('row = %r' % (row,))