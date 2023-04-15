import re

import requests
import pyodbc
import uuid

cnxn = pyodbc.connect(("Driver={SQL Server Native Client 11.0};Server=localhost\sqlexpress;Database=ScrumTwister;Trusted_Connection=yes;"))
resp = requests.get('https://retromat.org/api/activities?locale=ru').json()
cursor = cnxn.cursor()
query = """INSERT INTO Questions(Id, Title, Meaning, Text, Category) VALUES """
last_q = None
reg = re.compile(r'\'')
print(len(list(filter(lambda x: x['phase'] == 0, resp))))
try:
    for question in filter(lambda x: x['phase'] == 0, resp):
        name = re.sub(reg, '\'\'', question['name'])
        summary = re.sub(reg, '\'\'', question['summary'])
        text = re.sub(reg, '\'\'', question['desc'])
        last_q = query + f"('{str(uuid.uuid4())}','{name}', '{summary}', '{text}', 0)" + ';'
        cursor.execute(query + f"""('{str(uuid.uuid4())}','{name}', '{summary}', '{text}', {0})""" + ';')
except:
    print(last_q)
    raise
cursor.commit()

